// Role details checked against Andrew's LinkedIn experience on 5 November 2026.
// Journal examples describe what Andrew did; shared customer stories are not attributed as his delivery.
export const experiencePersonas = [
  {
    id: "leader",
    label: "Leader",
    title: "Build capability that outlasts a project.",
    description: "At Google Cloud, I led the ANZ technology and architecture team, with responsibility for people, performance and customer coverage. At Cisco, I led partner and NSW architecture teams and served as deputy CTO in customer, partner and media engagements. Leadership also means bringing people together to learn and put ideas to work.",
    evidence: [
      { href: "/p/linkedin-6587221303189733377", label: "Bringing partner architects together across ANZ", context: "Cisco Partner Architect Exchange · 2019" },
      { href: "/p/linkedin-7523100329526210560", label: "Helping bring Enterprise AI Builders Day to Cisco Live", context: "Program preparation · 2026" },
    ],
  },
  {
    id: "architect",
    label: "Architect",
    title: "Connect the business goal to a workable system.",
    description: "My architecture work spans global enterprise accounts, cloud transformation and digital healthcare. As lead architect for IBM across APJC and India, I helped set the direction for multi-year architecture projects. In healthcare, the focus became patient experience, repeatable capabilities and resilient foundations: understanding the service before choosing the technology.",
    evidence: [
      { href: "/p/linkedin-6927772651352469505", label: "Designing virtual care around different patient and clinical needs", context: "Healthcare architecture perspective · 2022" },
      { href: "/p/linkedin-6912272550991462400", label: "Making service dependencies visible to build trust", context: "Digital assurance perspective · 2022" },
    ],
  },
  {
    id: "builder",
    label: "Builder",
    title: "Stay close enough to the work to test the idea.",
    description: "At Servcorp, I defined and implemented deployment strategies for 16 global communications platforms; at Getronics, I implemented enterprise and government collaboration systems. That engineering instinct continues in field experiments and my personal lab, where I build integrations, test AI agents and use observability to understand what actually happens.",
    evidence: [
      { href: "/p/linkedin-7000629303965089792", label: "Field-testing a digital stethoscope over Webex and Starlink", context: "Exploratory regional NSW test · 2022" },
      { href: "/p/linkedin-7507060153016324096", label: "Building an app to inspect how AI agents use tools", context: "Personal lab · 2026" },
    ],
  },
];

export const workingPillars = [
  {
    label: "Discover",
    principle: "Understand the experience people need before selecting a platform.",
    title: "Start with the virtual care service",
    example: "I asked whether a platform could support changing care models, multidisciplinary teams and different patient experiences. Those questions shape the requirements before the technology choice.",
    href: "/p/linkedin-6927772651352469505",
    context: "Professional perspective · Digital health",
  },
  {
    label: "Architect",
    principle: "Give each part of the system a clear responsibility.",
    title: "Separate three kinds of AI memory",
    example: "In my multi-agent lab, Git holds reviewed decisions, an episodic API holds session history, and each harness keeps its own scratchpad. The design makes authority and hand-offs explicit.",
    href: "/p/linkedin-7477316964600737792",
    context: "Personal lab · AI architecture",
  },
  {
    label: "Build",
    principle: "Make the idea tangible and test it in its intended setting.",
    title: "Take a telehealth prototype into the field",
    example: "I connected a digital stethoscope to Webex over Starlink and tested calls from a regional NSW location with no 4G throughput. It explored what was possible and identified the need for more rigorous testing.",
    href: "/p/linkedin-7000629303965089792",
    context: "Professional experiment · Regional connectivity",
  },
  {
    label: "Enable",
    principle: "Help others develop the capability to act.",
    title: "Bring partner architects together",
    example: "I helped bring the Cisco Partner Architect Exchange to life, with a planned cohort of 75 architects from Australia and New Zealand: a shared forum for the people helping customers operate and transform.",
    href: "/p/linkedin-6587221303189733377",
    context: "Professional community · Partner capability",
  },
  {
    label: "Learn",
    principle: "Use observed behaviour to improve the next decision.",
    title: "Choose the model for the job",
    example: "When reasoning models added narration, latency and malformed tool calls to my agent workflow, I switched model class. The lesson: judge fit by useful output, resource cost and human cleanup.",
    href: "/p/linkedin-7476546127954112512",
    context: "Personal lab · Testing assumptions",
  },
];

