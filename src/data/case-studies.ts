import type { CaseStudy } from "@/components/case-study-card";

export const caseStudies: CaseStudy[] = [
  {
    title: "Designing AI systems with boundaries",
    category: "Personal lab · Applied AI",
    description: "Exploring agent identities, scoped permissions, approval gates and observable behaviour as foundations for trustworthy systems.",
    evidence: "Personal experiments, not production customer deployments.",
    href: "/work#applied-ai",
  },
  {
    title: "Leading teams through technology change",
    category: "Professional experience · Leadership",
    description: "Building architecture capability, developing people and helping enterprise customers navigate complex technology decisions.",
    evidence: "Cisco and Google Cloud architecture leadership.",
    href: "/work#leadership",
  },
  {
    title: "Building to understand",
    category: "Personal projects · Engineering",
    description: "Using homelab infrastructure, automation and AI tooling to make ideas tangible, test assumptions and share practical lessons.",
    evidence: "Hands-on projects and writing archive.",
    href: "/journal",
  },
];
