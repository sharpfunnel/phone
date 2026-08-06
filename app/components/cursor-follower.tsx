"use client";

import { useEffect, useRef } from "react";

/**
 * A dot that sits exactly on the pointer with a ring that eases in behind it.
 * Only runs for fine pointers — on touch there is no cursor to replace, and a
 * lagging circle would just be a stray dot.
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    let targetX = 0;
    let targetY = 0;
    let ringX = 0;
    let ringY = 0;
    let frame = 0;
    let placed = false;

    const place = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const tick = () => {
      // Easing toward the pointer is what produces the trailing ring; with
      // reduced motion it snaps instead.
      const ease = reduced ? 1 : 0.18;
      ringX += (targetX - ringX) * ease;
      ringY += (targetY - ringY) * ease;
      place(ring, ringX, ringY);

      const settled =
        Math.abs(targetX - ringX) < 0.1 && Math.abs(targetY - ringY) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!placed) {
        placed = true;
        ringX = targetX;
        ringY = targetY;
        place(ring, ringX, ringY);
        root.classList.add("cursor-ready");
      }

      place(dot, targetX, targetY);
      if (!frame) frame = requestAnimationFrame(tick);
    };

    // Walk up until we hit an element that actually paints a background, then
    // judge its brightness. Cheaper than it looks — this runs on mouseover,
    // not on every mousemove.
    const isOnDarkSurface = (start: Element | null) => {
      for (let el = start; el; el = el.parentElement) {
        const colour = getComputedStyle(el).backgroundColor;
        const parts = colour.match(/[\d.]+/g);
        if (!parts || parts.length < 3) continue;
        const [r, g, b] = parts.map(Number);
        if (parts.length > 3 && Number(parts[3]) < 0.5) continue;
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.6;
      }
      return false;
    };

    // Grow the ring over anything clickable.
    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const interactive = target?.closest?.(
        "a, button, input, select, textarea, summary, [role='button']",
      );
      ring.classList.toggle("cursor-ring-active", Boolean(interactive));
      root.classList.toggle("cursor-on-blue", isOnDarkSurface(target));
    };

    const onLeave = () => root.classList.remove("cursor-ready");
    const onEnter = () => {
      if (placed) root.classList.add("cursor-ready");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove(
        "has-custom-cursor",
        "cursor-ready",
        "cursor-on-blue",
      );
    };
  }, []);

  return (
    <>
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" />
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" />
    </>
  );
}