export const experienceHighlights = [
  {
    title: "Lead at scale",
    description: "Develop people, build architecture capability and connect customers, partners and teams across ANZ and APAC.",
    examples: [
      { href: "/p/linkedin-6587221303189733377", label: "Build an architecture community across ANZ", context: "Cisco Partner Architect Exchange" },
      { href: "/p/linkedin-6673312159277162496", label: "Connect partner expertise across APAC", context: "Sharing Google Cloud and Console Connect learning" },
    ],
  },
  {
    title: "Connect strategy to systems",
    description: "Turn business ambition into practical architecture across cloud, healthcare, networking and security.",
    examples: [
      { href: "/p/linkedin-6927772651352469505", label: "Start with the care experience people need", context: "Virtual care architecture and platform choices" },
      { href: "/p/linkedin-6912272550991462400", label: "Connect service visibility with trust", context: "Digital assurance in healthcare" },
    ],
  },
  {
    title: "Build to understand",
    description: "Bring engineering and operational experience to hands-on experiments in AI, automation and observability.",
    examples: [
      { href: "/p/linkedin-7507060153016324096", label: "Inspect how an AI agent actually works", context: "Personal lab · Agent observability" },
      { href: "/p/ha-ryde-waste-collection", label: "Turn a daily need into a working integration", context: "Personal project · Home Assistant automation" },
    ],
  },
];

export const careerRoles = [
  { date: "Apr 2026–present", title: "Solutions Engineer — Splunk Partners", company: "Cisco", detail: "Enabling partner community, coverage and capability through the combined value of Cisco and Splunk." },
  { date: "Sep 2023–Apr 2026", title: "Head of Solution Architecture — NSW", company: "Cisco", detail: "Led customer-focused architects and served as deputy CTO in customer, partner and media engagements." },
  { date: "Mar 2021–Sep 2023", title: "Industry Architect — Healthcare", company: "Cisco", detail: "Connected patient experience, digital health strategy and resilient infrastructure through repeatable capabilities." },
  { date: "Nov 2019–Mar 2021", title: "Regional Manager, Technology & Architecture — ANZ", company: "Google Cloud", detail: "Led regional technologists, developing team culture, talent and performance while helping customers realise value from cloud." },
  { date: "Oct 2016–Nov 2019", title: "Manager, Sales Engineering — ANZ Partner and NSW", company: "Cisco", detail: "Led technical sales teams for the partner business and NSW architecture, developing people and customer coverage." },
  { date: "Jun 2015–Oct 2016", title: "Consultant", company: "Cisco", detail: "Technical account leadership for retail customers, connecting joint strategy, architecture and service delivery." },
  { date: "Dec 2009–Jun 2015", title: "Global (Sales) Systems Engineer", company: "Cisco", detail: "Lead architect for IBM APJC and India, shaping multi-year architecture projects and strategic stakeholder relationships." },
  { date: "Jan–Dec 2009", title: "National Solutions Consultant", company: "UXC", detail: "Lead architect for enterprise and government infrastructure projects serving 3,000 users, with national responsibility for B2B collaboration solutions." },
  { date: "Sep 2006–Jan 2009", title: "Technical Consultant", company: "Getronics", detail: "Implemented multi-site voice, contact centre and collaboration projects of more than 2,000 seats; developed implementation practices to simplify support." },
  { date: "Apr 2005–Sep 2006", title: "Systems Engineer", company: "Alphawest", detail: "Technical mentor, lead design consultant and implementation engineer for infrastructure and unified communications projects." },
  { date: "Apr 2001–Apr 2005", title: "Senior IP Engineer", company: "Servcorp", detail: "Led global engineering and defined and implemented deployment strategies for 16 global communications platforms, spanning implementation, operation and support." },
];
