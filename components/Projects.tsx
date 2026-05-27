"use client";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { ExternalLink } from "lucide-react";

const GithubIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const projects = [
  {
    title: "Conversation Intent Classifier",
    subtitle: "Salesforce Internal Tool",
    description: "Local NLP pipeline using Llama 3.1 8B via Ollama to classify action ownership in multi-party workplace conversations. 3-step reasoning chain (override detection, closing remark filtering, conversation arc analysis) achieving 70% accuracy improvement over naive approaches. Fully air-gapped — zero data leaves the network.",
    tags: ["Llama 3.1", "Ollama", "NLP", "Prompt Engineering", "Gradio"],
    github: "https://github.com/Pratyaksh999/Conversation_Intent_Classifier",
    featured: true,
    emoji: "🧠",
    color: "#6366f1",
    metrics: ["70% accuracy boost", "Air-gapped", "100+ message threads"],
  },
  {
    title: "AI-Powered Customer Support Chatbot",
    subtitle: "Himsrot.com",
    description: "Production-grade AI customer support platform using FastAPI and Gemini 2.5 Flash. Integrates with Shopify's live product catalog (100+ products) for real-time recommendations, stock awareness, and seamless in-chat checkout flows. Features custom JavaScript chat widget, real-time ticket management dashboard, and automated email escalation pipelines. 60% improvement in support resolution efficiency.",
    tags: ["FastAPI", "Gemini 2.5 Flash", "Shopify API", "JavaScript", "PostgreSQL"],
    github: "https://github.com/Pratyaksh999/AI-Powered-Chatbot",
    featured: true,
    emoji: "🤖",
    color: "#00dc82",
    metrics: ["60% faster resolution", "24/7 automated support", "Single-line embed"],
  },
  {
    title: "Resume Ragebait",
    subtitle: "AI-Powered Resume Optimization Platform",
    description: "Full-stack AI-powered resume optimization platform using FastAPI, PostgreSQL, SQLAlchemy, React, Firebase Authentication, and Railway. Multi-provider LLM architecture with Gemini-Flash-1.5. Features gamified UX, dark-mode animated UI, free-tier rate limiting (5 daily checks), and helps users improve resume scores by up to 30%. Resolved 10+ production-grade deployment challenges.",
    tags: ["FastAPI", "React", "PostgreSQL", "Firebase", "Gemini", "Railway"],
    github: "https://github.com/Pratyaksh999/Resume-Ragebait",
    live: "https://resume-ragebait.vercel.app",
    featured: true,
    emoji: "🔥",
    color: "#f59e0b",
    metrics: ["30% score improvement", "15+ features", "Docker-ready"],
  },
  {
    title: "Gesture-Controlled Game",
    subtitle: "For Disabled Children",
    description: "Real-time educational game using OpenCV & CVzone with 90%+ gesture recognition accuracy. Adaptive learning improving outcomes by 25% across 50+ test users.",
    tags: ["OpenCV", "CVzone", "Python", "Deep Learning"],
    github: "https://github.com/Pratyaksh999/Edibles-Non-Edibles-Rock-Paper-Scissors",
    featured: false,
    emoji: "🎮",
    color: "#ec4899",
    metrics: ["90%+ gesture accuracy", "50+ users"],
  },
  {
    title: "Real-time Anomaly Detection",
    subtitle: "Computer Vision Pipeline",
    description: "Deep Learning + OpenCV system with spatial & temporal feature engineering, improving detection accuracy by 20–30% and reducing false positives by 25% in production.",
    tags: ["Deep Learning", "OpenCV", "Python", "Feature Engineering"],
    github: "https://github.com/Pratyaksh999/Anomaly-Detection",
    featured: false,
    emoji: "🔍",
    color: "#06b6d4",
    metrics: ["30% accuracy gain", "1,000+ events/sec"],
  },
];

