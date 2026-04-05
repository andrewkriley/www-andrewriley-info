import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-4xl font-semibold text-[var(--color-text)]">Contact</h1>
      <p className="mt-4 text-[var(--color-text-muted)]">
        Send a message via the form below. Delivered with{" "}
        <a
          href="https://resend.com/"
          className="text-[var(--color-link)] hover:text-[var(--color-link-hover)]"
          rel="noopener noreferrer"
        >
          Resend
        </a>{" "}
        from a Cloudflare Pages Function (see <code className="text-sm">web/README.md</code>).
      </p>
      <ContactForm />
    </div>
  );
}
