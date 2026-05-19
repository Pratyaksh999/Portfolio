"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Mail, MapPin, Phone, ExternalLink, ChevronRight, Send, Trophy, Zap, RotateCcw } from "lucide-react";

/* ── Icons ── */
const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/* ── Typewriter hook ── */
function useTypewriter(text: string, speed = 35) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return { displayed, done };
}

/* ── Confetti burst (canvas) ── */
function ConfettiBurst({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!active) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 80 }, () => ({
      x: canvas.width / 2, y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.9) * 12,
      color: ["#00dc82","#6366f1","#f59e0b","#ec4899","#fff"][Math.floor(Math.random()*5)],
      r: Math.random() * 5 + 2,
      life: 1,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.3; p.life -= 0.015;
        if (p.life <= 0) continue;
        alive = true;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (alive) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [active]);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 20 }} />;
}

/* ── XP floater ── */
function XPFloater({ xp, trigger }: { xp: number; trigger: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!trigger) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1000);
    return () => clearTimeout(t);
  }, [trigger]);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.6 }}
          animate={{ opacity: 1, y: -50, scale: 1 }}
          exit={{ opacity: 0, y: -80, scale: 0.8 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ position: "absolute", top: 16, right: 24, pointerEvents: "none", zIndex: 30, fontFamily: "monospace", fontSize: 18, fontWeight: 900, color: "#00dc82", textShadow: "0 0 24px rgba(0,220,130,0.9)" }}
        >
          +{xp} XP
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Step config ── */
const STEPS = [
  { key: "name",    label: "LEVEL 01 — IDENTIFY",  prompt: "What's your name, player?",         placeholder: "Enter your name…",          type: "text",     xp: 100, icon: "🧑‍💻" },
  { key: "email",   label: "LEVEL 02 — LOCATE",    prompt: "Your contact coordinates?",          placeholder: "your@email.com",             type: "email",    xp: 200, icon: "📡" },
  { key: "subject", label: "LEVEL 03 — CLASSIFY",  prompt: "What's the mission objective?",      placeholder: "e.g. Job opportunity, Collab…", type: "text", xp: 300, icon: "🎯" },
  { key: "message", label: "LEVEL 04 — TRANSMIT",  prompt: "Write your transmission:",           placeholder: "What's on your mind?",      type: "textarea", xp: 400, icon: "💬" },
] as const;

type StepKey = "name" | "email" | "subject" | "message";
type Phase = "intro" | StepKey | "sending" | "success" | "error";

