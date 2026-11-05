import { site } from "@/data/site";
import { SocialIcon } from "@/components/social-icon";

export function HeaderSocialLinks() {
  return <nav className="order-2 flex shrink-0 items-center lg:order-3 lg:ml-3 lg:border-l lg:border-border-subtle lg:pl-3" aria-label="Social links">
    {site.socials.map(social => <a
      key={social.href}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${social.label} (opens in a new tab)`}
      title={`${social.label} (opens in a new tab)`}
      className="inline-flex size-9 items-center justify-center rounded-lg text-text-secondary transition hover:bg-surface-muted hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
    >
      <SocialIcon name={social.icon} className="size-5" />
    </a>)}
  </nav>;
}
