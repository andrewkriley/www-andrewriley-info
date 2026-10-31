export const site = {
  name: "Andrew Riley",
  nickname: "Riles",
  url: "https://www.andrewriley.info",
  description:
    "Andrew Riley's proof-of-work portfolio across build, lead, play, and health: systems, people, creativity, and sustainable momentum.",
  nav: [
    { href: "/build", label: "Build" },
    { href: "/lead", label: "Lead" },
    { href: "/play", label: "Play" },
    { href: "/health", label: "Health" },
  ],
  socials: [
    {
      href: "https://github.com/andrewkriley",
      label: "GitHub",
      icon: "github",
    },
    {
      href: "https://www.linkedin.com/in/andrewriley",
      label: "LinkedIn",
      icon: "linkedin",
    },
    {
      href: "https://www.youtube.com/@rilesdj",
      label: "YouTube",
      icon: "youtube",
    },
    {
      href: "https://www.mixcloud.com/rilesdj/",
      label: "Mixcloud",
      icon: "mixcloud",
    },
  ] as const,
};

export const featuredWork = [
  {
    title: "Build makes ideas real",
    label: "Build",
    href: "/build",
    description:
      "Technical and physical work become repeatable systems: AI tooling, infrastructure, automation, web delivery, and DIY experiments.",
    proof: "Constrain, automate, observe, document",
  },
  {
    title: "Lead makes work legible",
    label: "Lead",
    href: "/lead",
    description:
      "Leadership turns complexity into shared understanding so teams can learn, decide, and move with confidence.",
    proof: "Context, clarity, capability, trust",
  },
  {
    title: "Play keeps curiosity alive",
    label: "Play",
    href: "/play",
    description:
      "Music and creative play keep the system human: energy, improvisation, connection, and pattern recognition.",
    proof: "DJ Riles, mixes, experimentation",
  },
  {
    title: "Health sustains the loop",
    label: "Health",
    href: "/health",
    description:
      "The body, mind, family, and recovery practices are the foundation that make the rest possible for longer.",
    proof: "Wellbeing, movement, recovery, family",
  },
];

export const operatingLoop = [
  {
    title: "Make the idea visible",
    pillar: "Build",
    description:
      "Prototype the smallest useful version, then make the shape of the system understandable.",
  },
  {
    title: "Make the work shared",
    pillar: "Lead",
    description:
      "Turn private reasoning into language, decisions, and practices other people can build on.",
  },
  {
    title: "Make the energy renewable",
    pillar: "Play",
    description:
      "Keep curiosity, rhythm, improvisation, and joy in the loop so the work does not become brittle.",
  },
  {
    title: "Make the system sustainable",
    pillar: "Health",
    description:
      "Protect the physical and mental foundation that lets the work continue with integrity.",
  },
];

export const builderMethods = [
  {
    step: "01",
    title: "Find the useful problem",
    description:
      "Start with a real workflow, household need, operator pain, or product gap. The build has to serve someone, not just prove a tool can be wired together.",
  },
  {
    step: "02",
    title: "Constrain the system",
    description:
      "Define the guardrails early: least privilege, no secrets in code, clear ownership boundaries, and a small set of tools that are allowed to touch production.",
  },
  {
    step: "03",
    title: "Make it repeatable",
    description:
      "Turn one-off work into scripts, GitOps manifests, CI checks, and release paths so future changes can be explained and replayed.",
  },
  {
    step: "04",
    title: "Prove before promoting",
    description:
      "Use branch builds, preview environments, type checks, linting, rendered manifests, rollout status, and health probes before trusting a change.",
  },
  {
    step: "05",
    title: "Instrument the result",
    description:
      "A useful system tells you what it is doing. Logs, traces, dashboards, and status notes are part of the build, not cleanup afterwards.",
  },
  {
    step: "06",
    title: "Write the trail",
    description:
      "Capture decisions, runbooks, and public-safe evidence so the next person can understand how the system works and why it exists.",
  },
];

