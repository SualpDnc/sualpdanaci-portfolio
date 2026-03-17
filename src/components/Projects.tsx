"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    num: "01",
    title: "dncbabaexpress",
    description:
      "A full-stack e-commerce application with JWT-based authentication, role-based access (user/admin), and an admin panel for managing products, including image uploads. Users can browse products, manage a shopping cart, and place mock orders, while the system is built with Node.js, Express, PostgreSQL (Sequelize), and a React frontend using Axios and React Router.",
    tags: ["Node.js", "Express", "PostgreSQL", "React"],
    github: "https://github.com/SualpDnc/fullstack-ecommerce-pernstack",
    live: null,
  },
  {
    num: "02",
    title: "EconoMate",
    description:
      "This application is a home economics management app built with Swift, using Firebase for secure authentication and the Gemini API for OCR-based receipt scanning. It processes extracted receipt data through a backend to analyze products and calculate profit/loss, then displays the results to the user.",
    tags: ["SwiftUI", "Firebase", "Gemini API"],
    github: "https://github.com/SualpDnc/EconomateApp-SwiftUI-firebase-geminiAI",
    live: null,
  },
  {
    num: "03",
    title: "TR Demographics Map",
    description:
      "An interactive MERN stack web application that allows users to explore population data by selecting provinces on a map of Turkey, with both city and district-level details. The app fetches data once from an external API, stores it in MongoDB, and then serves all data directly from the database using React, Node.js, Express, and TailwindCSS.",
    tags: ["MongoDB", "Express", "React", "Node.js", "TailwindCSS"],
    github: "https://github.com/SualpDnc/FullStackTRDemographicsMap-MernStack-WebApp",
    live: null,
  },
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
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="work"
      ref={ref}
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "140px 40px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 80 }}>
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
          02 — Work
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.1 }}
          className="text-stroke"
          style={{
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          Projects
        </motion.h2>
      </div>

      {/* Project list */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {projects.map((project, i) => (
          <ProjectRow key={project.num} project={project} isLast={i === projects.length - 1} />
        ))}
      </motion.div>
    </section>
  );
}

function ProjectRow({
  project,
  isLast,
}: {
  project: (typeof projects)[number];
  isLast: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        display: "grid",
        gridTemplateColumns: "64px 1fr auto",
        gap: "0 40px",
        alignItems: "start",
        padding: "40px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: isLast ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
      whileHover="hovered"
    >
      {/* Number */}
      <span
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.1em",
          fontWeight: 500,
          paddingTop: 4,
        }}
      >
        {project.num}
      </span>

      {/* Content */}
      <div>
        <motion.h3
          variants={{
            hovered: { x: 8 },
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
            fontWeight: 700,
            color: "#f0f0f0",
            letterSpacing: "-0.02em",
            marginBottom: 12,
          }}
        >
          {project.title}
        </motion.h3>

        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.35)",
            lineHeight: 1.7,
            maxWidth: 520,
            marginBottom: 20,
          }}
        >
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "4px 12px",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 3,
                fontSize: 11,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.04em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 4 }}>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            textDecoration: "none",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.8)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.3)")
          }
        >
          GitHub ↗
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.8)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.3)")
            }
          >
            Live ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}
