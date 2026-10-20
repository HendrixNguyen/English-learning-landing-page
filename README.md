# Học 30 phút — Landing Page (Dungeon Quest Scroll)

The official landing page for **"Học 30 phút — Adaptive English Learning PWA"**, designed following **Option 3: Story-Driven Dungeon Quest Scroll** and strictly compliant with **Retro Quest UI Kit v2**.

The page narrates the journey of learning English consistently for 30 minutes every day through an AI-calibrated 28-day roadmap (powered by Gemini 3.8 Flash, DeepSeek, and OpenAI), keeping a virtual 16-bit plant companion alive, interactive tap-to-translate reading quests, and automatic two-way synchronization with Google Calendar & Google Tasks.

---

## 🎮 Key Visual & Interactive Features

* **Header HUD & Dungeon Scroll Spy**:
  * Tracks user position using `IntersectionObserver`, featuring an active blinking retro prompt `▶` and a live chamber indicator (`FLOOR: [CHAMBER II: II. 30-MIN ROOM]`).
  * A 4px pixel Dungeon Descent Depth Gauge fills automatically from 0% to 100% as the learner scrolls down.
* **Prologue · The Starting Shrine (Hero Section)**:
  * Central altar pedestal displaying an interactive 16-bit Plant Companion sprite (160px) with a 3-stage preview switcher (`Day 2`, `Day 10`, `Day 21`).
  * Instant-revealed companion speech box anchored directly beneath the plant pot.
  * Prominent, high-contrast primary CTA (`▶ Enter the First Room (100% Free)`) positioned firmly above the fold following Duolingo / Forest App UX standards.
* **Chapter I · The Seed & Map Orientation**:
  * Direct visual comparison between the "Old Burnout Trap" and the "30-Minute Learning Engine" using crisp 32px pixel glyphs.
  * Graphical infographics for the European CEFR proficiency ladder (A1 → C1), the daily 3-tier 10-minute loop, and Google Calendar / Tasks sync.
* **Chapter II · The 30-Minute Quest Room & Daily Loot Chest**:
  * Playable product demo: Read an English excerpt and tap underlined vocabulary to view instant Vietnamese definitions.
  * Reflex quiz question: Answering correctly awards `+20 HP`, completes the daily `DayBar` (30/30 minutes), and opens an animated glowing pixel loot chest.
* **Chapter III · Companion Survival & The Revive Challenge**:
  * Interactive companion sandbox: Test daily habit mechanics with `+ Study 30m (+20 HP)`, `- Miss 1 day (-30 HP)`, and `Revive Challenge (50 HP)`.
  * Visual gallery showcasing all 6 plant evolution stages (`Seed` → `Sprout` → `Sapling` → `Flowering` → `Fruitful` → `Wilted`) with dedicated 36px sprites.
* **Chapter IV · 4 Biomes World Map & Google Ecosystem Sync**:
  * Interactive 7-day strip for Week 1: Inspect 3 daily quests per day, automatic checklist tick statuses on Google Tasks, and scheduled calendar slots on Google Calendar.
  * Multi-model AI Router architecture overview (Gemini for roadmaps, DeepSeek for exercises, OpenAI for writing evaluation).
* **The Inn · Open Beta & Interactive FAQ**:
  * Early Access announcement banner highlighting 100% free access (0đ / all features unlocked).
  * 5 frequently asked questions structured as accessible, search-indexable HTML accordions (`<details name="inn-faq">`).
