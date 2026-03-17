"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const titles = ["Software Engineer.", "Full-Stack Developer.", "Problem Solver."];

/* ── Typewriter ── */
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }

    setText(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}

/* ── Text Scramble ── */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function useScramble(target: string, startDelay = 400, speed = 35) {
  const [output, setOutput] = useState(() => " ".repeat(target.length));

  useEffect(() => {
    let iteration = 0;
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setOutput(
          target
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < iteration) return target[i];
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            })
            .join("")
        );
        iteration += 0.45;
        if (iteration >= target.length) {
          setOutput(target);
          clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [target, startDelay, speed]);

  return output;
}

/* ── Fade-up variant ── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay,
    },
  }),
};

export default function Hero() {
  const typeText = useTypewriter(titles);
  const scrambledName = useScramble("Sualp Danacı", 300, 35);

  /* Mouse-tracking spotlight */
  const [mouse, setMouse] = useState({ x: 50, y: 35 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="dot-grid"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 40px",
        maxWidth: 1200,
        margin: "0 auto",
        position: "relative",
        width: "100%",
      }}
    >
      {/* Mouse-tracking spotlight glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(255,255,255,0.04) 0%, transparent 65%)`,
          transition: "background 0.12s ease",
          zIndex: 0,
        }}
      />

      {/* Static ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 500,
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.025) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Greeting */}
        <motion.p
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name — scramble reveal */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: 0.25 }}
          aria-label="Sualp Danacı"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "#f0f0f0",
            marginBottom: 28,
            userSelect: "none",
            fontVariantNumeric: "tabular-nums",
            fontFamily: "var(--font-geist-sans), monospace",
          }}
        >
          {scrambledName.split("").map((char, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                color:
                  char === "Sualp Danacı"[i]
                    ? "#f0f0f0"
                    : "rgba(255,255,255,0.25)",
                transition: "color 0.08s",
                minWidth: char === " " ? "0.28em" : undefined,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          custom={1.2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
            color: "rgba(255,255,255,0.5)",
            fontWeight: 400,
            marginBottom: 32,
            minHeight: "2em",
            letterSpacing: "-0.01em",
          }}
        >
          {typeText}
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: "1em",
              background: "rgba(255,255,255,0.6)",
              marginLeft: 2,
              verticalAlign: "middle",
              animation: "blink 1s step-end infinite",
            }}
          />
          <style>{`@keyframes blink { 50% { opacity: 0 } }`}</style>
        </motion.div>

        {/* Bio */}
        <motion.p
          custom={1.5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.3)",
            maxWidth: 480,
            lineHeight: 1.7,
            marginBottom: 48,
          }}
        >
          I design and build performant, scalable digital products
          with a focus on user experience.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={1.8}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
        >
          <a
            href="#about"
            style={{
              padding: "12px 28px",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 4,
              color: "#f0f0f0",
              textDecoration: "none",
              fontSize: 13,
              letterSpacing: "0.06em",
              transition: "all 0.25s ease",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "rgba(255,255,255,0.06)";
              el.style.borderColor = "rgba(255,255,255,0.3)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "transparent";
              el.style.borderColor = "rgba(255,255,255,0.15)";
            }}
          >
            About
          </a>
          <a
            href="#contact"
            style={{
              padding: "12px 28px",
              borderRadius: 4,
              color: "#080808",
              textDecoration: "none",
              fontSize: 13,
              letterSpacing: "0.06em",
              background: "#f0f0f0",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#d0d0d0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f0f0f0")}
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Social sidebar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 60,
          left: 40,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
        }}
      >
        <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.12)" }} />
        {[
          { label: "Github", href: "https://github.com/SualpDnc" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/sualp-danacı-43a7ab227/" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 10,
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.3)",
              textDecoration: "none",
              fontWeight: 600,
              transition: "color 0.2s",
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
        <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.12)" }} />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 48,
          right: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.25)",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
