# AGENTS.md — Canonical Guidelines for AI Coding Agents

Mandatory rules, guidelines, and toolchain constraints for any AI Coding Agent (Antigravity, Claude Code, Codex, Gemini CLI...) operating within the **English-learning-landing-page** repository.

---

## 1. Repository Purpose

This repository hosts the **official landing page** for the **"Học 30 phút — Adaptive English Learning PWA"** platform (companion to the core `English-Training-Harness` repository).

Primary objectives:
- Tell the story of sustainable, daily English learning through an interactive 16-bit dungeon journey (**Option 3: Story-Driven Dungeon Quest Scroll**).
- Maximize learner conversion (CRO) toward Google PWA account registration through an immediate **Play-First Experience**.
- Maintain strict compliance with **Retro Quest UI Kit v2**.

---

## 2. Toolchain & Runtime Environment

- **Package Manager & Task Runner**: Always use **Bun** (`/home/huyndg-pc/.bun/bin/bun --bun`). All package scripts in `package.json` must be invoked with the `--bun` flag (e.g., `bun --bun run <command>`).
- **Dev Server**: Vite running on port `5173` (`http://localhost:5173/`).
- **Linter & Type Checker**: `oxlint` and `vue-tsc --noEmit`.
- **Unit Test Runner**: `vitest` and `@vue/test-utils`.
- **Production Bundler**: `vite build` emitting to `dist/`.

---

## 3. Mandatory Invariant Rules

### 🔴 Rule 1: Strict Retro Quest UI Kit v2 Compliance
Automated test `tests/unit/retroKitCompliance.test.ts` scans all `.vue` files inside `src/components/`. Agents must **NEVER** introduce modern utility classes:
* ❌ **NO Large Rounded Corners**: `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full` (only `rounded-none` or `rounded-sm` are allowed).
* ❌ **NO Glassmorphism / Blur**: `backdrop-blur`, `blur-*`.
* ❌ **NO Gradients**: `bg-gradient-*`.
* ❌ **NO Smooth Tailwind Animations**: `ease-in`, `ease-out`, `ease-in-out`, `scale-*`.
* ❌ **NO Dark Mode Classes**: `dark:`.
* ✅ **CANONICAL TOKENS ONLY**: Use only tokens defined in `tailwind.config.ts`:
  * Grounds: `ground-0` (`#0f0e17`), `ground-1` (`#1a1829`), `ground-2` (`#26233d`).
  * Accents: `torch` (`#f4b41b`), `growth` (`#3ddc97`), `ember` (`#ff6b6b`).
  * Lines: `line-lit` (`#5c5799`), `line-dim` (`#2d2a4a`).
  * Inks: `ink-0` (`#f4f1de`), `ink-1` (`#c5c2d6`), `ink-2` (`#8b87a5`).

### 🔴 Rule 2: Visual Hierarchy & Conversion Integrity (CRO)
* **Above the Fold (Hero Shrine)**: The right column must keep the primary CTA button (`▶ Bước vào căn phòng đầu tiên`) prominent and directly visible. Do not stack more than 4 layers of information.
* **No "Box-in-Box" Nesting**: Chapter titles and introductions across Chapters I–IV must sit cleanly and freely on the `bg-ground-0` canvas. Reserve `RetroPanel` exclusively for primary interactive sandbox stations.
* **Integer Pixel Scaling**: All `PixelArt` icons must be passed an integer multiple of 16 for `:size` (`size="32"` or `size="48"`) and use high-contrast color roles (`torch`, `growth`, `ember`, `ink-0`). Never use dark canvas colors for pixel drawings.

### 🔴 Rule 3: The Three Quality Gates
Before concluding any session, Agents **MUST** execute and pass all three verification commands:
1. `bun --bun run check`: Must yield **0 warnings, 0 errors**.
2. `bun --bun run test:unit`: All `4/4` test suites and `9/9` tests must **PASS**.
3. `bun --bun run build`: Production bundle compilation must succeed cleanly.

> [!CAUTION]
> **Never** fix failures by deleting tests, loosening assertions, or disabling linters. Correct the source code or component data to satisfy the tests.

### 🔴 Rule 4: Test Invariant Preservation
Unit tests in `tests/unit/` rely on specific selectors and text strings. **Never remove or rename them**:
* **Chapter II**:
  * `[data-gloss-word="consistent"]`, `[data-gloss-word="momentum"]`
  * `[data-gloss-panel]`
  * `[data-option="A"]`, `[data-option="B"]`, `[data-quiz-feedback]`
  * Exact strings: `'consistent'`, `'momentum'`, `'Đà tiến triển'`, `'Trượt…'`, `'Trúng!'`, `'20/30'`, `'66%'`, `'30/30'`, `'Phòng hôm nay đã xong'`, `'Nhận lộ trình thật của cậu →'`.
* **Chapter III**:
  * `[data-btn-study]`, `[data-btn-miss]`, `[data-btn-revive]`
  * `[data-sandbox-stage]`, `[data-stage-btn="fruitful"]`
  * Exact strings: `'80/100'`, `'x4'`, `'100/100'`, `'x5'`, `'50/100'`, `'x0'`, `'20/100'`, `'0/100'`, `'Héo úa (Wilted)'`, `'Mầm non (Sprout)'`, `'Sai quả (Fruitful)'`, `'x15'`.
* **Chapter IV**:
  * `[data-selected-day-title]`, `[data-calendar-status]`, `[data-task-status]`
  * `button[aria-label^="Ngày 1"]`, `button[aria-label^="Ngày 3"]`, `button[aria-label^="Ngày 6"]`
  * Exact strings: `'Ngày 4'`, `'Hôm nay 20:30 – 21:00'`, `'Ngày 1'`, `'Đã tự động tick'`, `'Ngày 3'`, `'Đang chờ Học bù'`, `aria-disabled="true"`.

### 🔴 Rule 5: Accessibility & Mobile Standards
* Always maintain the Skip Link (`#main-quest-scroll`) at the top of the DOM.
* All interactive buttons, links, and `<details>` tags must have clear `:focus-visible` styling with `outline-torch`.
* Support `prefers-reduced-motion` natively through `useReducedMotion`.
* Ensure the mobile sticky bottom bar (`md:hidden`) includes `env(safe-area-inset-bottom)` padding.
