"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
        background: scrolled ? "rgba(8,8,8,0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "20px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#f0f0f0",
            textDecoration: "none",
            letterSpacing: "0.08em",
          }}
        >
          SD
        </a>

        {/* Links */}
        <div style={{ display: "flex", gap: 32 }}>
          {["about", "work", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
                letterSpacing: "0.06em",
                textTransform: "lowercase",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.9)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)")
              }
            >
              {item}
            </a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