export default function Contact() {
  const { dark } = useTheme();
  const bg = dark ? "#0d1117" : "#f8fafc";
  const cardBg = dark ? "#0f1923" : "#ffffff";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const textMain = dark ? "#ffffff" : "#0f172a";
  const textMuted = dark ? "#94a3b8" : "#64748b";

  const [phase, setPhase] = useState<Phase>("intro");
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" });
  const [xpTotal, setXpTotal] = useState(0);
  const [xpTrigger, setXpTrigger] = useState<{ xp: number; id: number } | null>(null);
  const [confetti, setConfetti] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const stepIdx = ["name", "email", "subject", "message"].indexOf(phase);
  const progress = phase === "intro" ? 0 : phase === "success" || phase === "sending" ? 100 : Math.round(((stepIdx + 1) / 4) * 100);

  const currentStep = STEPS.find(s => s.key === phase);
  const { displayed: typedPrompt, done: promptDone } = useTypewriter(currentStep?.prompt ?? "", 38);

  // Auto-focus input when step changes
  useEffect(() => {
    if (inputRef.current && promptDone) inputRef.current.focus();
  }, [promptDone, phase]);

  const advance = useCallback(() => {
    if (phase === "intro") { setPhase("name"); return; }
    const step = STEPS.find(s => s.key === phase);
    if (!step) return;
    const val = fields[phase as StepKey].trim();
    if (!val) return;
    // XP
    setXpTotal(t => t + step.xp);
    setXpTrigger({ xp: step.xp, id: Date.now() });
    // Advance
    if (phase === "name") setPhase("email");
    else if (phase === "email") setPhase("subject");
    else if (phase === "subject") setPhase("message");
    else if (phase === "message") submit();
  }, [phase, fields]);

  const submit = async () => {
    setPhase("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fields.name, email: fields.email, subject: fields.subject, message: fields.message }),
      });
      if (!res.ok) throw new Error();
      setPhase("success");
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3000);
    } catch {
      setPhase("error");
    }
  };

  const reset = () => {
    setPhase("intro");
    setFields({ name: "", email: "", subject: "", message: "" });
    setXpTotal(0);
    setXpTrigger(null);
    setConfetti(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && phase !== "message") { e.preventDefault(); advance(); }
    if (e.key === "Enter" && e.ctrlKey && phase === "message") { e.preventDefault(); advance(); }

  };

  const socials = [
    { icon: <Mail size={20} />, label: "Email", value: "pratyakshbharadwaj@gmail.com", href: "mailto:pratyakshbharadwaj@gmail.com", color: "#00dc82" },
    { icon: <GithubIcon />, label: "GitHub", value: "github.com/Pratyaksh999", href: "https://github.com/Pratyaksh999", color: dark ? "#e2e8f0" : "#334155" },
    { icon: <LinkedinIcon />, label: "LinkedIn", value: "pratyaksh-bharadwaj9", href: "https://www.linkedin.com/in/pratyaksh-bharadwaj9/", color: "#0077b5" },
    { icon: <Phone size={20} />, label: "Phone", value: "+91 8192009005", href: "tel:+918192009005", color: "#f59e0b" },
    { icon: <YoutubeIcon />, label: "YouTube", value: "@pratyakshbharadwaj", href: "https://www.youtube.com/@pratyakshbharadwaj", color: "#ff0000" },
  ];

  return (
    <section id="contact" className="spotlight-section section-pad" style={{ background: bg, position: "relative" }}>
      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ color: "#00dc82", fontFamily: "monospace", fontSize: 14, fontWeight: 700 }}>06.</span>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, rgba(0,220,130,0.3), transparent)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 16, color: textMain }}>
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p style={{ fontSize: 16, color: textMuted, marginBottom: 48, maxWidth: 480 }}>
            Complete the mission below to send me a message. No boring forms allowed.
          </p>
        </motion.div>

        <div className="grid-contact">

          {/* ── GAME FORM ── */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ borderRadius: 22, background: cardBg, border: `1px solid ${cardBorder}`, position: "relative", overflow: "hidden", minHeight: 420 }}
          >
            <ConfettiBurst active={confetti} />
            {xpTrigger && <XPFloater key={xpTrigger.id} xp={xpTrigger.xp} trigger={true} />}

            {/* Top bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #00dc82, #6366f1, transparent)" }} />

            {/* HUD bar */}
            <div style={{ padding: "18px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              {/* XP bar */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, fontFamily: "monospace", fontWeight: 700, color: textMuted, letterSpacing: "1px", marginBottom: 5, textTransform: "uppercase" }}>
                  Progress
                </div>
                <div style={{ height: 6, borderRadius: 10, background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)", overflow: "hidden" }}>
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ height: "100%", borderRadius: 10, background: "linear-gradient(90deg, #00dc82, #6366f1)" }}
                  />
                </div>
              </div>
              {/* Score */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 9, fontFamily: "monospace", fontWeight: 700, color: textMuted, letterSpacing: "1px", textTransform: "uppercase" }}>XP</div>
                <motion.div
                  key={xpTotal}
                  initial={{ scale: 1.4, color: "#00dc82" }}
                  animate={{ scale: 1, color: "#00dc82" }}
                  transition={{ duration: 0.3 }}
                  style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 900, color: "#00dc82" }}
                >
                  {xpTotal.toString().padStart(4, "0")}
                </motion.div>
              </div>
            </div>

            {/* Content area */}
            <div style={{ padding: "24px 24px 28px" }}>
              <AnimatePresence mode="wait">

                {/* ── INTRO ── */}
                {phase === "intro" && (
                  <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, color: "#00dc82", letterSpacing: "2px", marginBottom: 20, textTransform: "uppercase" }}>
                      &gt; MISSION BRIEFING
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 13, color: textMuted, lineHeight: 1.9, marginBottom: 28 }}>
                      <span style={{ color: "#6366f1" }}>$ </span>initiating contact_protocol.sh<br />
                      <span style={{ color: textMuted }}>— 4 objectives to complete</span><br />
                      <span style={{ color: textMuted }}>— earn up to </span><span style={{ color: "#00dc82" }}>1000 XP</span><br />
                      <span style={{ color: textMuted }}>— message delivered instantly</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                      {STEPS.map((s, i) => (
                        <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: `1px solid ${cardBorder}` }}>
                          <span style={{ fontSize: 18 }}>{s.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: "monospace", fontSize: 10, fontWeight: 700, color: "#6366f1", letterSpacing: "1px" }}>{s.label}</div>
                            <div style={{ fontSize: 13, color: textMuted }}>{s.prompt}</div>
                          </div>
                          <span style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 800, color: "#00dc82" }}>+{s.xp} XP</span>
                        </div>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      onClick={advance}
                      className="magnetic"
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 28px", borderRadius: 14, fontSize: 15, fontWeight: 800, background: "linear-gradient(135deg, #00dc82, #6366f1)", color: "#fff", border: "none", cursor: "none", fontFamily: "monospace", letterSpacing: "1px" }}
                    >
                      <Zap size={16} fill="#fff" /> START MISSION <ChevronRight size={16} />
                    </motion.button>
                  </motion.div>
                )}

                {/* ── STEPS ── */}
                {(phase === "name" || phase === "email" || phase === "subject" || phase === "message") && (
                  <motion.div key={phase} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35, ease: "easeOut" }}>
                    {/* Level label */}
                    <div style={{ fontFamily: "monospace", fontSize: 10, fontWeight: 700, color: "#6366f1", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 10 }}>
                      {currentStep?.label}
                    </div>

                    {/* Typewriter prompt */}
                    <div style={{ fontSize: 20, fontWeight: 800, color: textMain, marginBottom: 24, minHeight: 56, lineHeight: 1.4 }}>
                      {typedPrompt}
                      <span className="animate-blink" style={{ color: "#00dc82", marginLeft: 2 }}>▌</span>
                    </div>

                    {/* Previously filled fields (summary) */}
                    {(() => {
                      const p = phase as string;
                      return (
                        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
                          {(p === "email" || p === "subject" || p === "message") && (
                            <div style={{ fontFamily: "monospace", fontSize: 12, color: textMuted }}>
                              <span style={{ color: "#00dc82" }}>✓ </span>name: <span style={{ color: textMain }}>{fields.name}</span>
                            </div>
                          )}
                          {(p === "subject" || p === "message") && (
                            <div style={{ fontFamily: "monospace", fontSize: 12, color: textMuted }}>
                              <span style={{ color: "#00dc82" }}>✓ </span>email: <span style={{ color: textMain }}>{fields.email}</span>
                            </div>
                          )}
                          {p === "message" && (
                            <div style={{ fontFamily: "monospace", fontSize: 12, color: textMuted }}>
                              <span style={{ color: "#00dc82" }}>✓ </span>subject: <span style={{ color: textMain }}>{fields.subject}</span>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Input */}
                    {phase !== "message" ? (
                      <input
                        ref={inputRef as React.RefObject<HTMLInputElement>}
                        type={currentStep?.type ?? "text"}
                        value={fields[phase]}
                        onChange={e => setFields(f => ({ ...f, [phase]: e.target.value }))}
                        onKeyDown={onKey}
                        placeholder={currentStep?.placeholder}
                        style={{
                          width: "100%", padding: "14px 16px", borderRadius: 12, fontSize: 15, fontFamily: "monospace", fontWeight: 600,
                          background: dark ? "rgba(0,220,130,0.04)" : "rgba(0,220,130,0.05)",
                          border: `1.5px solid ${fields[phase] ? "#00dc82" : dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                          color: textMain, outline: "none", transition: "border-color 0.2s",
                          marginBottom: 20,
                        }}
                      />
                    ) : (
                      <textarea
                        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                        value={fields.message}
                        onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
                        onKeyDown={onKey}
                        placeholder={currentStep?.placeholder}
                        rows={4}
                        style={{
                          width: "100%", padding: "14px 16px", borderRadius: 12, fontSize: 14, fontFamily: "monospace", fontWeight: 500, resize: "vertical",
                          background: dark ? "rgba(0,220,130,0.04)" : "rgba(0,220,130,0.05)",
                          border: `1.5px solid ${fields.message ? "#00dc82" : dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                          color: textMain, outline: "none", lineHeight: 1.6, transition: "border-color 0.2s",
                          marginBottom: 6,
                        }}
                      />
                    )}

                    {phase === "message" && (
                      <div style={{ fontFamily: "monospace", fontSize: 11, color: textMuted, marginBottom: 18 }}>
                        Ctrl + Enter to submit
                      </div>
                    )}

                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <motion.button
                        whileHover={{ scale: fields[phase].trim() ? 1.04 : 1 }}
                        whileTap={{ scale: fields[phase].trim() ? 0.96 : 1 }}
                        onClick={advance}
                        disabled={!fields[phase].trim()}
                        style={{
                          display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12,
                          fontSize: 14, fontWeight: 800, fontFamily: "monospace", letterSpacing: "0.5px",
                          background: fields[phase].trim() ? "linear-gradient(135deg, #00dc82, #6366f1)" : dark ? "rgba(255,255,255,0.06)" : "#e2e8f0",
                          color: fields[phase].trim() ? "#fff" : textMuted,
                          border: "none", cursor: fields[phase].trim() ? "none" : "default",
                          transition: "all 0.2s",
                        }}
                      >
                        {phase === "message" ? <><Send size={14} /> TRANSMIT</> : <><ChevronRight size={14} /> CONTINUE</>}
                      </motion.button>
                      {phase !== "name" && (
                        <div style={{ fontSize: 11, fontFamily: "monospace", color: textMuted }}>
                          {phase !== "message" ? "or press Enter" : ""}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ── SENDING ── */}
                {phase === "sending" && (
                  <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: "center", padding: "40px 0" }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{ width: 48, height: 48, borderRadius: "50%", border: "3px solid rgba(0,220,130,0.2)", borderTopColor: "#00dc82", margin: "0 auto 24px" }}
                    />
                    <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: "#00dc82", letterSpacing: "2px" }}>TRANSMITTING…</div>
                  </motion.div>
                )}

                {/* ── SUCCESS ── */}
                {phase === "success" && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, type: "spring" }} style={{ textAlign: "center", padding: "32px 0" }}>
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                      style={{ fontSize: 64, marginBottom: 16 }}
                    >
                      🏆
                    </motion.div>
                    <div style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, color: "#6366f1", letterSpacing: "3px", marginBottom: 10 }}>MISSION COMPLETE</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: textMain, marginBottom: 8 }}>Message delivered!</div>
                    <div style={{ fontSize: 14, color: textMuted, marginBottom: 4 }}>I&apos;ll get back to you soon, {fields.name}.</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 16px", borderRadius: 20, background: "rgba(0,220,130,0.1)", border: "1px solid rgba(0,220,130,0.25)", marginBottom: 28 }}>
                      <Trophy size={13} color="#00dc82" />
                      <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 800, color: "#00dc82" }}>+1000 XP TOTAL EARNED</span>
                    </div>
                    <div>
                      <motion.button
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                        onClick={reset}
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 12, fontSize: 13, fontWeight: 700, fontFamily: "monospace", background: dark ? "rgba(255,255,255,0.07)" : "#f1f5f9", color: textMuted, border: "none", cursor: "none" }}
                      >
                        <RotateCcw size={13} /> Play Again
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* ── ERROR ── */}
                {phase === "error" && (
                  <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "32px 0" }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
                    <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: "#ec4899", letterSpacing: "1px", marginBottom: 12 }}>TRANSMISSION FAILED</div>
                    <div style={{ fontSize: 14, color: textMuted, marginBottom: 24 }}>Something went wrong. Try again?</div>
                    <motion.button
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      onClick={() => setPhase("message")}
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 12, fontSize: 14, fontWeight: 700, background: "#00dc82", color: "#000", border: "none", cursor: "none", fontFamily: "monospace" }}
                    >
                      <RotateCcw size={14} /> RETRY
                    </motion.button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── SOCIAL LINKS ── */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <MapPin size={13} color="#00dc82" />
              <span style={{ fontSize: 13, color: textMuted }}>Bengaluru, India · Open to remote</span>
            </div>
            {socials.map(({ icon, label, value, href, color }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className="tilt-card glow-card"
                style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 22px", borderRadius: 16, background: cardBg, border: `1px solid ${cardBorder}`, textDecoration: "none", position: "relative", overflow: "hidden" }}>
                <div className="tilt-shine" />
                <div style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: `${color}15`, color }}>
                  {icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: textMuted, marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: textMain, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
                </div>
                <ExternalLink size={14} color={textMuted} style={{ flexShrink: 0 }} />
              </a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
