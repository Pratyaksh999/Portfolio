"use client";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const skillGroups = [
  { title: "AI & Machine Learning", icon: "🧠", color: "#00dc82", skills: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Generative AI", "LLMs", "Transformers", "RAG", "Fine-tuning", "Prompt Engineering", "Feature Engineering"] },
  { title: "Frameworks & Libraries", icon: "⚙️", color: "#6366f1", skills: ["PyTorch", "TensorFlow", "HuggingFace", "LangChain", "FastAPI", "Flask", "OpenCV", "CVzone", "NLTK", "BeautifulSoup", "Gradio"] },
  { title: "Languages", icon: "💻", color: "#f59e0b", skills: ["Python", "SQL", "JavaScript", "TypeScript", "C++", "C", "Apex"] },
  { title: "Cloud & DevOps", icon: "☁️", color: "#ec4899", skills: ["AWS", "Docker", "Splunk", "Grafana", "Superset", "Tableau", "Huron", "Workbench"] },
  { title: "Salesforce", icon: "⚡", color: "#06b6d4", skills: ["Lightning Web Components (LWC)", "Apex", "Org Health Analysis", "Root Cause Analysis", "Superset Dashboards", "Trino"] },
];

export default function Skills() {
  const { dark } = useTheme();
  const bg = dark ? "#0d1117" : "#f8fafc";
  const cardBg = dark ? "#0f1923" : "#ffffff";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const textMain = dark ? "#ffffff" : "#0f172a";

  return (
    <section id="skills" className="spotlight-section" style={{ background: bg, padding: "96px 0", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ color: "#00dc82", fontFamily: "monospace", fontSize: 14, fontWeight: 700 }}>04.</span>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, rgba(0,220,130,0.3), transparent)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 56, color: textMain }}>
            Skills & <span className="gradient-text">Tech Stack</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {skillGroups.map((group, i) => (
            <motion.div key={group.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="tilt-card glow-card"
              style={{ padding: 28, borderRadius: 20, background: cardBg, border: `1px solid ${cardBorder}`, position: "relative", overflow: "hidden" }}
            >
              <div className="tilt-shine" />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <motion.div
                  whileHover={{ rotate: [0, -15, 15, 0], scale: 1.2 }}
                  transition={{ duration: 0.4 }}
                  style={{ width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, background: `${group.color}15`, border: `1px solid ${group.color}25` }}
                >
                  {group.icon}
                </motion.div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: textMain }}>{group.title}</h3>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.skills.map(skill => (
                  <span key={skill}
                    className="skill-tag"
                    style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: `${group.color}10`, color: group.color, border: `1px solid ${group.color}22`, cursor: "default" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
