export const site = {
  name: "Andrew Riley",
  nickname: "Riles",
  url: "https://www.andrewriley.info",
  description:
    "From breadboards to boardrooms: Andrew Riley's portfolio of leadership, technology and DIY builds, creative play through music, and personal health.",
  nav: [
    { href: "/health", label: "Health" },
    { href: "/build", label: "Build" },
    { href: "/play", label: "Play" },
    { href: "/lead", label: "Lead" },
  ],
  socials: [
    { href: "https://github.com/andrewkriley", label: "GitHub" },
    { href: "https://www.linkedin.com/in/andrewriley", label: "LinkedIn" },
    { href: "https://www.youtube.com/@rilesdj", label: "YouTube" },
    { href: "https://www.mixcloud.com/rilesdj/", label: "Mixcloud" },
  ],
};

export const featuredWork = [
  {
    title: "Health as foundation",
    label: "Health",
    href: "/health",
    description:
      "Wellbeing, physical and mental health, diet, and exercise as the foundation that makes the rest sustainable.",
    proof: "Wellbeing, movement, nutrition, recovery",
  },
  {
    title: "Systems and hands-on builds",
    label: "Build",
    href: "/build",
    description:
      "AI tooling, homelab infrastructure, automation, home projects, and DIY work share the same builder's mindset.",
    proof: "AI, homelab, automation, DIY",
  },
  {
    title: "DJ Riles",
    label: "Play",
    href: "/play",
    description:
      "Music is the creative outlet: emotional, almost spiritual, and a place to explore energy and connection.",
    proof: "YouTube, Mixcloud, live mixes",
  },
  {
    title: "Professional leadership",
    label: "Lead",
    href: "/lead",
    description:
      "Leadership, people, process, and the work of helping others grow while moving useful ideas forward.",
    proof: "Teams, communication, strategy, growth",
  },
];

export const heroImages = [
  {
    label: "Health",
    title: "Wellbeing and movement",
    src: "/images/hero/andrew_running1.jpg",
    alt: "Andrew Riley running",
  },
  {
    label: "Build",
    title: "Technology and hands-on making",
    src: "/images/hero/andrew_building.jpg",
    alt: "Andrew Riley working on a build project",
  },
  {
    label: "Play",
    title: "DJ Riles",
    src: "/images/hero/dj_riles_vegas.png",
    alt: "DJ Riles in Las Vegas",
  },
  {
    label: "Lead",
    title: "Professional leadership",
    src: "/images/hero/riles_presenting1.jpeg",
    alt: "Andrew Riley presenting professionally",
  },
];

export const nowBuilding = [
  {
    title: "This portfolio",
    description:
      "Rebuilding the site as proof-of-work: a digital CV shaped around active projects rather than a static resume.",
    href: "/p/claude-new-post-skill",
  },
  {
    title: "Systems and infrastructure",
    description:
      "A GitOps-driven homelab platform for learning, automation, and reliable personal infrastructure.",
    href: "/p/homelab-platform-homeaiops",
  },
  {
    title: "Hands-on builds",
    description:
      "Capturing the physical side of building: tools, materials, constraints, mistakes, and finished work.",
    href: "/build",
  },
];

export const principles = [
  "Health means protecting the physical and mental foundation underneath it all.",
  "Build means making useful things visible, repeatable, and understandable.",
  "Play means keeping creativity, energy, and curiosity alive.",
  "Lead means helping people, teams, and ideas move forward.",
  "Leadership should help people grow beyond the task in front of them.",
];

export const healthPillars = [
  {
    title: "Wellbeing",
    description:
      "The broader operating system: energy, sleep, recovery, routines, and the conditions that make good work and good life possible.",
  },
  {
    title: "Physical health",
    description:
      "Strength, mobility, endurance, and staying capable enough to keep building, leading, and showing up.",
  },
  {
    title: "Mental health",
    description:
      "Clarity, emotional regulation, stress management, reflection, and noticing when the system needs care.",
  },
  {
    title: "Diet",
    description:
      "Food as fuel and rhythm: practical nutrition, consistency, hydration, and choices that support energy rather than perfection.",
  },
  {
    title: "Exercise",
    description:
      "Movement as maintenance and play: walking, training, outdoor work, and the habits that keep the body engaged.",
  },
];

export const uses = [
  {
    category: "Tech Stack (This Site)",
    description: "The stack behind this portfolio rebuild.",
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
        detail: "Target hosting platform via OpenNext and Wrangler.",
      },
    ],
  },
  {
    category: "Dev And AI Tools",
    description: "Tools that help me build, reason, and move faster.",
    items: [
      {
        name: "Cursor",
        detail: "AI-first editor for rapid prototyping and codebase work.",
      },
      {
        name: "Claude",
        detail: "Planning, writing, technical debugging, and workflow design.",
      },
      {
        name: "Git",
        detail: "Version control and the backbone of my build workflows.",
      },
      {
        name: "GitLab CI/CD",
        detail: "Pipelines for homelab and infrastructure automation.",
      },
    ],
  },
  {
    category: "Homelab And Automation",
    description: "The practical infrastructure playground.",
    items: [
      {
        name: "Proxmox",
        detail: "Virtualisation platform for the home lab.",
      },
      {
        name: "Terraform / OpenTofu",
        detail: "Infrastructure provisioning and repeatable environments.",
      },
      {
        name: "Ansible",
        detail: "Configuration management and server setup.",
      },
      {
        name: "Home Assistant",
        detail: "Home automation and useful local integrations.",
      },
      {
        name: "Splunk",
        detail: "Logs, observability, and experiments with MCP access.",
      },
    ],
  },
  {
    category: "Music",
    description: "The creative outlet and energy source.",
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
      {
        name: "Music gear",
        detail: "Add decks, controller, headphones, and audio setup here.",
      },
    ],
  },
  {
    category: "DIY And Making",
    description: "Hands-on tools and projects still to be documented.",
    items: [
      {
        name: "Workshop tools",
        detail: "Add the tools you reach for most often.",
      },
      {
        name: "Build materials",
        detail: "Add preferred materials, finishes, and suppliers.",
      },
      {
        name: "Project photos",
        detail: "Use this as a future index for DIY build logs.",
      },
    ],
  },
];
