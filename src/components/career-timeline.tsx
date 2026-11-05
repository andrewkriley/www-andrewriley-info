import { careerRoles } from "@/data/experience";

export function CareerTimeline() {
  return <><ol className="space-y-7">{careerRoles.map(role => <li key={`${role.title}-${role.company}`} className="border-l-2 border-brand-primary pl-5">
    <p className="text-xs text-text-muted">{role.date}</p>
    <h3 className="mt-1 font-semibold">{role.title}</h3>
    <p className="mt-1 text-sm font-semibold text-text-secondary">{role.company}</p>
    <p className="mt-2 text-sm leading-6 text-text-secondary">{role.detail}</p>
  </li>)}</ol><a href="https://www.linkedin.com/in/andrewriley/" target="_blank" rel="noreferrer" className="mt-7 inline-block text-sm font-semibold text-brand-primary hover:underline">Full work history on LinkedIn ↗</a></>;
}
