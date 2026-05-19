"use client";
import { useEffect, useRef } from "react";

const TILT_RESET = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";

export default function InteractiveLayer() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const ringPosRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    /* ── tilt card leave handler ── */
    const onTiltLeave = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transition = "transform 0.45s cubic-bezier(.23,1,.32,1)";
      el.style.transform = TILT_RESET;
      // remove transition after it completes so mousemove updates feel instant
      const tid = setTimeout(() => { el.style.transition = ""; }, 460);
      (el as HTMLElement & { _tiltTid?: ReturnType<typeof setTimeout> })._tiltTid = tid;
    };

    /* ── tilt card enter: cancel any pending reset transition ── */
    const onTiltEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement & { _tiltTid?: ReturnType<typeof setTimeout> };
      clearTimeout(el._tiltTid);
      el.style.transition = "";
    };

    /* ── attach tilt listeners ── */
    const tiltListened = new WeakSet<HTMLElement>();
    const setupTilt = () => {
      document.querySelectorAll<HTMLElement>(".tilt-card").forEach(el => {
        if (tiltListened.has(el)) return;
        tiltListened.add(el);
        el.addEventListener("mouseleave", onTiltLeave);
        el.addEventListener("mouseenter", onTiltEnter);
      });
    };
    setupTilt();

    /* ── mousemove: tilt active card, ignore others ── */
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";

      // Spotlight
      document.querySelectorAll<HTMLElement>(".spotlight-section").forEach(el => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - rect.left) + "px");
        el.style.setProperty("--my", (e.clientY - rect.top) + "px");
      });

      // Tilt — only update card the cursor is actually over
      document.querySelectorAll<HTMLElement>(".tilt-card").forEach(el => {
        const rect = el.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const inside = mx >= 0 && my >= 0 && mx <= rect.width && my <= rect.height;
        if (!inside) return;
        const rx = ((my / rect.height) - 0.5) * -14;
        const ry = ((mx / rect.width) - 0.5) * 14;
        el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
        el.style.setProperty("--mx", (mx / rect.width * 100) + "%");
        el.style.setProperty("--my", (my / rect.height * 100) + "%");
      });
    };

    /* ── magnetic buttons ── */
    const magneticListened = new WeakSet<HTMLElement>();
    const setupMagnetic = () => {
      document.querySelectorAll<HTMLElement>(".magnetic").forEach(el => {
        if (magneticListened.has(el)) return;
        magneticListened.add(el);
        el.addEventListener("mousemove", (e) => {
          const rect = el.getBoundingClientRect();
          const dx = e.clientX - rect.left - rect.width / 2;
          const dy = e.clientY - rect.top - rect.height / 2;
          el.style.transform = `translate(${dx * 0.35}px, ${dy * 0.35}px)`;
        });
        el.addEventListener("mouseleave", () => {
          el.style.transition = "transform 0.4s cubic-bezier(.23,1,.32,1)";
          el.style.transform = "translate(0,0)";
          setTimeout(() => { el.style.transition = ""; }, 410);
        });
      });
    };
    setupMagnetic();

    /* ── cursor hover state ── */
    const hoverListened = new WeakSet<Element>();
    const onEnterHover = () => document.body.classList.add("cursor-hover");
    const onLeaveHover = () => document.body.classList.remove("cursor-hover");
    const addHoverListeners = () => {
      document.querySelectorAll("a, button, [role='button'], .tilt-card, .glow-card, .skill-tag").forEach(el => {
        if (hoverListened.has(el)) return;
        hoverListened.add(el);
        el.addEventListener("mouseenter", onEnterHover);
        el.addEventListener("mouseleave", onLeaveHover);
      });
    };
    addHoverListeners();

    const onMouseDown = () => document.body.classList.add("cursor-click");
    const onMouseUp = () => document.body.classList.remove("cursor-click");

    /* ── MutationObserver for dynamically added elements ── */
    const mo = new MutationObserver(() => {
      addHoverListeners();
      setupMagnetic();
      setupTilt();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    /* ── smooth ring follow ── */
    const animate = () => {
      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.12;
      ring.style.left = ringPosRef.current.x + "px";
      ring.style.top = ringPosRef.current.y + "px";
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafRef.current);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
      <div className="scanline" aria-hidden="true" />
    </>
  );
}
