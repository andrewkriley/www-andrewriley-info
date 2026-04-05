"use client";

import { useState } from "react";

const endpoint =
  process.env.NEXT_PUBLIC_CONTACT_API?.replace(/\/$/, "") ?? "/api/contact";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (company) return;
    setStatus("sending");
    setErrMsg("");
    try {
      const res = await fetch(`${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("err");
        setErrMsg(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("ok");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("err");
      setErrMsg("Network error. If you are running locally, the contact API runs on Cloudflare Pages (see README).");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 max-w-lg space-y-5">
      <input
        type="text"
        name="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)]">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-[var(--color-text)]"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-[var(--color-text)]"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text)]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-[var(--color-text)]"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-[var(--color-brand-primary)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-primary-muted)] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send"}
      </button>
      {status === "ok" ? (
        <p className="text-sm text-green-700" role="status">
          Thanks — your message was sent.
        </p>
      ) : null}
      {status === "err" ? (
        <p className="text-sm text-red-700" role="alert">
          {errMsg}
        </p>
      ) : null}
    </form>
  );
}