export const buildEvidence = [
  {
    title: "This website ships through the harness",
    description:
      "The public GitHub source can be built in a cluster preview, checked with the same commands as CI, and promoted to an isolated Cloudflare Workers dev environment before production.",
    proof: "Next.js, OpenNext, k3s preview, Cloudflare Workers",
  },
  {
    title: "Release paths are treated as product",
    description:
      "Changes move through branches, tests, review, versioned releases, and GitOps reconciliation instead of dashboard-only edits or undocumented hand work.",
    proof: "GitLab, Flux, typed checks, rollout probes",
  },
  {
    title: "Operators get tools, not tribal knowledge",
    description:
      "Operational actions are wrapped as constrained workflows with policy, runbooks, and role boundaries rather than raw credentials spread across machines.",
    proof: "OpenWork, policy gates, runbooks, least privilege",
  },
  {
    title: "Observability is part of the build",
    description:
      "Dashboards and telemetry track applications, model routing, GPU use, network health, and releases so the system can be explained after it changes.",
    proof: "Splunk, OpenTelemetry, structured logs, GPU metrics",
  },
  {
    title: "Local AI has a control plane",
    description:
      "Model front doors, aliases, policy metadata, and telemetry make AI workloads intentional instead of a pile of direct provider calls.",
    proof: "LiteLLM, local inference, policy metadata, usage telemetry",
  },
  {
    title: "Physical and digital builds rhyme",
    description:
      "Networking, Home Assistant, visibility tooling, and web delivery use the same method: constrain, automate, observe, and document.",
    proof: "Homelab, automation, security visibility, documentation",
  },
];

export const buildCaseStudies = [
  {
    title: "Website delivery path",
    description:
      "A public site that can move from branch to cluster preview to Cloudflare Worker without production hostnames being touched.",
    status: "Active",
  },
  {
    title: "House AI and operator console",
    description:
      "A local-first AI control plane that routes models, gates tools, records decisions, and keeps operators inside safer workflows.",
    status: "In progress",
  },
  {
    title: "Observability layer",
    description:
      "A practical telemetry surface for apps, infrastructure, GPUs, logs, and model usage so build decisions have feedback.",
    status: "Live",
  },
];

export const heroImages = [
  {
    label: "Build",
    title: "Technology and hands-on making",
    src: "/images/hero/andrew_building.jpg",
    alt: "Andrew Riley working on a build project",
  },
  {
    label: "Lead",
    title: "Professional leadership",
    src: "/images/hero/riles_presenting1.jpeg",
    alt: "Andrew Riley presenting professionally",
  },
  {
    label: "Play",
    title: "DJ Riles",
    src: "/images/hero/dj_riles_vegas.jpg",
    alt: "DJ Riles in Las Vegas",
  },
  {
    label: "Health",
    title: "Wellbeing and movement",
    src: "/images/hero/andrew_running1.jpg",
    alt: "Andrew Riley running",
  },
];

export const nowBuilding = [
  {
    title: "Family and foundation",
    label: "Health",
    description:
      "The life system underneath the work: family, wellbeing, recovery, and practices that keep output sustainable.",
    href: "/health",
  },
  {
    title: "Cisco + Splunk",
    label: "Lead",
    description:
      "Professional leadership, evangelism, enablement, and the work of helping teams make sense of change.",
    href: "/lead",
  },
  {
    title: "House platform and Cleverbits",
    label: "Build",
    description:
      "Product-shaped experiments, AI tooling, infrastructure, and hands-on systems that turn ideas into usable tools.",
    href: "/build",
  },
];

export const principles = [
  "Build means making useful things visible, repeatable, and observable.",
  "Lead means turning complexity into shared understanding and capability.",
  "Play means keeping creativity, energy, and experimentation alive.",
  "Health means protecting the foundation that makes every other pillar sustainable.",
];

export const leadershipPrinciples = [
  "Make the work understandable enough that others can contribute with confidence.",
  "Measure success by capability built, not only by the immediate outcome.",
  "Name constraints, trade-offs, and decisions so teams can move without guessing.",
  "Help people grow beyond the task directly in front of them.",
];

