import type { Metadata } from "next";
import Image from "next/image";
import { EditorialHero } from "@/components/editorial-hero";
import { CaseStudyCard } from "@/components/case-study-card";
import { ExperienceNarrative } from "@/components/experience-narrative";
import { caseStudies } from "@/data/case-studies";

export const metadata: Metadata = { title: "Work", description: "Enterprise architecture, leadership, hands-on engineering and Applied AI exploration." };

export default function WorkPage() {
  return <>
    <EditorialHero eyebrow="Selected work" title="Work that connects people, technology and outcomes." description="I&apos;ve spent my career working across the boundaries between business ambition, technical architecture and the people responsible for making change happen." image="/images/hero/riles_presenting3.jpg" imageAlt="Andrew Riley presenting to an audience" primary={{href:"#selected",label:"Explore the work"}} secondary={{href:"/about",label:"My story"}} />
    <section id="selected" className="mx-auto max-w-6xl px-5 py-14">
      <h2 className="text-3xl font-bold text-text-primary">Selected evidence</h2>
      <p className="mt-3 max-w-3xl leading-7 text-text-secondary">Professional outcomes and personal experiments are clearly distinguished. Each is an opportunity to show the problem, approach, decisions and learning.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">{caseStudies.map(item=><CaseStudyCard key={item.title} {...item}/>)}</div>
    </section>
    <ExperienceNarrative />
    <section id="leadership" className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-2 md:items-center">
      <div><p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">Enterprise experience</p><h2 className="mt-3 text-3xl font-bold">Strategy in the boardroom. Capability in the team.</h2><p className="mt-5 leading-8 text-text-secondary">Across Cisco and Google Cloud, I&apos;ve led architecture and engineering teams, developed talent and connected customer priorities to technical direction. I now work with Splunk partners, helping grow community, coverage and capability across the combined Cisco and Splunk portfolio.</p></div>
      <div className="relative aspect-[5/4] overflow-hidden rounded-2xl"><Image src="/images/hero/riles_presenting1.jpeg" alt="Andrew Riley speaking at a professional event" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover"/></div>
    </section>
    <section id="applied-ai" className="bg-surface-card py-16"><div className="mx-auto max-w-6xl px-5"><p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">Applied AI · Personal lab</p><h2 className="mt-3 text-3xl font-bold">Beyond the demo: systems that can be understood and governed.</h2><p className="mt-5 max-w-3xl leading-8 text-text-secondary">I&apos;m exploring how agents receive identities and permissions, how sensitive actions are approved, and how their behaviour is observed. These are hands-on lab experiments — not claims of production enterprise AI delivery. They help connect new technical possibilities with the enterprise architecture discipline I&apos;ve developed over my career.</p></div></section>
    <section id="engineering" className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:items-center"><div className="relative aspect-[5/4] overflow-hidden rounded-2xl"><Image src="/images/hero/andrew_building.jpg" alt="Andrew Riley working on a hands-on project" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover"/></div><div><p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">Engineering through experimentation</p><h2 className="mt-3 text-3xl font-bold">Build to learn. Test assumptions. Share the results.</h2><p className="mt-5 leading-8 text-text-secondary">Homelab infrastructure, automation and AI tooling give me a practical environment to explore how systems actually behave. The most useful experiments are the ones that improve the next decision.</p></div></section>
  </>;
}