export default function Projects() {
  const { dark } = useTheme();
  const bg = dark ? "#020817" : "#ffffff";
  const cardBg = dark ? "#0f1923" : "#f8fafc";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const textMain = dark ? "#ffffff" : "#0f172a";
  const textMuted = dark ? "#94a3b8" : "#64748b";
  const tagBg = dark ? "rgba(255,255,255,0.05)" : "#fff";
  const tagColor = dark ? "#94a3b8" : "#64748b";
  const tagBorder = dark ? "rgba(255,255,255,0.1)" : "#e2e8f0";

  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="spotlight-section section-pad" style={{ background: bg, position: "relative" }}>
      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ color: "#00dc82", fontFamily: "monospace", fontSize: 14, fontWeight: 700 }}>03.</span>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, rgba(0,220,130,0.3), transparent)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 56, color: textMain }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Featured */}
        <div className="grid-projects-featured">
          {featured.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`tilt-card glow-card ${p.title === "Resume Ragebait" ? "project-wide" : ""}`}
              style={{ padding: 32, borderRadius: 22, background: cardBg, border: `1px solid ${cardBorder}`, position: "relative", overflow: "hidden" }}>
              <div className="tilt-shine" />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${p.color}, transparent)` }} />

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, background: `${p.color}15`, border: `1px solid ${p.color}25` }}>
                    {p.emoji}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: textMain, lineHeight: 1.3 }}>{p.title}</h3>
                    <span style={{ fontSize: 12, fontWeight: 700, color: p.color }}>{p.subtitle}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer"
                      style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: dark ? "rgba(255,255,255,0.06)" : "#ebebeb", color: textMuted, textDecoration: "none", transition: "all 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.12)" : "#ddd"}
                      onMouseLeave={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.06)" : "#ebebeb"}
                      title="View Live Site"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: dark ? "rgba(255,255,255,0.06)" : "#ebebeb", color: textMuted, textDecoration: "none", transition: "all 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.12)" : "#ddd"}
                    onMouseLeave={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.06)" : "#ebebeb"}
                    title="View on GitHub"
                  >
                    <GithubIcon size={15} />
                  </a>
                </div>
              </div>

              <p style={{ fontSize: 14, lineHeight: 1.7, color: textMuted, marginBottom: 20 }}>{p.description}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                {p.metrics.map(m => (
                  <span key={m} style={{ padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 800, background: `${p.color}12`, color: p.color }}>
                    ↑ {m}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tags.map(tag => (
                  <span key={tag} style={{ padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500, background: tagBg, color: tagColor, border: `1px solid ${tagBorder}` }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rest */}
        <div className="grid-projects-rest">
          {rest.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="tilt-card glow-card"
              style={{ padding: 26, borderRadius: 18, background: cardBg, border: `1px solid ${cardBorder}`, position: "relative", overflow: "hidden" }}>
              <div className="tilt-shine" />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${p.color}, transparent)` }} />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>{p.emoji}</span>
                <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: textMuted, textDecoration: "none" }}>
                  <GithubIcon size={14} />
                </a>
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 800, color: textMain, marginBottom: 4 }}>{p.title}</h3>
              <p style={{ fontSize: 12, fontWeight: 700, color: p.color, marginBottom: 12 }}>{p.subtitle}</p>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: textMuted, marginBottom: 16 }}>{p.description.slice(0, 130)}…</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {p.tags.slice(0, 3).map(tag => (
                  <span key={tag} style={{ padding: "3px 9px", borderRadius: 6, fontSize: 11, fontWeight: 500, background: tagBg, color: tagColor, border: `1px solid ${tagBorder}` }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginTop: 48, textAlign: "center" }}>
          <a href="https://github.com/Pratyaksh999" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 12, fontSize: 14, fontWeight: 600, border: `1px solid ${cardBorder}`, color: textMuted, textDecoration: "none", background: cardBg, transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <GithubIcon size={16} /> View all projects on GitHub <ExternalLink size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
