"use client";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Play, ExternalLink } from "lucide-react";

const VIDEO_ID = "RGxPbbRJOFM";

export default function YouTubeFeature() {
  const { dark } = useTheme();
  const bg = dark ? "#0d1117" : "#f8fafc";
  const cardBg = dark ? "#0f1923" : "#ffffff";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const textMain = dark ? "#ffffff" : "#0f172a";
  const textMuted = dark ? "#94a3b8" : "#64748b";

  return (
    <section className="spotlight-section section-pad" style={{ background: bg, position: "relative" }}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ color: "#ff0000", fontFamily: "monospace", fontSize: 14, fontWeight: 700 }}>▶</span>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, rgba(255,0,0,0.3), transparent)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 8, color: textMain }}>
            Beyond <span className="gradient-text">Code</span>
          </h2>
          <p style={{ fontSize: 16, color: textMuted, marginBottom: 48, maxWidth: 520 }}>
            When I&apos;m not building AI systems, I create music. Here&apos;s my latest release.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ borderRadius: 24, overflow: "hidden", background: cardBg, border: `1px solid ${cardBorder}`, position: "relative", boxShadow: dark ? "0 0 60px rgba(255,0,0,0.06)" : "0 20px 60px rgba(0,0,0,0.1)" }}
        >
          {/* Top accent bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #ff0000, #ff6b6b, transparent)", zIndex: 1 }} />

          <div className="yt-card-inner">
            {/* Video embed */}
            <div style={{ flex: "1 1 300px", minWidth: 0, position: "relative", paddingTop: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&color=red`}
                title="Tu Hi Bata — Pratyaksh Bharadwaj"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>

            {/* Info panel */}
            <div className="yt-info-panel" style={{ "--yt-border": cardBorder, borderLeft: `1px solid ${cardBorder}` } as React.CSSProperties}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: "rgba(255,0,0,0.1)", color: "#ff4444", border: "1px solid rgba(255,0,0,0.2)", marginBottom: 20 }}>
                  <Play size={10} fill="#ff4444" />
                  Official Music Video
                </div>

                <h3 style={{ fontSize: 26, fontWeight: 900, color: textMain, marginBottom: 8, lineHeight: 1.2 }}>Tu Hi Bata</h3>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#ff4444", marginBottom: 16 }}>Pratyaksh Bharadwaj</p>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: textMuted }}>
                  A heartfelt original composition — blending soulful melodies with emotional storytelling.
                </p>
              </div>

              <div style={{ marginTop: 32 }}>
                <a
                  href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 12, fontSize: 14, fontWeight: 700, background: "#ff0000", color: "#fff", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <Play size={14} fill="#fff" /> Watch on YouTube
                </a>
                <a
                  href="https://www.youtube.com/@pratyakshbharadwaj"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "11px 16px", borderRadius: 12, fontSize: 13, fontWeight: 600, background: "transparent", color: textMuted, textDecoration: "none", transition: "all 0.2s", marginLeft: 8, border: `1px solid ${cardBorder}` }}
                  onMouseEnter={e => (e.currentTarget.style.color = textMain)}
                  onMouseLeave={e => (e.currentTarget.style.color = textMuted)}
                >
                  <ExternalLink size={13} /> Channel
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
