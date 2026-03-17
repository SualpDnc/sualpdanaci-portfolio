"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Java Spring Boot",
  "Flutter",
  "Swift",
  "Unity",
  "C#",
  "PostgreSQL",
  "Docker",
  "REST APIs",
  "Git",
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "140px 40px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: 72,
          alignItems: "start",
        }}
      >
        {/* Left — Text */}
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            01 — About
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            className="text-stroke"
            style={{
              fontSize: "clamp(3rem, 5vw, 5rem)",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              marginBottom: 40,
            }}
          >
            About
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <motion.p
              variants={fadeUp}
              style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.55)" }}
            >
              My passion for software development has driven me to build
              user-focused, high-performance products for years.
              I take a full-cycle approach — from front-end to back-end,
              design to deployment.
            </motion.p>
            <motion.p
              variants={fadeUp}
              style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.35)" }}
            >
              Clean code, solid architecture, and maintainable solutions
              are not just preferences for me — they&apos;re a standard.
            </motion.p>
          </motion.div>
        </div>

        {/* Center — Photo */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.25 }}
          style={{ position: "relative" }}
        >
          {/* Glow behind photo */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: -24,
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "relative",
              width: 220,
              height: 260,
              borderRadius: 6,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              zIndex: 1,
            }}
          >
            <Image
              src="/photo.jpeg"
              alt="Sualp Danacı"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center top",
                filter: "grayscale(100%) contrast(1.1) brightness(0.88)",
                mixBlendMode: "luminosity",
              }}
              sizes="220px"
              priority
            />
            {/* Subtle dark vignette overlay */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, transparent 55%, rgba(8,8,8,0.55) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>
          {/* Corner accent lines */}
          <div aria-hidden style={{ position: "absolute", top: -8, left: -8, width: 20, height: 20, borderTop: "1px solid rgba(255,255,255,0.25)", borderLeft: "1px solid rgba(255,255,255,0.25)", zIndex: 2 }} />
          <div aria-hidden style={{ position: "absolute", bottom: -8, right: -8, width: 20, height: 20, borderBottom: "1px solid rgba(255,255,255,0.25)", borderRight: "1px solid rgba(255,255,255,0.25)", zIndex: 2 }} />
        </motion.div>

        {/* Right — Skills */}
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            Technologies
          </motion.p>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
          >
            {skills.map((skill) => (
              <motion.span
                key={skill}
                variants={fadeUp}
                className="skill-tag"
                style={{
                  padding: "8px 16px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 3,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.04em",
                  transition: "all 0.25s ease",
                  cursor: "default",
                }}
                whileHover={{
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.6 }}
            style={{
              marginTop: 48,
              paddingTop: 32,
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              gap: 32,
            }}
          >
            {[
              { num: "2+", label: "Years of Experience" },
              { num: "10+", label: "Projects" },
            ].map(({ num, label }) => (
              <div key={label}>
                <p style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", letterSpacing: "-0.02em" }}>
                  {num}
                </p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 2, letterSpacing: "0.04em" }}>
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
