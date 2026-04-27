"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className,
}: {
  value: string;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(value);
  const [animated, setAnimated] = useState(false);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!isInView || animated) return;

    if (prefersReducedMotion) {
      setDisplay(prefix + value + suffix);
      setAnimated(true);
      return;
    }

    // Skip animation for ranges (en-dash), non-numeric, or very short values
    if (value.includes("–") || value.includes("-") && value.match(/\d.*-.*\d/)) {
      setDisplay(value);
      setAnimated(true);
      return;
    }

    const numMatch = value.match(/[\d\s,.]+/);
    if (!numMatch) {
      setDisplay(value);
      setAnimated(true);
      return;
    }

    const numStr = numMatch[0].replace(/\s/g, "");
    const target = parseFloat(numStr.replace(",", "."));

    if (isNaN(target) || target === 0) {
      setDisplay(value);
      setAnimated(true);
      return;
    }

    const beforeNum = value.slice(0, numMatch.index);
    const afterNum = value.slice((numMatch.index || 0) + numMatch[0].length);
    const hasDecimal = numStr.includes(",") || numStr.includes(".");

    const duration = 1000;
    const steps = 25;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - step / steps, 3);
      const current = target * eased;

      let formatted: string;
      if (hasDecimal) {
        formatted = current.toFixed(1).replace(".", ",");
      } else if (target >= 1000) {
        formatted = Math.round(current).toLocaleString("cs-CZ");
      } else {
        formatted = Math.round(current).toString();
      }

      setDisplay(prefix + beforeNum + formatted + afterNum + suffix);

      if (step >= steps) {
        clearInterval(timer);
        setDisplay(prefix + value + suffix);
        setAnimated(true);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value, prefix, suffix, animated]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
