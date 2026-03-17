"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const rafRef = useRef<number | null>(null);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const dotX = useSpring(cursorX, { damping: 50, stiffness: 400, mass: 0.1 });
  const dotY = useSpring(cursorY, { damping: 50, stiffness: 400, mass: 0.1 });
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
    };

    const enter = () => setHidden(false);
    const leave = () => setHidden(true);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.closest("a, button, [data-cursor-hover]") !== null;
      setHovered(isClickable);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 99998,
          pointerEvents: "none",
        }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: hovered ? 2.2 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.4)",
            mixBlendMode: "difference",
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 99999,
          pointerEvents: "none",
        }}
        animate={{
          opacity: hidden ? 0 : hovered ? 0 : 1,
          scale: hovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
          }}
        />
      </motion.div>
    </>
  );
}
