"use client";
import { useTheme } from "./ThemeProvider";

export default function Footer() {
  const { dark } = useTheme();
  return (
    <footer style={{ background: dark ? "#020817" : "#ffffff", borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`, padding: "28px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ fontFamily: "monospace", fontSize: 15, fontWeight: 800 }}>
          <span style={{ color: "#00dc82" }}>&lt;</span>
          <span style={{ color: dark ? "#fff" : "#0f172a" }}>PB</span>
          <span style={{ color: "#6366f1" }}>/&gt;</span>
        </div>
        <p style={{ fontSize: 12, color: dark ? "#475569" : "#94a3b8" }}>
          Built with Next.js · Designed & developed by Pratyaksh Bharadwaj
        </p>
        <p style={{ fontSize: 12, color: dark ? "#475569" : "#94a3b8" }}>
          © {new Date().getFullYear()} Pratyaksh Bharadwaj
        </p>
      </div>
    </footer>
  );
}
