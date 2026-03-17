# sualpdanaci.dev — Personal Portfolio

My personal portfolio website, built with a minimal dark aesthetic and smooth animations.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + inline styles |
| Animations | Framer Motion |
| Font | Geist (by Vercel) |
| Deployment | Vercel |

## Design Decisions

- **Monochrome palette** — `#080808` background with white at varying opacities. No color distractions, letting content speak.
- **Noise overlay** — A subtle SVG film grain texture layered on top for depth and tactility.
- **Custom cursor** — A dot + trailing ring that scales on hover, replacing the default OS cursor.
- **Floating particles** — 80 canvas-rendered particles drifting across the full page for a living background.
- **Text scramble** — The hero name reveals through random characters before settling, inspired by terminal/hacker aesthetics.
- **Mouse-tracking spotlight** — A radial glow that follows the cursor, giving the hero section a reactive feel.
- **Scroll-triggered animations** — Each section fades and slides in via `useInView` as the user scrolls down.

## Structure

```
src/
├── app/
│   ├── layout.tsx            # Global layout, fonts, metadata
│   ├── page.tsx              # Page composition
│   └── globals.css           # Base styles, scrollbar, dot-grid
└── components/
    ├── Navbar.tsx             # Fixed header with scroll-aware blur
    ├── Hero.tsx               # Landing section, scramble + typewriter
    ├── About.tsx              # Bio, photo, skills, stats
    ├── Projects.tsx           # Work showcase in row layout
    ├── Contact.tsx            # Email + social links
    ├── CustomCursor.tsx       # Dot + ring cursor
    ├── NoiseOverlay.tsx       # Film grain texture
    └── FloatingParticles.tsx  # Canvas particle system
```

## Running Locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

## License

MIT
