---
title: "Rebuilding the Homelab CI/CD Pipeline Around Domain Boundaries"
description: How I went from a tangle of disconnected GitLab child pipelines to a clean three-domain CI/CD architecture — and the gotchas along the way.
slug: homelab-cicd-restructure
date: 2026-03-10T13:27:56+11:00
tags:
    - gitlab-ci
    - gitops
    - homelab
    - terraform
categories:
    - technology
---

The CI/CD pipeline in homeaiops has been functional for a while. Functional, but a bit of a mess. I had separate child pipelines for VM terraform, LXC terraform, and Ansible — three different files, each doing their own thing, with duplicated setup logic scattered across all of them. Every time I added a new VM group, I'd need to touch multiple files. The vault password setup was copy-pasted. Errors in one pipeline didn't reflect anywhere meaningful in the others.

It worked. But it didn't *make sense*.

The repo has a clear domain structure — `hosting/`, `applications/`, `network/` — and the pipelines didn't reflect that at all. So I decided to align them.

## What the old structure looked like

Before the restructure, the root `.gitlab-ci.yml` triggered four separate child pipelines:

```
.gitlab-ci.yml
├── trigger → hosting/terraform/vm/.gitlab-ci.yml
├── trigger → hosting/terraform/lxc/.gitlab-ci.yml
├── trigger → hosting/ansible/.gitlab-ci.yml
└── trigger → applications/.gitlab-ci.yml
```

The terraform pipelines each had their own validate/plan/apply stages. The ansible pipeline had its own vault setup. They shared no templates, used inconsistent naming, and had a Rube Goldberg-style flow where the terraform `provision` stage would trigger the *root* pipeline again with `TRIGGER_PROVISION=true`, which would then trigger the ansible child, which would then run `deploy_base`. Three hops to provision a new VM.

It technically worked. But reading it required a map.

## The new structure

The new shape is simple: three triggers, one per domain.

```
.gitlab-ci.yml (test stage gates everything)
├── trigger_hosting    → hosting/.gitlab-ci.yml
├── trigger_applications → applications/.gitlab-ci.yml
└── trigger_network    → network/.gitlab-ci.yml
```

The root pipeline's `test` stage runs first and gates all of them — Docker-in-Docker validation, SSH connectivity to all hosts, SAST, and secret detection. Nothing deploys if the tests don't pass.

### hosting/.gitlab-ci.yml — the big consolidation

The three separate hosting pipelines became one. `hosting/.gitlab-ci.yml` now owns the full infrastructure lifecycle:

```
validate → plan → apply → provision
```

Terraform for VMs and LXCs runs as parallel matrix jobs — one matrix covers both types:

```yaml
parallel:
  matrix:
    - TF_TYPE: "vm"
      TF_DIR: ["dkr-core-0x", "dkr-prod-0x", "k3s-prod-0x", "dkr-gpu-0x", "dkr-test-0x"]
    - TF_TYPE: "lxc"
      TF_DIR: ["rnr-prod-0x"]
```

After a `apply:terraform` (manual), `provision:vm` becomes available as a manual trigger to run Ansible against the newly created VM. No more bouncing through the root pipeline to get there.

Ansible validation still runs automatically when `hosting/ansible/**/*` changes. The actual `deploy:ansible` job only fires when `TRIGGER_PROVISION=true` — it's not a "push and it deploys to all your servers" kind of job.

### applications/.gitlab-ci.yml — with an infra check

The applications pipeline got a `validate` stage added before deployments. The key addition is `check_infra:<app>` — a job that SSHes into the target Docker host and runs `docker info` before the deploy even starts. If the host isn't reachable or Docker is down, you find out before rsync gets involved.

```yaml
check_infra:hello-world:
  extends: .infra_check
  stage: validate
  variables:
    TARGET_HOST: dkr-core-01
    DEPLOY_USER: serveradmin
```

The deploy job then `needs:` the infra check, so the dependency is explicit.

### ci/templates/ — finally some reuse

Two shared templates now live at `ci/templates/`:

- **`vault.yml`** — the `.vault_setup` hidden job that writes the Ansible vault password to `~/.ansible/vault_pass`. Previously copy-pasted into every ansible-touching pipeline.
- **`infra_check.yml`** — the `.infra_check` hidden job for the Docker host reachability check. Reusable by any application deploy job.

Child pipelines include them with:
```yaml
include:
  - local: ci/templates/vault.yml
```

## The bugs along the way

This restructure was not a clean one-shot. Here's what bit me.

### Matrix variables don't expand in `changes:` paths

I thought I was being clever. The terraform jobs use a `parallel: matrix` with `TF_TYPE` and `TF_DIR` variables, so I wrote the `changes:` rule to match:

