"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

const YoutubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const roles = ["Associate Technical Engineer", "AI & ML Engineer", "GenAI Developer", "LLM Specialist", "Salesforce Engineer"];

function ParticleCanvas({ dark }: { dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const N = 55;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? "#00dc82" : "#6366f1",
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (dark ? "99" : "55");
        ctx.fill();
      }
      // Draw connecting lines
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,220,130,${(1 - dist / 120) * (dark ? 0.12 : 0.07)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [dark]);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />;
}

export default function Hero() {
  const { dark } = useTheme();
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const orbY = useTransform(scrollY, [0, 600], [0, 80]);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout: NodeJS.Timeout;
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      } else {
        setRoleIdx((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIdx]);

  const bg = dark ? "#020817" : "#f8fafc";
  const textMain = dark ? "#ffffff" : "#0f172a";
  const textMuted = dark ? "#94a3b8" : "#64748b";
  const cardBg = dark ? "#0f1923" : "#ffffff";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";

  return (
    <section ref={sectionRef} id="hero" className="spotlight-section" style={{ background: bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {/* Particle network */}
      <ParticleCanvas dark={dark} />
      {/* Grid bg */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
      {/* Orbs with parallax */}
      <motion.div style={{ y: orbY }} className="animate-float" aria-hidden>
        <div style={{ position: "fixed", top: "20%", left: "15%", width: 400, height: 400, background: "#00dc82", borderRadius: "50%", filter: "blur(140px)", opacity: 0.08, pointerEvents: "none" }} />
      </motion.div>
      <div className="animate-float" style={{ position: "absolute", bottom: "20%", right: "15%", width: 320, height: 320, background: "#6366f1", borderRadius: "50%", filter: "blur(140px)", opacity: 0.08, animationDelay: "2s" }} />

      <div className="hero-inner" style={{ position: "relative", zIndex: 1 }}>
        {/* Left */}
        <div style={{ flex: "1 1 480px", minWidth: 0 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 20, fontSize: 12, fontFamily: "monospace", fontWeight: 700, marginBottom: 28, background: "rgba(0,220,130,0.1)", color: "#00dc82", border: "1px solid rgba(0,220,130,0.25)" }}>
              <span className="animate-pulse-ring" style={{ width: 8, height: 8, background: "#00dc82", borderRadius: "50%", display: "inline-block" }} />
              Open to opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.05, marginBottom: 16, color: textMain }}
          >
            Pratyaksh<br />
            <span className="gradient-text glitch" data-text="Bharadwaj">Bharadwaj</span>
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ fontSize: 22, fontFamily: "monospace", fontWeight: 600, marginBottom: 24, minHeight: 32, color: textMuted }}>
            <span style={{ color: "#6366f1" }}>{"// "}</span>
            {displayed}
            <span className="animate-blink" style={{ color: "#00dc82" }}>|</span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ fontSize: 17, lineHeight: 1.75, marginBottom: 36, color: textMuted, maxWidth: 520 }}>
            Technical problem-solver at{" "}
            <strong style={{ color: textMain }}>Salesforce</strong>, passionate about optimizing enterprise ecosystems through{" "}
            <strong style={{ color: "#00dc82" }}>Generative AI</strong>,{" "}
            <strong style={{ color: "#6366f1" }}>LLMs</strong>, and advanced analytics.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
            {[
              { href: "https://github.com/Pratyaksh999", icon: <GithubIcon />, label: "GitHub", bg: dark ? "rgba(255,255,255,0.06)" : "#fff", border: cardBorder, color: textMain },
              { href: "https://www.linkedin.com/in/pratyaksh-bharadwaj9/", icon: <LinkedinIcon />, label: "LinkedIn", bg: "#0077b5", border: "transparent", color: "#fff" },
              { href: "mailto:pratyakshbharadwaj@gmail.com", icon: <Mail size={16} />, label: "Get in touch", bg: "#00dc82", border: "transparent", color: "#000" },
              { href: "https://www.youtube.com/@pratyakshbharadwaj", icon: <YoutubeIcon size={16} />, label: "YouTube", bg: "#ff0000", border: "transparent", color: "#fff" },
            ].map(({ href, icon, label, bg: btnBg, border, color }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className="magnetic"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 12, fontSize: 14, fontWeight: 600, background: btnBg, border: `1px solid ${border}`, color, textDecoration: "none" }}
              >
                {icon} {label}
              </a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.55 }} className="hero-stats">
            {[{ num: "2+", label: "Years at Salesforce" }, { num: "5+", label: "AI Projects" }, { num: "$27M", label: "Contract Renewed" }].map(({ num, label }, i) => (
              <motion.div key={label} whileHover={{ scale: 1.1 }} style={{ cursor: "default" }}>
                <div className="gradient-text" style={{ fontSize: 28, fontWeight: 900, lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: 12, color: textMuted, marginTop: 4 }}>{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right — avatar with tilt */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} style={{ flex: "0 0 auto", display: "flex", justifyContent: "center" }}>
          <div className="tilt-card" style={{ position: "relative", width: 280, height: 280, borderRadius: "50%" }}>
            <div className="tilt-shine" />
            <div className="animate-spin-slow" style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px dashed rgba(0,220,130,0.3)" }} />
            <div style={{ position: "absolute", inset: 16, borderRadius: "50%", border: "1px solid rgba(99,102,241,0.2)" }} />
            <div style={{ position: "absolute", inset: 24, borderRadius: "50%", overflow: "hidden", border: dark ? "2px solid rgba(255,255,255,0.1)" : "2px solid rgba(0,0,0,0.08)", boxShadow: dark ? "0 0 40px rgba(0,220,130,0.15)" : "0 20px 60px rgba(0,0,0,0.12)" }}>
              <Image src="/avatar.png" alt="Pratyaksh Bharadwaj" fill style={{ objectFit: "cover", objectPosition: "center top" }} priority />
            </div>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", top: -4, right: -4, padding: "7px 14px", borderRadius: 12, fontSize: 12, fontWeight: 700, background: cardBg, border: "1px solid rgba(0,220,130,0.3)", color: "#00dc82" }}
            >
              🤖 GenAI
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              style={{ position: "absolute", bottom: -4, left: -4, padding: "7px 14px", borderRadius: 12, fontSize: 12, fontWeight: 700, background: cardBg, border: "1px solid rgba(99,102,241,0.3)", color: "#6366f1" }}
            >
              ⚡ Salesforce
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 11, color: textMuted }}>scroll</span>
        <ChevronDown size={16} color={textMuted} style={{ animation: "float 1.5s ease-in-out infinite" }} />
      </motion.div>
    </section>
  );
}
