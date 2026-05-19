"use client";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { MapPin, GraduationCap, Briefcase, Brain } from "lucide-react";

export default function About() {
  const { dark } = useTheme();
  const bg = dark ? "#020817" : "#ffffff";
  const cardBg = dark ? "#0f1923" : "#f8fafc";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const textMain = dark ? "#ffffff" : "#0f172a";
  const textMuted = dark ? "#94a3b8" : "#64748b";

  const facts = [
    { icon: <Briefcase size={18} />, label: "Role", value: "Associate Technical Engineer", sub: "Salesforce · Aug 2023 – Present", color: "#00dc82" },
    { icon: <Brain size={18} />, label: "Focus", value: "Generative AI & LLMs", sub: "Applied to enterprise systems", color: "#6366f1" },
    { icon: <GraduationCap size={18} />, label: "Degree", value: "B.Tech in AI & ML", sub: "Graphic Era University · GPA 8.5", color: "#f59e0b" },
    { icon: <MapPin size={18} />, label: "Location", value: "Bengaluru, India", sub: "Open to remote & hybrid", color: "#ec4899" },
  ];

  return (
    <section id="about" className="spotlight-section" style={{ background: bg, padding: "96px 0", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ color: "#00dc82", fontFamily: "monospace", fontSize: 14, fontWeight: 700 }}>01.</span>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, rgba(0,220,130,0.3), transparent)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 56, color: textMain }}>
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: 56, alignItems: "start" }}>
          {/* Bio */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            {[
              <>I&apos;m a technical problem-solver at <strong style={{ color: textMain }}>Salesforce</strong>, where I build AI-powered systems that move the needle — from reducing case handling time by 30% to directly contributing to a <strong style={{ color: "#00dc82" }}>$27 million contract renewal</strong>.</>,
              <>My work lives at the intersection of <strong style={{ color: "#6366f1" }}>Generative AI</strong>, enterprise software, and data analytics. I&apos;ve deployed local LLM pipelines, built intelligent dashboards, and engineered NLP classifiers — all in production environments.</>,
              <>Outside of Salesforce, I build passion projects — including an AI chatbot for a Himalayan food brand and a gesture-controlled game for disabled children.</>,
            ].map((para, i) => (
              <p key={i} style={{ fontSize: 16, lineHeight: 1.8, color: textMuted, marginBottom: 20 }}>{para}</p>
            ))}

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}>
              {["Generative AI", "LLMs", "RAG", "NLP", "FastAPI", "Salesforce", "PyTorch"].map(tag => (
                <span key={tag} style={{ padding: "5px 13px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "rgba(0,220,130,0.08)", color: "#00dc82", border: "1px solid rgba(0,220,130,0.2)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Fact cards */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {facts.map(({ icon, label, value, sub, color }) => (
                <div key={label} className="tilt-card glow-card" style={{ padding: 22, borderRadius: 18, background: cardBg, border: `1px solid ${cardBorder}`, position: "relative", overflow: "hidden" }}>
                  <div className="tilt-shine" />
                  <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, background: `${color}15`, color, border: `1px solid ${color}25` }}>
                    {icon}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: textMuted, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: textMain, marginBottom: 3 }}>{value}</div>
                  <div style={{ fontSize: 11, color: textMuted }}>{sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
