"use client";

import { useEffect, useRef } from "react";

type Logo = { src: string; alt: string };

export default function MarqueeTrack({
  logos,
  speed = 60,
}: {
  logos: Logo[];
  speed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef<boolean>(false);
  const lastFrameRef = useRef<number>(0);

  // current X offset (px, positive = scrolled to the right; track is translated by -offset)
  const offsetRef = useRef<number>(0);

  const hoveringRef = useRef<boolean>(false);
  const draggingRef = useRef<boolean>(false);
  const pointerStartXRef = useRef<number>(0);
  const offsetStartRef = useRef<number>(0);
  const activePointerIdRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const halfWidth = () => track.scrollWidth / 2;

    const applyTransform = () => {
      const half = halfWidth();
      if (half > 0) {
        offsetRef.current = ((offsetRef.current % half) + half) % half;
      }
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    };

    const updatePaused = () => {
      pausedRef.current = hoveringRef.current || draggingRef.current;
    };

    const step = (ts: number) => {
      if (!lastFrameRef.current) lastFrameRef.current = ts;
      const delta = ts - lastFrameRef.current;
      lastFrameRef.current = ts;

      if (!pausedRef.current) {
        offsetRef.current += (speed * delta) / 1000;
        applyTransform();
      }

      rafRef.current = requestAnimationFrame(step);
    };
    cancelAnimationFrame(rafRef.current);
    applyTransform();
    rafRef.current = requestAnimationFrame(step);

    const onPointerDown = (e: PointerEvent) => {
      if (draggingRef.current) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      draggingRef.current = true;
      pointerStartXRef.current = e.clientX;
      offsetStartRef.current = offsetRef.current;
      activePointerIdRef.current = e.pointerId;
      container.classList.add("is-dragging");
      try {
        container.setPointerCapture(e.pointerId);
      } catch {
        // ignore — capture may fail in some edge cases
      }
      updatePaused();
      if (e.pointerType === "mouse") {
        e.preventDefault();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      if (activePointerIdRef.current !== e.pointerId) return;
      const dx = e.clientX - pointerStartXRef.current;
      offsetRef.current = offsetStartRef.current - dx;
      applyTransform();
    };

    const endDrag = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      if (activePointerIdRef.current !== e.pointerId) return;
      draggingRef.current = false;
      activePointerIdRef.current = null;
      container.classList.remove("is-dragging");
      try {
        container.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      lastFrameRef.current = 0;
      updatePaused();
    };

    const onMouseEnter = () => {
      hoveringRef.current = true;
      updatePaused();
    };
    const onMouseLeave = () => {
      hoveringRef.current = false;
      lastFrameRef.current = 0;
      updatePaused();
    };
    const onFocusIn = () => {
      hoveringRef.current = true;
      updatePaused();
    };
    const onFocusOut = () => {
      hoveringRef.current = false;
      lastFrameRef.current = 0;
      updatePaused();
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", endDrag);
    container.addEventListener("pointercancel", endDrag);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("focusin", onFocusIn);
    container.addEventListener("focusout", onFocusOut);

    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", endDrag);
      container.removeEventListener("pointercancel", endDrag);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("focusin", onFocusIn);
      container.removeEventListener("focusout", onFocusOut);
    };
  }, [speed]);

  const all = [...logos, ...logos];

  return (
    <div
      ref={containerRef}
      className="sj-marquee"
      aria-label="Vybraní klienti Behavery"
    >
      <div ref={trackRef} className="sj-marquee-track">
        {all.map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={i < logos.length ? logo.alt : ""}
            aria-hidden={i < logos.length ? undefined : true}
            className="sj-logo-mark"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}