* **Final Boss Gate (Footer) & Mobile Thumb-First Sticky CTA**:
  * Final call-to-action featuring the fully-bloomed companion and an open treasure chest.
  * Fixed bottom bar on mobile viewports (`md:hidden`) with safe-area padding for one-handed mobile conversion.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`, TypeScript 5.8) |
| **Build Tool** | [Vite 6](https://vite.dev/) with `~/*` and `@/*` path alias resolution |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) strictly customized with `Retro Quest UI Kit v2` tokens |
| **Typography** | [Fontsource VT323](https://fontsource.org/fonts/vt323) (Display/Pixel Font) & [Nunito](https://fontsource.org/fonts/nunito) (Body Font, 400 & 700) |
| **Testing** | [Vitest](https://vitest.dev/) & [@vue/test-utils](https://test-utils.vuejs.org/) |
| **Linter / Typecheck** | [oxlint](https://oxc.rs/) & [vue-tsc](https://github.com/vuejs/language-tools) |
| **Package Manager** | [Bun](https://bun.sh/) |

---

## 📁 Repository Layout

```
src/
├── assets/
│   └── css/
│       ├── main.css              # @font-face declarations, base CSS variables, scroll-margin
│       └── retro.css             # Keyframe animations (laser streams, gate scan, breathing)
├── components/
│   ├── retro/                    # Atomic Retro UI Component Kit
│   │   ├── Badge.vue             # Streak, Shield, and CEFR level badges
│   │   ├── Chest.vue             # Animated pixel loot chest (closed/open)
│   │   ├── CompanionSprite.vue   # 16-bit multi-stage companion renderer
│   │   ├── DayBar.vue            # 30-minute daily progress bar
│   │   ├── HpBar.vue             # Health bar with color thresholds
│   │   ├── MapNode.vue           # Interactive world map checkpoint node
│   │   ├── PixelArt.vue          # Pure SVG pixel-art grid engine
│   │   ├── QuestNode.vue         # 10-minute quest step item
│   │   ├── RetroButton.vue       # Beveled pixel-perfect action button
│   │   ├── RetroPanel.vue        # RPG dialog panel with speaker legend
│   │   ├── RetroToast.vue        # Single-slot global notification toast
│   │   └── SpeechBox.vue         # Companion dialog bubble with instant reveal
│   └── story/                    # Option 3 Narrative Chapters
│       ├── ChapterConnector.vue  # Horizontal dungeon divider with animated chevrons
│       ├── ChapterFourWorldMap.vue# 28-day map & Google Calendar/Tasks sync
│       ├── ChapterOneSeed.vue    # Root causes & the 30-minute habit loop
│       ├── ChapterThreeCompanion.vue # Plant survival sandbox & revive mechanic
│       ├── ChapterTwoQuestRoom.vue   # 30-minute quest room demo & loot chest
│       ├── FinalBossFooter.vue   # Final departure gate & mobile sticky CTA
│       ├── HeroShrine.vue        # Central prologue shrine
│       ├── HudNavbar.vue         # Sticky retro HUD header with scroll spy
│       └── TheInnFaq.vue         # Open Beta banner & FAQ accordion
├── composables/
│   ├── useActiveSection.ts       # IntersectionObserver scroll spy & depth gauge
│   ├── useReducedMotion.ts       # OS prefers-reduced-motion detector
│   └── useRetroToast.ts          # Reactive toast state manager
├── utils/
│   ├── config.ts                 # Constants (PWA_LOGIN_URL, CEFR, Tasks)
│   ├── pixelArt.ts               # 16x16 pixel-art glyph matrices & PALETTE definitions
│   └── plant.ts                  # Plant HP math, streak formulas, and stage progression
├── App.vue                       # Root application layout linking story chapters
└── main.ts                       # Entry point loading fonts, CSS, and mounting the app
```

---

## 🚀 Getting Started

Prerequisites: **Bun 1.0+** (or **Node LTS 20+**).

### 1. Install Dependencies

```bash
bun install
```

### 2. Start Development Server

```bash
bun --bun run dev
```

Open your browser at [http://localhost:5173/](http://localhost:5173/).

### 3. Run Linter & Type Checker

```bash
bun --bun run check
```

Runs `oxlint` and `vue-tsc --noEmit` concurrently, requiring 0 warnings and 0 errors.

### 4. Run Unit Tests

```bash
bun --bun run test:unit
```

Executes the Vitest test suite, including the automated UI Kit compliance scanner (`retroKitCompliance.test.ts`).

### 5. Compile Production Bundle

```bash
bun --bun run build
```

Generates an optimized, statically deployable production bundle inside the `dist/` directory.

---

## 📜 Design Guidelines (Retro Quest UI Kit v2)

All code in this repository strictly adheres to Retro Kit v2 invariants:
1. **No Large Rounded Corners**: Utility classes like `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, and `rounded-full` are strictly prohibited (only `rounded-none` or `rounded-sm` are allowed).
2. **No Modern Glassmorphism/Gradients**: `backdrop-blur`, `blur-*`, `bg-gradient-*`, `scale-*`, `ease-*`, and `dark:` are banned.
3. **Canonical Token Palette**: Only tokens defined in `tailwind.config.ts` are permitted:
   * Background: `ground-0` (`#0f0e17`), `ground-1` (`#1a1829`), `ground-2` (`#26233d`).
   * Accents: `torch` (`#f4b41b`), `growth` (`#3ddc97`), `ember` (`#ff6b6b`).
   * Borders: `line-lit` (`#5c5799`), `line-dim` (`#2d2a4a`).
   * Text: `ink-0` (`#f4f1de`), `ink-1` (`#c5c2d6`), `ink-2` (`#8b87a5`).
4. **Integer Pixel Scaling**: Every `PixelArt` icon must be rendered at integer multiples of 16 (`size="16"`, `size="32"`, or `size="48"`) to maintain crisp, distortion-free pixel edges.