export const playPractices = [
  {
    title: "Improvisation",
    description:
      "DJing is live systems thinking: read the room, choose a direction, adapt quickly, and keep the energy moving.",
  },
  {
    title: "Pattern recognition",
    description:
      "Mixing tracks, building systems, and leading teams all depend on noticing transitions before they become obvious.",
  },
  {
    title: "Connection",
    description:
      "Play keeps the work emotionally honest. It is a reminder that useful systems should still feel human.",
  },
];

export const growingSectionsNote =
  "Some areas (health logs, DIY workshop notes, and parts of /uses) are intentionally light while proof-of-work posts and active builds carry the site.";

export const healthPillars = [
  {
    title: "Wellbeing as operating capacity",
    description:
      "Energy, sleep, recovery, routines, and family context are part of the operating system, not separate from it.",
  },
  {
    title: "Physical capability",
    description:
      "Strength, mobility, endurance, and staying capable enough to keep building, leading, and showing up.",
  },
  {
    title: "Mental clarity",
    description:
      "Clarity, emotional regulation, stress management, reflection, and noticing when the system needs care.",
  },
  {
    title: "Fuel and rhythm",
    description:
      "Food as fuel and rhythm: practical nutrition, consistency, hydration, and choices that support energy rather than perfection.",
  },
  {
    title: "Movement and recovery",
    description:
      "Movement as maintenance and play: walking, training, outdoor work, and the habits that keep the body engaged.",
  },
];

export const healthPractices = [
  "Sustainable work needs recovery designed in, not bolted on after burnout.",
  "Family context matters because the work has to fit inside a real life.",
  "Health is evidence too: consistency, sleep, movement, nutrition, and emotional regulation show up in the quality of decisions.",
];

export const uses = [
  {
    category: "Tech Stack (This Site)",
    description:
      "The public proof-of-work surface: fast to change, easy to preview, and deployable without touching production routes.",
    items: [
      {
        name: "Next.js 16",
        detail: "React framework with App Router.",
      },
      {
        name: "Tailwind CSS v4",
        detail: "Utility-first styling with token-driven brand colours.",
      },
      {
        name: "TypeScript",
        detail: "Type safety across components, content helpers, and config.",
      },
      {
        name: "MDX",
        detail: "Migrated blog posts and future long-form pages.",
      },
      {
        name: "Cloudflare",
        detail:
          "Worker runtime for the public site, with a separate dev Worker for branch reviews.",
      },
    ],
  },
  {
    category: "Dev And AI Tools",
    description:
      "Tools that turn thinking into branches, diffs, tests, reviews, and deployable proof.",
    items: [
      {
        name: "Cursor",
        detail:
          "AI-first editor for codebase work, design-system consumption, and branch-level iteration.",
      },
      {
        name: "Claude",
        detail:
          "Planning, writing, technical debugging, and structured workflow design.",
      },
      {
        name: "Git",
        detail: "Version control and the backbone of my build workflows.",
      },
      {
        name: "GitLab CI/CD",
        detail:
          "Pipelines and release gates for repeatable checks before promotion.",
      },
    ],
  },
  {
    category: "Homelab And Automation",
    description:
      "The practical lab where ideas become infrastructure, telemetry, and operating habits.",
    items: [
      {
        name: "Proxmox",
        detail: "Virtualisation layer for repeatable compute experiments.",
      },
      {
        name: "Terraform / OpenTofu",
        detail: "Infrastructure provisioning and repeatable environments.",
      },
      {
        name: "Ansible",
        detail:
          "Configuration management for repeatable setup and operational drift control.",
      },
      {
        name: "Home Assistant",
        detail: "Home automation and useful local integrations.",
      },
      {
        name: "Splunk",
        detail:
          "Logs, dashboards, telemetry, and operational feedback loops.",
      },
    ],
  },
  {
    category: "Music",
    description:
      "The creative practice that keeps improvisation, pattern recognition, and energy alive.",
    items: [
      {
        name: "DJ Riles",
        detail: "Mixes, sets, and the emotional side of creating with music.",
      },
      {
        name: "YouTube",
        detail: "Publishing and sharing DJ content.",
      },
      {
        name: "Mixcloud",
        detail: "Long-form mixes and music archive.",
      },
    ],
  },
];
