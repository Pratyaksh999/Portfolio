"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Menu, X } from "lucide-react";

const links = ["About", "Experience", "Projects", "Skills", "Contact"];

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const sections = links.map(l => document.getElementById(l.toLowerCase())).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); },
      { threshold: 0.4 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // close mobile menu on scroll
  useEffect(() => {
    if (menuOpen) {
      const h = () => setMenuOpen(false);
      window.addEventListener("scroll", h, { passive: true, once: true });
    }
  }, [menuOpen]);

  const navBg = scrolled || menuOpen
    ? dark ? "rgba(2,8,23,0.95)" : "rgba(255,255,255,0.95)"
    : "transparent";
  const borderColor = scrolled
    ? dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"
    : "transparent";
  const textColor = dark ? "#94a3b8" : "#64748b";
  const textHover = dark ? "#ffffff" : "#0f172a";

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: navBg, backdropFilter: "blur(20px) saturate(180%)", borderBottom: `1px solid ${borderColor}`, transition: "all 0.3s" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <motion.a href="#hero" whileHover={{ scale: 1.05 }} style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 800, textDecoration: "none", flexShrink: 0 }}>
          <span style={{ color: "#00dc82" }}>&lt;</span>
          <span style={{ color: dark ? "#fff" : "#0f172a" }}>PB</span>
          <span style={{ color: "#6366f1" }}>/&gt;</span>
        </motion.a>

        {/* Desktop links */}
        <div className="nav-links-desktop">
          {links.map((link) => {
            const isActive = active === link.toLowerCase();
            return (
              <a key={link} href={`#${link.toLowerCase()}`}
                style={{ position: "relative", padding: "8px 16px", borderRadius: 10, fontSize: 14, fontWeight: isActive ? 700 : 500, color: isActive ? textHover : textColor, textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = textHover; e.currentTarget.style.background = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = isActive ? textHover : textColor; e.currentTarget.style.background = "transparent"; }}
              >
                {link}
                {isActive && (
                  <motion.span layoutId="nav-pill"
                    style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: "#00dc82", display: "block" }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggle}
            style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "none", color: dark ? "#facc15" : "#64748b", flexShrink: 0 }}
          >
            <AnimatePresence mode="wait">
              <motion.span key={dark ? "sun" : "moon"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                {dark ? <Sun size={15} /> : <Moon size={15} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <a href="#contact"
            className="magnetic nav-hire-desktop"
            style={{ padding: "8px 18px", borderRadius: 10, fontSize: 14, fontWeight: 700, background: "#00dc82", color: "#000", textDecoration: "none" }}
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMenuOpen(o => !o)}
            style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, background: "transparent", display: "none", alignItems: "center", justifyContent: "center", cursor: "pointer", color: textHover, flexShrink: 0 }}
            className="mobile-menu-btn"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden", borderTop: `1px solid ${borderColor}` }}
          >
            <div style={{ padding: "12px 20px 20px", display: "flex", flexDirection: "column", gap: 2 }}>
              {links.map(link => (
                <a key={link} href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  style={{ padding: "12px 8px", fontSize: 15, fontWeight: active === link.toLowerCase() ? 700 : 500, color: active === link.toLowerCase() ? "#00dc82" : textColor, textDecoration: "none", borderRadius: 8, transition: "all 0.15s" }}
                >
                  {link}
                </a>
              ))}
              <a href="#contact"
                onClick={() => setMenuOpen(false)}
                style={{ marginTop: 8, padding: "12px 16px", borderRadius: 10, fontSize: 14, fontWeight: 700, background: "#00dc82", color: "#000", textDecoration: "none", textAlign: "center" }}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
