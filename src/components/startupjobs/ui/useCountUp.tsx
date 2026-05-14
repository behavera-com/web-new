"use client";

import { useEffect, useRef, useState } from "react";

type UseCountUpOptions = {
  target: number;
  delayMs?: number;
  durationMs?: number;
  /** When set, observe this ref and start when it enters viewport. */
  triggerRef?: React.RefObject<HTMLElement | null>;
};

/**
 * Animates 0 → target with easeOutCubic, then briefly flips `pulse` true
 * so callers can apply a scale-up/scale-down emphasis at the finish.
 */
export function useCountUp({
  target,
  delayMs = 0,
  durationMs = 1400,
  triggerRef,
}: UseCountUpOptions) {
  const [value, setValue] = useState(0);
  const [pulse, setPulse] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    let raf = 0;
    let startTimer = 0;
    let pulseTimer = 0;

    const begin = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      let startTs = 0;
      const tick = (ts: number) => {
        if (!startTs) startTs = ts;
        const elapsed = ts - startTs;
        const t = Math.min(1, elapsed / durationMs);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(eased * target));
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setPulse(true);
          pulseTimer = window.setTimeout(() => setPulse(false), 720);
        }
      };
      startTimer = window.setTimeout(() => {
        raf = requestAnimationFrame(tick);
      }, delayMs);
    };

    if (triggerRef?.current && typeof IntersectionObserver !== "undefined") {
      const el = triggerRef.current;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              obs.disconnect();
              begin();
              break;
            }
          }
        },
        { threshold: 0.25 },
      );
      obs.observe(el);
      return () => {
        obs.disconnect();
        window.clearTimeout(startTimer);
        window.clearTimeout(pulseTimer);
        cancelAnimationFrame(raf);
      };
    }

    begin();
    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(pulseTimer);
      cancelAnimationFrame(raf);
    };
  }, [target, delayMs, durationMs, triggerRef]);

  return { value, pulse };
}

/**
 * Renders an animated number parsed from a "prefix + digits + suffix" string
 * (e.g. "12 dní", "+71", "79 %", "−15"). Pulses at the end of the count.
 */
export function CountUpNumber({
  target,
  delayMs = 0,
  durationMs = 1400,
  triggerRef,
  style,
  className,
  pulseScale = 1.45,
}: {
  target: string;
  delayMs?: number;
  durationMs?: number;
  triggerRef?: React.RefObject<HTMLElement | null>;
  style?: React.CSSProperties;
  className?: string;
  pulseScale?: number;
}) {
  const match = target.match(/^(\D*)(\d+)(.*)$/);
  const prefix = match ? match[1] : "";
  const finalNum = match ? parseInt(match[2], 10) : 0;
  const suffix = match ? match[3] : "";

  const { value, pulse } = useCountUp({
    target: finalNum,
    delayMs,
    durationMs,
    triggerRef,
  });

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        transformOrigin: "left center",
        transform: pulse ? `scale(${pulseScale})` : "scale(1)",
        transition: pulse
          ? "transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1)"
          : "transform 420ms cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "transform",
        ...style,
      }}
    >
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
