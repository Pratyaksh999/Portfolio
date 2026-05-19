"use client";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { GraduationCap } from "lucide-react";

const courses = ["Machine Learning (Specialization)", "Artificial Intelligence", "Deep Learning", "Supervised Learning", "Unsupervised Learning", "Feature Engineering", "Transfer Learning", "Ensemble Learning", "Natural Language Processing"];

export default function Education() {
  const { dark } = useTheme();
  const bg = dark ? "#020817" : "#ffffff";
  const cardBg = dark ? "#0f1923" : "#f8fafc";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const textMain = dark ? "#ffffff" : "#0f172a";
  const textMuted = dark ? "#94a3b8" : "#64748b";

  return (
    <section className="spotlight-section" style={{ background: bg, padding: "96px 0", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ color: "#00dc82", fontFamily: "monospace", fontSize: 14, fontWeight: 700 }}>05.</span>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, rgba(0,220,130,0.3), transparent)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 56, color: textMain }}>
            <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="glow-card"
          style={{ padding: 40, borderRadius: 22, background: cardBg, border: `1px solid ${cardBorder}`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #00dc82, #6366f1, transparent)" }} />

          <div style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "flex-start" }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "rgba(0,220,130,0.1)", border: "1px solid rgba(0,220,130,0.22)" }}>
              <GraduationCap size={28} color="#00dc82" />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 900, color: textMain, marginBottom: 6 }}>Graphic Era University</h3>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#6366f1", marginBottom: 4 }}>B.Tech (Hons) in Artificial Intelligence & Machine Learning</p>
                  <p style={{ fontSize: 13, color: textMuted }}>Dehradun, Uttarakhand</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                  <span style={{ padding: "5px 13px", borderRadius: 8, fontSize: 12, fontFamily: "monospace", fontWeight: 600, background: dark ? "rgba(255,255,255,0.06)" : "#ebebeb", color: textMuted }}>
                    July 2019 – June 2023
                  </span>
                  <span style={{ padding: "5px 13px", borderRadius: 8, fontSize: 12, fontWeight: 800, background: "rgba(0,220,130,0.12)", color: "#00dc82", border: "1px solid rgba(0,220,130,0.25)" }}>
                    GPA: 8.5 / 10
                  </span>
                </div>
              </div>

              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: textMuted, marginBottom: 12 }}>Relevant Coursework</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {courses.map(c => (
                  <span key={c} style={{ padding: "5px 13px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
