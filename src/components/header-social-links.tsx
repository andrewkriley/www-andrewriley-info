import { site } from "@/data/site";
import { SocialIcon } from "@/components/social-icon";

export function HeaderSocialLinks() {
  return (
    <nav
      className="flex items-center gap-0.5"
      aria-label="Social links"
    >
      {site.socials.map((social) => (
        <a
          key={social.href}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="rounded-full p-2 text-text-secondary transition hover:bg-surface-muted hover:text-text-primary"
        >
          <SocialIcon name={social.icon} className="size-4" />
        </a>
      ))}
    </nav>
  );
}