```yaml
rules:
  - changes:
      - hosting/terraform/${TF_TYPE}/${TF_DIR}/**/*
```

Nope. GitLab does not expand matrix variables inside `changes:` paths. The rules never matched. Every terraform-triggered pipeline came up empty.

The fix: use a broader pattern that doesn't reference matrix variables.

```yaml
rules:
  - changes:
      - hosting/terraform/**/*
```

All terraform dirs get validated and planned whenever any terraform file changes. Slightly over-eager, but correct. `apply:terraform` is manual anyway, so the blast radius is zero.

### Empty child pipelines

Related to the above: if a child pipeline has no runnable jobs (because all rules evaluate to `when: never`), GitLab reports it as a failed downstream pipeline. This happened a few times — notably when I pushed a change to `applications/.gitlab-ci.yml`, which lives inside `applications/` and therefore matched `applications/**/*`, triggering the child pipeline, but with no app files actually changed, so all the app-specific jobs were skipped.

The fix for both `hosting/` and `applications/` was the same: add an always-run `validate:yaml` job with no `changes:` restriction. It lints the CI file itself and ensures there's always at least one job.

```yaml
validate:yaml:
  stage: validate
  image: python:3.11
  tags:
    - shared
  before_script:
    - pip install yamllint
  script:
    - yamllint -d relaxed hosting/.gitlab-ci.yml
```

### Ansible vault in CI

Getting the vault password into CI jobs is fiddly. Ansible normally reads it from `ansible.cfg` via `vault_password_file`, but in CI, the `ansible.cfg` is silently ignored because the working directory is world-writable. Classic.

The fix: set `ANSIBLE_VAULT_PASSWORD_FILE` as a CI/CD variable pointing to `~/.ansible/vault_pass`, and write the password there explicitly in `before_script`:

```bash
mkdir -p ~/.ansible
printf "%s" "${ANSIBLE_VAULT_PASSWORD}" > ~/.ansible/vault_pass
chmod 600 ~/.ansible/vault_pass
```

That's now extracted into the `.vault_setup` hidden job and shared via `!reference`:

```yaml
before_script:
  - !reference [.vault_setup, before_script]
  - pip install ansible==9.5.1
  - ...
```

## VM lifecycle: new VMs and deleting them

One thing I hadn't properly thought through: what happens when you want to *remove* a VM?

The current pipeline handles creation fine — the `/new-vm` Claude Code skill scaffolds the directory and CI matrix entry, you push, plan runs automatically, apply is manual, then provision runs Ansible. Clean.

Deletion is a different story. There's no `destroy:terraform` job. I looked at three approaches:

- **Detect orphaned workspaces** — query the PostgreSQL terraform backend for workspace names, compare against repo directories, flag any that don't match. Doable, but requires knowing the exact PG table schema and adds a job that could produce false positives.
- **Manual destroy** — run `terraform destroy` locally before removing the directory. Simple, relies on discipline.
- **Manual destroy job in the pipeline** — always-available manual job to destroy any VM in the matrix. More visible, but the matrix makes it awkward to scope correctly.

I went with option B for now: documented the convention in the template README and added a warning comment above the CI matrix. If you delete a directory without destroying first, you've got an orphaned VM running on Proxmox and a stale workspace in the backend. The documentation makes this explicit.

It's not perfect. But it's honest about the gap.

## Where things stand

The pipeline now matches the mental model of the project. `hosting/` changes trigger hosting infrastructure jobs. `applications/` changes trigger application deploy jobs. Tests gate everything. Reusable templates live in one place.

Adding a new app or a new VM is a well-defined operation with a scaffolding skill and a documented checklist. The ansible vault works in CI. The GitLab runners (three Docker containers on `dkr-core-0x`, running privileged DinD) handle all job execution locally.

What's still rough: the `provision:vm` flow is manual — after an `apply:terraform`, a human has to go into the GitLab UI and trigger the right provision matrix entry. Ideally that would chain automatically, but GitLab's parallel matrix + needs syntax makes expressing "provision only the VM that was just applied" harder than it looks. That's a problem for another session.

For now: the pipelines make sense, and I can find things.

This isn't the end of the story though — it's more of a checkpoint. The pipeline architecture is solid but it hasn't been properly stress-tested against real infrastructure changes yet. The next step is pushing it through its paces: actually applying terraform for `dkr-test-0x`, running the provision job, watching Ansible configure a fresh VM end-to-end, and seeing what breaks. There'll be a follow-up post (or two) once I've put it through those paces. Expect at least one "well, that didn't work the way I thought" moment.
