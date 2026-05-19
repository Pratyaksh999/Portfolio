"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { ExternalLink, RefreshCw, Music } from "lucide-react";

const ARTIST_ID = "4xwROKTcnt5K1GmLitjPz4";

const SpotifyIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const TIMEOUT_MS = 10000;

function SpotifyEmbed({ dark }: { dark: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [key, setKey] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const embedTheme = dark ? "0" : "1";

  // Only load iframe when scrolled into view
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatus("loading"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Start timeout whenever we enter "loading" state
  useEffect(() => {
    if (status !== "loading") return;
    timerRef.current = setTimeout(() => setStatus("error"), TIMEOUT_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [status, key]);

  const retry = () => { setStatus("loading"); setKey(k => k + 1); };

  const onLoad = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setStatus("ready");
  };

  const cardBg = dark ? "#0f1923" : "#f8fafc";
  const textMuted = dark ? "#94a3b8" : "#64748b";
  const textMain = dark ? "#ffffff" : "#0f172a";

  return (
    <div ref={wrapperRef} style={{ borderRadius: 20, overflow: "hidden", position: "relative", minHeight: 460, background: cardBg }}>

      {/* Skeleton / loading state */}
      {(status === "idle" || status === "loading") && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, background: cardBg, borderRadius: 20, border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
            <SpotifyIcon size={36} />
          </motion.div>
          <span style={{ fontSize: 13, color: textMuted, fontFamily: "monospace" }}>Loading Spotify…</span>
        </div>
      )}

      {/* Error state */}
      {status === "error" && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, background: cardBg, borderRadius: 20, border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`, padding: 32, textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(29,185,84,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Music size={24} color="#1db954" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: textMain, marginBottom: 6 }}>Spotify is taking a moment</div>
            <div style={{ fontSize: 13, color: textMuted, marginBottom: 20, lineHeight: 1.6 }}>
              Spotify&apos;s embed servers are temporarily slow.<br />Open directly or retry below.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={retry}
              style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700, background: dark ? "rgba(255,255,255,0.07)" : "#e2e8f0", color: textMuted, border: "none", cursor: "pointer" }}>
              <RefreshCw size={13} /> Retry
            </button>
            <a href={`https://open.spotify.com/artist/${ARTIST_ID}`} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700, background: "#1db954", color: "#000", textDecoration: "none" }}>
              <SpotifyIcon size={13} /> Open Spotify
            </a>
          </div>
        </div>
      )}

      {/* Actual iframe — only mounted when in view */}
      {(status === "loading" || status === "ready") && (
        <iframe
          key={key}
          src={`https://open.spotify.com/embed/artist/${ARTIST_ID}?utm_source=generator&theme=${embedTheme}`}
          width="100%"
          height="460"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          style={{ border: "none", display: "block", borderRadius: 20, opacity: status === "ready" ? 1 : 0, transition: "opacity 0.4s" }}
          title="Pratyaksh Bharadwaj on Spotify"
          onLoad={onLoad}
          onError={() => { if (timerRef.current) clearTimeout(timerRef.current); setStatus("error"); }}
        />
      )}
    </div>
  );
}

export default function SpotifyFeature() {
  const { dark } = useTheme();
  const bg = dark ? "#020817" : "#ffffff";
  const cardBg = dark ? "#0f1923" : "#f8fafc";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const textMain = dark ? "#ffffff" : "#0f172a";
  const textMuted = dark ? "#94a3b8" : "#64748b";

  return (
    <section className="spotlight-section" style={{ background: bg, padding: "96px 0", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ color: "#1db954", fontFamily: "monospace", fontSize: 14, fontWeight: 700 }}>♪</span>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, rgba(29,185,84,0.3), transparent)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 8, color: textMain }}>
            Also a <span style={{ background: "linear-gradient(135deg,#1db954,#1ed760)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Musician</span>
          </h2>
          <p style={{ fontSize: 16, color: textMuted, marginBottom: 48, maxWidth: 520 }}>
            Original compositions on Spotify — preview directly below.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))", gap: 32, alignItems: "start" }}>
          {/* Spotify embed with lazy load + error handling */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="tilt-card"
            style={{ borderRadius: 20, overflow: "hidden", boxShadow: dark ? "0 0 60px rgba(29,185,84,0.08)" : "0 20px 60px rgba(0,0,0,0.1)", position: "relative" }}
          >
            <div className="tilt-shine" />
            <SpotifyEmbed dark={dark} />
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <div className="tilt-card glow-card"
              style={{ padding: "32px 28px 28px", borderRadius: 20, background: cardBg, border: `1px solid ${cardBorder}`, position: "relative", overflow: "hidden" }}
            >
              <div className="tilt-shine" />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #1db954, #1ed760, transparent)" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 180, height: 180, background: "#1db954", borderRadius: "50%", filter: "blur(80px)", opacity: 0.04, pointerEvents: "none" }} />

              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(29,185,84,0.12)", border: "1px solid rgba(29,185,84,0.25)", color: "#1db954", flexShrink: 0 }}>
                  <SpotifyIcon size={24} />
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: textMuted, marginBottom: 3 }}>Artist on Spotify</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: textMain }}>Pratyaksh Bharadwaj</div>
                </div>
              </div>

              <p style={{ fontSize: 14, lineHeight: 1.75, color: textMuted, marginBottom: 22 }}>
                Original compositions ranging from soulful Hindi ballads to contemporary indie — each track a window into a different emotion. Hit play on the left to preview.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {[
                  { title: "Darmiyaan", plays: "18K plays" },
                  { title: "Whatever", plays: "12K plays" },
                  { title: "Nahi Ho Raha", plays: "2.5K plays" },
                  { title: "Whatever 2.0", plays: "Bonus Track" },
                  { title: "Tu Hi Bata", plays: "Official Video" },
                ].map((track, i) => (
                  <motion.div key={track.title}
                    initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.07 }}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: `1px solid ${cardBorder}` }}
                  >
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(29,185,84,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: "#1db954" }}>{i + 1}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: textMain, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{track.title}</div>
                    </div>
                    <div style={{ fontSize: 11, color: textMuted, whiteSpace: "nowrap" }}>{track.plays}</div>
                  </motion.div>
                ))}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {["Hindi Indie", "Originals", "Soulful", "Contemporary"].map(tag => (
                  <span key={tag} className="skill-tag" style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "rgba(29,185,84,0.1)", color: "#1db954", border: "1px solid rgba(29,185,84,0.2)" }}>
                    {tag}
                  </span>
                ))}
              </div>

              <a href={`https://open.spotify.com/artist/${ARTIST_ID}`} target="_blank" rel="noopener noreferrer"
                className="magnetic"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 12, fontSize: 14, fontWeight: 700, background: "#1db954", color: "#000", textDecoration: "none" }}
              >
                <SpotifyIcon size={15} /> Follow on Spotify <ExternalLink size={13} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
