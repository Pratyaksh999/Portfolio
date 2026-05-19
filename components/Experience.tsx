"use client";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const experiences = [
  {
    company: "Salesforce",
    role: "Associate Technical Engineer — Core Team",
    period: "Aug 2023 – Present",
    location: "Bengaluru, India",
    color: "#00dc82",
    logo: "⚡",
    highlights: [
      "Built AI-powered case summarization & response generation using GenAI, reducing average handling time by 25–30% and improving SLA adherence by 20%.",
      "Deployed an LLM-based conversation intent classifier using Llama 3.1 to analyze Engineer–Manager Slack interactions, reducing case resolution TTR by 35%.",
      "Designed & maintained 4+ Superset dashboards using Trino, Splunk & Huron, tracking KPIs for proactive org monitoring.",
      "Implemented ML-based anomaly detection systems that proactively identified 90%+ of anomalies in org request rate trends.",
      "Led technical health reviews translating system metrics into actionable insights — improved org health score by 20% in one month, renewing a $27M contract.",
      "Mentored 5+ new hires, reducing ramp-up time by 30% and improving overall team productivity.",
    ],
    tags: ["GenAI", "Llama 3.1", "NLP", "Superset", "Splunk", "Python", "ML"],
  },
  {
    company: "Himsrot",
    role: "Machine Learning Engineer",
    period: "June 2022 – Aug 2022",
    location: "Remote",
    color: "#6366f1",
    logo: "🌿",
    highlights: [
      "Prepared and optimized real-time anomaly detection models using Deep Learning & OpenCV with feature engineering (temporal & spatial data), improving detection accuracy by 20–30% and reducing false positives by 25%.",
      "Integrated and deployed scalable APIs for real-time inference, processing 1,000+ events/sec with less than 200ms latency.",
    ],
    tags: ["Deep Learning", "OpenCV", "FastAPI", "Python", "Computer Vision"],
  },
];

export default function Experience() {
  const { dark } = useTheme();
  const bg = dark ? "#0d1117" : "#f8fafc";
  const cardBg = dark ? "#0f1923" : "#ffffff";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const textMain = dark ? "#ffffff" : "#0f172a";
  const textMuted = dark ? "#94a3b8" : "#64748b";
  const pillBg = dark ? "rgba(255,255,255,0.05)" : "#f1f5f9";

  return (
    <section id="experience" className="spotlight-section" style={{ background: bg, padding: "96px 0", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ color: "#00dc82", fontFamily: "monospace", fontSize: 14, fontWeight: 700 }}>02.</span>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, rgba(0,220,130,0.3), transparent)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 56, color: textMain }}>
            Work <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 22, top: 0, bottom: 0, width: 1, background: dark ? "rgba(255,255,255,0.06)" : "#e2e8f0" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {experiences.map((exp, i) => (
              <motion.div key={exp.company} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{ paddingLeft: 72, position: "relative" }}>
                {/* Timeline dot */}
                <div style={{ position: "absolute", left: 0, top: 24, width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, background: `${exp.color}12`, border: `1px solid ${exp.color}30` }}>
                  {exp.logo}
                </div>

                <div className="glow-card" style={{ padding: 32, borderRadius: 20, background: cardBg, border: `1px solid ${cardBorder}`, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${exp.color}, transparent)` }} />

                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
                    <div>
                      <h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 6, color: textMain }}>{exp.role}</h3>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: exp.color }}>{exp.company}</span>
                        <span style={{ fontSize: 12, color: textMuted }}>{exp.location}</span>
                      </div>
                    </div>
                    <span style={{ padding: "5px 13px", borderRadius: 8, fontSize: 12, fontFamily: "monospace", fontWeight: 600, background: pillBg, color: textMuted, whiteSpace: "nowrap" }}>
                      {exp.period}
                    </span>
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                    {exp.highlights.map((h, j) => (
                      <li key={j} style={{ display: "flex", gap: 12, fontSize: 14, lineHeight: 1.65, color: textMuted }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: exp.color, flexShrink: 0, marginTop: 8 }} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {exp.tags.map(tag => (
                      <span key={tag} style={{ padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: `${exp.color}10`, color: exp.color, border: `1px solid ${exp.color}22` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
