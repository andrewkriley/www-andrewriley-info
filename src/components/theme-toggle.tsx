"use client";

import { useEffect, useSyncExternalStore } from "react";

type ThemePreference = "light" | "dark";

const storageKey = "theme-preference";
const themeChangeEvent = "theme-preference-change";

function getThemePreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(storageKey);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  window.addEventListener("storage", callback);
  window.addEventListener(themeChangeEvent, callback);
  mediaQuery.addEventListener("change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(themeChangeEvent, callback);
    mediaQuery.removeEventListener("change", callback);
  };
}

function applyTheme(theme: ThemePreference) {
  document.documentElement.dataset.theme = theme;
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<ThemePreference>(
    subscribe,
    getThemePreference,
    () => "light",
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function handleToggle() {
    const updatedTheme = theme === "dark" ? "light" : "dark";

    window.localStorage.setItem(storageKey, updatedTheme);
    applyTheme(updatedTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={handleToggle}
      className="relative inline-flex h-6 w-11 items-center rounded-full border border-border-subtle bg-surface-muted p-0.5 text-text-secondary transition hover:text-text-primary"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Theme: ${theme}`}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        className={`grid size-5 place-items-center rounded-full bg-surface-card shadow-sm transition ${
          isDark ? "translate-x-5" : "translate-x-0"
        }`}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-6 1.4 3h-2.8L12 2Zm0 20-1.4-3h2.8L12 22ZM2 12l3-1.4v2.8L2 12Zm20 0-3 1.4v-2.8l3 1.4ZM4.2 4.2l3.1 1.1-2 2-1.1-3.1Zm15.6 15.6-3.1-1.1 2-2 1.1 3.1Zm0-15.6-1.1 3.1-2-2 3.1-1.1ZM4.2 19.8l1.1-3.1 2 2-3.1 1.1Z"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.1 2.1a9.7 9.7 0 1 0 9.8 9.8 7.1 7.1 0 0 1-9.8-9.8Z"
      />
    </svg>
  );
}
