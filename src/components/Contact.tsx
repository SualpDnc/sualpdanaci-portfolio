"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const socials = [
  { label: "GitHub", href: "https://github.com/SualpDnc" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sualp-danacı-43a7ab227/" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
  }),
};

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "140px 40px 120px",
        textAlign: "center",
      }}
    >
      {/* Label */}
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.25)",
          textTransform: "uppercase",
          marginBottom: 24,
        }}
      >
        03 — Contact
      </motion.p>

      {/* Big heading */}
      <motion.h2
        custom={0.15}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          fontSize: "clamp(2.5rem, 8vw, 7rem)",
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: "-0.03em",
          color: "#f0f0f0",
          marginBottom: 32,
        }}
      >
        Let&apos;s build
        <br />
        <span style={{ color: "rgba(255,255,255,0.2)" }}>something.</span>
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        custom={0.3}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          fontSize: 15,
          color: "rgba(255,255,255,0.3)",
          maxWidth: 420,
          margin: "0 auto 56px",
          lineHeight: 1.7,
        }}
      >
        Have a new project, an opportunity, or just want to say hi? Drop me an email.
      </motion.p>

      {/* Email */}
      <motion.div
        custom={0.45}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ marginBottom: 48 }}
      >
        <a
          href="mailto:sualp@example.com"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            color: "#f0f0f0",
            textDecoration: "none",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
            paddingBottom: 4,
            letterSpacing: "-0.01em",
            transition: "border-color 0.25s ease, color 0.25s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "rgba(255,255,255,0.6)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "rgba(255,255,255,0.15)";
          }}
        >
          sualpdnc@gmail.com
        </a>
      </motion.div>

      {/* Divider */}
      <motion.div
        custom={0.55}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          width: 1,
          height: 40,
          background: "rgba(255,255,255,0.1)",
          margin: "0 auto 32px",
        }}
      />

      {/* Social links */}
      <motion.div
        custom={0.65}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ display: "flex", justifyContent: "center", gap: 32 }}
      >
        {socials.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              textDecoration: "none",
              transition: "color 0.2s ease",
              position: "relative",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.8)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.3)")
            }
          >
            {label}
          </a>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.p
        custom={0.8}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          marginTop: 80,
          fontSize: 11,
          color: "rgba(255,255,255,0.15)",
          letterSpacing: "0.08em",
        }}
      >
        © 2026 Sualp Danacı. Designed & built with care.
      </motion.p>
    </section>
  );
}
