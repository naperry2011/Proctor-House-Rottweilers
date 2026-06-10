"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Lightweight scroll-reveal wrapper — feed-native motion (spec §2).
 * Respects prefers-reduced-motion via the CSS in globals.css (.reveal).
 *
 * Uses IntersectionObserver with a scroll-listener fallback: some embedded /
 * emulated browsers don't deliver IO callbacks reliably, and content must never
 * stay invisible — conversion beats motion.
 */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const inViewport = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.92 && r.bottom > 0;
    };

    if (inViewport()) {
      setVisible(true);
      return;
    }

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setVisible(true);
      cleanup();
    };

    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && show(),
      { threshold: 0.15 },
    );
    obs.observe(el);

    // Fallback path for environments where IO callbacks don't fire.
    const onScroll = () => inViewport() && show();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const cleanup = () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    return cleanup;
  }, []);

  return (
    <Tag
      // @ts-expect-error — ref type narrows per tag at runtime
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
