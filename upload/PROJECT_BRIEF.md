# PROJECT BRIEF — LUXURY REAL ESTATE WEBSITE

> This file is the single source of truth for this build. Read it fully before writing any code. Follow every token, convention, and spec exactly. Where something is unspecified, choose the option that most resembles 111w57.com's editorial restraint and sobha.com's conversion clarity.

---

## 0 · ROLE & MISSION

You are an elite front-end engineer and art director who ships Awwwards Site-of-the-Day-level work — the caliber of 111w57.com (Outpost), lewisfontaine.com, and nagel-skills. You are building the marketing website for a luxury real estate brand. You write production-grade, accessible, performant code. You never ship placeholder-quality UI: every component you create must look finished, feel intentional, and respect the design tokens exactly.

**Mission:** Build a cinematic, editorial, award-worthy luxury real estate website — the storytelling restraint of 111w57.com fused with the conversion architecture of sobha.com — using React + Vite.

**Non-negotiable mindset rules:**
- One idea per viewport. Empty space is a feature, not wasted screen.
- Typography is the interface. The type IS the design.
- Every animation must be *felt, not noticed* — 0.8–1.6s, expo easing, never linear, never bouncy (unless a token says so).
- Bronze/taupe text on ivory — never pure black on pure white. This is a warm, quiet system, not a sterile one.
- Never use default browser focus rings, default scrollbars, or unstyled `alert()`/form errors — everything is designed.
- No emoji anywhere in the UI. Icons are stroke-based, 1.25px stroke, 24px grid, drawn from a single consistent set.

## 1 · DESIGN DNA — TOKENS

All tokens live in one place: Tailwind v4 `@theme` in `src/styles/tokens.css`. Nothing hardcodes a hex, px, or easing anywhere else. If a value isn't tokenized, add a token first.

### Color system

```
--color-canvas:        #F0EEEA   /* warm ivory — page background (from 111w57) */
--color-canvas-soft:   #F4F4F4   /* alternate band for section rhythm */
--color-canvas-deep:   #EAE7E1   /* tertiary band / hover fills */
--color-ink:           #212121   /* headings, primary text */
--color-bronze:        #7C7262   /* signature body text & quiet labels (111w57's core move) */
--color-bronze-deep:   #5E564A   /* bronze on hover, captions */
--color-gold:          #AE9751   /* conversion moments only: primary CTA, active states (from Sobha) */
--color-gold-deep:     #8F7A42   /* CTA hover */
--color-sage:          #D0D5D2   /* hairline borders, image borders, dividers */
--color-navy:          #293C5B   /* links, selective emphasis, dark-section text */
--color-night:         #1A1918   /* footer & dark chapters background */
--color-bone:          #F5F2ED   /* text on dark sections */
--color-line:          rgba(124,114,98,0.25)  /* 1px hairlines everywhere */
```

Rules: `gold` appears ONLY on primary CTAs, form focus, and active nav — never for decoration. Dark `night` chapters are used for at most 2 sections per page (footer, one cinematic interlude). All body text is `bronze`, never pure black.

### Typography

Two families, loaded via `@fontsource` with `font-display: swap`, max 4 total weights site-wide:

| Role | Premium (if licensed) | Free fallback (default) | Usage |
|---|---|---|---|
| Display serif | Canela Deck / GT Sectra | **Fraunces** (opsz 72, SOFT 0, WONK 0, wght 300–400) | H1/H2, pull quotes, big numerals |
| Grotesque sans | Suisse Int'l / Neue Haas | **Inter** (wght 300/400/500 only) | Body, labels, nav, buttons |

Type scale (desktop → mobile via clamp):

```
--text-display-xl:  clamp(3.5rem, 9vw, 8rem) / 1.02 / -0.03em   /* hero H1 — 111w57 uses 64px @ 1.0 with -1.6px */
--text-display:     clamp(2.75rem, 6vw, 5rem) / 1.05 / -0.02em  /* chapter headlines */
--text-display-s:   clamp(2rem, 4vw, 3.25rem) / 1.1 / -0.015em  /* sub-headlines, big stats */
--text-quote:       clamp(1.5rem, 2.5vw, 2rem) / 1.35 / 0em     /* serif pull quotes */
--text-body-l:      1.2rem / 1.6 / 0em  (wght 300)              /* lead paragraphs, 111w57 body is 19.2px */
--text-body:        1rem / 1.7 / 0em    (wght 300)              /* default body */
--text-label:       0.9375rem / 1.2 / 0.12em uppercase wght 500 /* section labels — 111w57's 15px "Services" pattern */
--text-micro:       0.75rem / 1.4 / 0.14em uppercase wght 500   /* nav, footer, image captions */
--text-numeral:     font-feature-settings: "tnum" 1             /* all stats/prices use tabular figures */
```

Section label pattern (the 111w57 signature): micro uppercase sans label + 32px hairline rule growing to 56px on scroll, placed above every chapter, always left-aligned at the grid's first column.

### Space & grid

```
--spacing-section:  clamp(6rem, 12vh, 9.375rem)   /* 100px+ rhythm — 111w57's gap-y */
--spacing-component: 2.5rem
--grid-columns: 12, gutter clamp(16px, 2vw, 32px)
--container-max: 1600px, side padding clamp(20px, 4vw, 80px)
```

Every page section is a `.site-max .site-grid` block (name them exactly this — it's 111w57's convention): full-width, inner grid. Text blocks span 4–5 columns; portrait imagery spans 5–7 columns, offset by 1 empty column. **Asymmetry is mandatory** — a centered two-column split is a design failure on this project.

### Imagery rules

- Portrait editorial framing: 3:4 or 4:5 (`--ratio-portrait: 3/4`) for residence/amenity imagery; landscape 16:9 only for full-bleed chapter breaks.
- Every image sits in an `aspect-ratio` box — zero layout shift, ever.
- Treatment: `filter: saturate(0.85) contrast(1.02)` — slightly muted, warm. Never oversaturated HDR.
- Captions in `micro` bronze below or rotated 90° along the left grid edge (the editorial move).
- Serve AVIF/WebP via `<picture>` with responsive `sizes`; hero images `fetchpriority="high"`, everything below the fold `loading="lazy"`.
- Icon system: single custom stroke SVG set (1.25px stroke, 24px grid, round caps) — arrows, plus, location pin, phone, mail, Instagram. No icon library soup.

## 2 · TECH STACK & ARCHITECTURE

```
React 18 + Vite (TypeScript, strict)
Tailwind CSS v4 (@theme tokens — no config file)
GSAP 3 + ScrollTrigger        → all scroll choreography
Lenis 1.x                     → smooth scroll, raf-synced with ScrollTrigger
React Router 7                → routes + layout templates
Zustand                       → global state (menu open, inquiry modal, project filters)
React Hook Form + Zod         → inquiry form with typed validation
framer-motion                 → component-level UI state only (menus, modals); GSAP owns scroll
react-helmet-async            → per-route meta/SEO
@fontsource/fraunces, @fontsource-variable/inter
Optional Phase-4 module: @react-three/fiber + drei (WebGL hero — only after core is 95+ Lighthouse)
```

Folder structure (exact):

```
src/
  app/
    router.tsx              — route table with lazy() per page
    providers.tsx           — LenisProvider, HelmetProvider, AnimatePresence
  pages/
    Home.tsx  Story.tsx  Projects.tsx  ProjectDetail.tsx
    Amenities.tsx  Neighborhood.tsx  Inquire.tsx  NotFound.tsx
  components/
    layout/    Header  FullscreenMenu  Footer  PageTransition
    motion/    Preloader  CustomCursor  RevealText  ParallaxImage
               HorizontalGallery  ChapterDivider  CounterStat
    ui/        Button  SectionLabel  Hairline  Image  Marquee  Accordion
    project/   ProjectCard  ProjectFinder  ProjectGrid  SpecTable
               FloorPlanGallery  AvailabilityTable
    forms/     InquiryForm  Field  Select  Toast
  hooks/       useLenis  useReveal  useParallax  useMagnetic  useLockScroll
  lib/         gsap.ts    — gsap.registerPlugin, defaults (ease: "expo.out")
               easings.ts — tokenized curves
  data/        projects.ts — typed project inventory (the single source of truth)
  styles/      tokens.css  — ALL @theme tokens  global.css — resets, selection, scrollbar, focus
```

Conventions: no default exports except pages; every component file has a `interface Props` above it; all data-driven components take typed `Project` objects from `src/data/projects.ts`; GSAP contexts always created in `useGSAP` and reverted on unmount; Lenis instance lives in a provider, `data-lenis-prevent` on scrollable modals.

## 3 · INFORMATION ARCHITECTURE & PAGE SPECS

Sitemap: `/` · `/story` · `/projects` · `/projects/:slug` · `/amenities` · `/neighborhood` · `/inquire` — plus `ProjectFinder` (Sobha's conversion widget) on Home and Projects.

### HOME — the cinematic narrative (structure = 111w57's arc)
1. **Hero (100vh, night→canvas):** full-viewport portrait render, slow 1.15→1 scale settle. H1 in `display-xl` serif, split into 3 lines revealed by line-mask stagger ("Manhattan's Newest Landmark" energy). Bottom row: `micro` location line left, "Watch the film" ghost link with play glyph right. Header is mix-blend-difference over it.
2. **Thesis chapter:** one `display` serif sentence spanning 8 columns (e.g. "A rarefied collection of full-floor residences."), `body-l` bronze paragraph spanning 4 columns, offset one column right. Pure typography, canvas background.
3. **Press pull-quote:** critic quote in `quote` serif, hairline above, attribution in `label`. (111w57's Paul Goldberger device — source a real quote or omit rather than fake one.)
4. **Residences chapter (label: "RESIDENCES"):** two portrait 3:4 ParallaxImages at different scroll speeds (0.9 / 1.1) flanking a text column — the asymmetric editorial spread.
5. **Design chapter:** full-bleed 16:9 interlude image with clip-path reveal on scroll, overlaid `label` + one-line `display-s`.
6. **Featured project chapter (label: "FEATURED"):** Sobha's conversion moment — featured ProjectCard large, gold primary CTA "Discover the residences" + ghost "View availability".
7. **ProjectFinder chapter (label: "FIND YOUR HOME"):** City → Project → Configuration selects + gold Search button. On dark `night` background — the one dark interlude. (Direct Sobha steal, restyled.)
8. **Amenities triptych:** three chapters in 111w57's pattern — `label` + `display-s` headline ("World-class services" / "Redefining wellness" / "Heart of the city") + portrait image + `body` paragraph + ghost text-link. Vertical rhythm 100px+.
9. **Stats bar:** 4 CounterStat numerals (tabular figures, count up on enter) separated by hairlines.
10. **Neighborhood teaser + marquee:** district names in a slow marquee under a `display-s` line.
11. **Final CTA:** full-bleed image, `display` serif line "Begin the conversation.", gold Button → `/inquire`. Footer follows.

### STORY (`/story`) — trust layer (Sobha's content, 111w57's form)
Founder narrative chapter, philosophy manifesto in large serif, leadership grid (portrait 3:4, name in `label`, role in `micro`), awards & honours list as hairline table rows (year | title | body — no cards, no badges), timeline of milestones.

### PROJECTS (`/projects`) — the inventory
Hero: `display` line + result count. Filters as text-link row (City / Config / Status) in `label` style with gold active state — never dropdown chips. Grid: 2-col desktop of ProjectCards (portrait 3:4 image with scale-on-hover 1.05 over 8s, project name `display-s` serif, "3–4 Bed Residences · City" in `body` bronze, price from in `label` gold-deep). Cards stagger-reveal by 0.08s. Empty state is a designed state.

### PROJECT DETAIL (`/projects/:slug`) — where deals close
1. Hero: full-bleed render + name in `display-xl` + breadcrumb `micro`.
2. Overview: text column + spec table (Configuration / Sizes / Status / Possession / Price) in hairline rows.
3. HorizontalGallery — pinned section, scroll drives horizontal travel through 5–7 portrait renders, captions in `micro` bronze. **This is the signature awwwards moment of the whole site.**
4. Amenities accordion (hairline rows, serif headings).
5. Floor plans: tabbed by configuration, plans in bordered sage frames, download ghost link.
6. Location chapter: stylized map block or dark aerial image + points of interest as a hairline table with distances.
7. Sticky inquiry rail (desktop): gold CTA + phone/email in `micro`, appears after hero.
8. Next project footer link — full-bleed image + next project's name in `display`.

### AMENITIES (`/amenities`)
Chapter per amenity space alternating image/text, Club-111-style editorial copy, one dark interlude with the pool/wellness imagery.

### NEIGHBORHOOD (`/neighborhood`)
Cinematic full-bleed opener, map or skyline interlude, POI list as distance table, city districts as chapters.

### INQUIRE (`/inquire`)
Split layout: left column is the pitch (`display-s` line, phone, email, address in `micro`); right is InquiryForm — RHF+Zod: name, email, phone, interest (select of projects), message, consent checkbox. Submit = 1.2s gold fill sweep on the button, then success state replaces the form with serif thank-you line (no browser alerts, ever).

## 4 · COMPONENT INVENTORY

| Component | Behavior spec |
|---|---|
| `Preloader` | Ivory screen, project monogram in serif, percentage counter in tabular `micro` (0→100 over asset load, min 1.8s), then curtain lifts via clip-path 1s expo. Site scroll locked until done. |
| `CustomCursor` | 12px bronze dot + 36px hairline ring, blend-difference over dark sections; ring scales 2.5x with "VIEW" text over project cards; dot hides on touch devices. |
| `Header` | Fixed, transparent, mix-blend-difference; wordmark left, `INQUIRE` text button right, hamburger (two 24px lines that morph to X) center-right. Hides on scroll-down, reveals on scroll-up at 120px. |
| `FullscreenMenu` | Ivory full-screen, clip-path circle reveal from hamburger (1s expo). Nav items in `display` serif with index numerals `01–07`, stagger 0.07s; hover = 12px right shift + gold index. Footer strip with contact `micro`. Escape key + route change closes. |
| `PageTransition` | AnimatePresence route swap: outgoing page fades 0.4s while a canvas panel wipes up 0.8s expo; incoming content staggers in. 300ms link anticipation on nav clicks. |
| `RevealText` | Splits text into line masks (no per-letter jitter), translateY 110%→0, 1.2s expo, 0.09s line stagger, triggers at 70% viewport. The ONLY text reveal on the site. |
| `ParallaxImage` | aspect-ratio box, inner img 115% height translateY ±(speed×15%) via ScrollTrigger scrub, grayscale→saturate(0.85) settle, optional clip-path inset reveal. `speed` prop 0.5–1.5. |
| `HorizontalGallery` | Pinned container, track width = n×70vw, scrub-driven translateX, progress hairline bottom, counter "03 / 07" tabular. |
| `SectionLabel` | Uppercase `label` + hairline that grows 32→56px on enter (0.8s expo). |
| `Button` | Variants: `gold` (filled #AE9751, bone text, 999px radius, 56px height, 0.6s hover darkening + 8px magnetic drift), `ghost` (hairline border, bronze text, border sweeps to gold). Magnetic via `useMagnetic` (±8px, spring lerp 0.15). All `<button>`/`<a>` semantics preserved. |
| `ProjectFinder` | Three styled selects (City→Project→Config cascade), gold submit; results navigate to `/projects?city=…&config=…`. Dark `night` panel, bone text, sage hairlines. |
| `ProjectCard` | Portrait 3:4, hover: image scale 1.05 over 0.8s ease-out, label slides up 8px, ring cursor state; entire card is one `<Link>`. |
| `CounterStat` | Numerals count 0→N over 1.6s expo on first enter, `tnum`, suffix in gold. |
| `Accordion` | Hairline rows, plus-rotates-to-X 0.5s, height auto-animated via framer-motion, serif question text. |
| `InquiryForm` | See Inquire page spec. Zod errors in `micro` bronze-deep under fields, gold focus ring (2px offset 2px). |
| `Footer` | `night` background: wordmark serif `display`, nav columns `micro` uppercase, contact row, social hairline links, legal line, "Back to top" ghost button triggering Lenis scrollTo. |
| `Marquee` | Infinite translateX loop, 60s linear (the ONLY linear animation allowed), pauses on hover, `aria-hidden` duplicate track. |

## 5 · MOTION CHOREOGRAPHY (GSAP + Lenis)

**Global:** Lenis `lerp: 0.09`, `wheelMultiplier: 1`, gsap ticker raf-sync. Default ease `expo.out` — register once in `lib/gsap.ts`. NEVER use linear outside Marquee, never `back`/`elastic`.

| Moment | Choreography |
|---|---|
| Load | Preloader counter → curtain clip-path lift (0.9s) → hero lines stagger up (1.2s, 0.09 delay) → hero image settles scale 1.15→1 (2.4s, power2.out) → header fades (0.6s) |
| Scroll chapter | SectionLabel hairline grows; RevealText lines rise; images clip-inset reveal 100%→0% 1.4s |
| Parallax | Scrub-linked: images ±15%, full-bleed chapters 0.85 scale drift, headlines 0.95 |
| HorizontalGallery | Pin + scrub translateX; velocity-based skew on cards max 3° |
| Hover | Buttons magnetic ±8px + darken; links: underline sweep 0.4s from left; cards: 1.05 scale + cursor "VIEW" |
| Route change | PageTransition wipe (see component) |
| 404 | Night background, giant serif "0 4 0 4" numerals with parallax, ghost link home |

**Accessibility:** every GSAP effect checks `prefers-reduced-motion` — reduced = instant states, parallax off, preloader skips to 0.4s max, Lenis disabled (native scroll). Keyboard focus never trapped by menu without Escape route. All scroll-driven effects degrade to static visible content if JS fails.

## 6 · PERFORMANCE · A11Y · SEO BUDGETS

- Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. Treat < 85 as a build failure.
- LCP < 2.5s (hero AVIF, preloaded, `fetchpriority=high`), CLS < 0.1 (all media in aspect-ratio boxes), TBT < 200ms (route-level `lazy()` code split; GSAP loaded once).
- Fonts: 2 families, ≤ 4 weights total, `font-display: swap`, latin subset only.
- WCAG 2.1 AA: bronze-on-ivory body passes 4.5:1; hairlines never the only affordance; skip-to-content link; full keyboard nav incl. FullscreenMenu (focus trap + Escape), HorizontalGallery (arrow-key fallback), gallery sliders (tab to card grid). Form errors announced via `aria-live`.
- SEO: react-helmet per route — title, description, OG/Twitter images (1200×630, designed, gold-on-ivory), JSON-LD `Residence`/`RealEstateListing` + `Organization` schemas, canonical URLs, sitemap.xml, robots.txt. Semantic landmarks (header/nav/main/section/footer), one h1 per page, heading levels never skipped.

## 7 · COPY TONE & VOICE

Quiet confidence. Short declarative sentences. No exclamation marks — ever. No "luxury", "dream", "opulent" clichés (show, don't say). Numbers over adjectives: "82-foot pool", not "stunning pool". Section labels are one or two words, uppercase. Buttons are verbs: "Discover", "Inquire", "View availability", "Begin". Placeholders to write now: headline "A new landmark rises.", thesis paragraph ~40 words, project entries with full spec rows. British-neutral English.

## 8 · QUALITY BAR — DEFINITION OF DONE

The build is not done until ALL of these are true:
- [ ] Zero hardcoded hex/px/easing values outside `tokens.css`
- [ ] Every image in an aspect-ratio box, AVIF+WebP+fallback via `<picture>`
- [ ] Every page reachable by keyboard only, Escape closes every overlay
- [ ] `prefers-reduced-motion` honored on every animated component
- [ ] Preloader, CustomCursor, FullscreenMenu, PageTransition all working on route changes
- [ ] Home, Story, Projects, ProjectDetail, Amenities, Neighborhood, Inquire + 404 complete with real copy (no lorem)
- [ ] HorizontalGallery pinned scroll works with Lenis without jitter
- [ ] ProjectFinder filters actually navigate with query params
- [ ] Lighthouse mobile ≥ 90 / 95 / 95 / 95
- [ ] No console errors or warnings on any route
- [ ] A ruthless design pass: if any viewport looks like a generic template — spacing too even, columns too symmetric, type too small — fix it before shipping

---

# BUILD ROADMAP — EXECUTE IN PHASES

> The build happens in four phases. Begin a phase only when instructed ("begin Phase 1"). Never skip ahead, never bundle phases together. At the end of each phase, report what was built, the tokens created, and any deviations with reasons.

## PHASE 1 — Foundation & Design System

This brief is the source of truth. In Phase 1, build ONLY the foundation. Do not build pages yet.

1. Scaffold: Vite + React 18 + TypeScript strict. Install: tailwindcss v4, gsap, lenis, react-router-dom, zustand, framer-motion, react-helmet-async, react-hook-form, zod, @fontsource-variable/fraunces, @fontsource-variable/inter.
2. Create src/styles/tokens.css with EVERY token from the brief's Design DNA section via @theme, and global.css with resets, custom selection color, custom scrollbar (thin, sage track, bronze thumb), and visible bronze focus-visible rings.
3. Create src/lib/gsap.ts (register ScrollTrigger, set defaults: ease "expo.out", duration 1.2) and src/lib/easings.ts.
4. Build these components exactly to their brief specs: Preloader, CustomCursor, Header, FullscreenMenu, PageTransition, SectionLabel, RevealText, ParallaxImage, Button (gold + ghost + magnetic), Hairline, Image (picture/AVIF/aspect-ratio wrapper), Footer, Marquee.
5. Build hooks: useLenis (provider + ScrollTrigger raf sync), useReveal, useParallax, useMagnetic, useLockScroll.
6. Set up router.tsx with lazy routes and AnimatePresence page transitions; providers.tsx with Lenis + Helmet.
7. Create a temporary Home page that demos the system: Preloader → hero with RevealText headline, one ParallaxImage chapter, one Button of each variant, the FullscreenMenu opening from the header. This is your design-system proof — make it flawless.
8. Verify: npm run build with zero TS errors; reduced-motion path works; keyboard can open and close the menu with Escape.

Report which tokens you created and any deviations (with reasons) before finishing.

## PHASE 2 — Pages & Content Architecture

Re-read this brief plus the existing code from Phase 1. Phase 2 delivers every page, with real placeholder copy written in the brief's copy tone (no lorem ipsum, no "TODO").

1. Create src/data/projects.ts: a typed Project interface (slug, name, city, config[], sizes, status, possession, priceFrom, heroImage, gallery[], amenities[], floorPlans[], coordinates, highlights) and 6 realistic sample projects across 3 cities — invent plausible names and specs, portrait 3:4 image URLs from picsum or similar placeholders.
2. Build Home.tsx following the brief's 11-section arc EXACTLY, including the ProjectFinder chapter on the night background and the stats bar with CounterStat.
3. Build Projects.tsx with text-link filters (city/config/status) driven by URL query params; grid of ProjectCards with staggered reveals; designed empty state.
4. Build ProjectDetail.tsx with the full 8-block structure, including the pinned HorizontalGallery — this is the signature interaction, make the counter and progress hairline feel precise. Sticky inquiry rail appears after hero.
5. Build Story.tsx, Amenities.tsx, Neighborhood.tsx, Inquire.tsx (with full RHF+Zod form + success state), and NotFound.tsx (the 0404 numeral page).
6. Per-route SEO via react-helmet: title/description/OG + JSON-LD Residence schema on detail pages.
7. Verify: every route renders, filters update the URL and the grid, the inquiry form validates and shows the designed success state, zero console errors.

Report the section list you built per page before finishing.

## PHASE 3 — Motion Polish & Award Pass

Execute the Motion Choreography and Quality Bar sections. Phase 3 is the last 10% that makes this award-worthy — craft only. Do not add features; refine.

1. Choreograph every moment in the brief's motion table: load sequence timing, chapter reveals, parallax speeds (portrait images 0.9/1.1 in the Residences chapter), velocity skew in HorizontalGallery, hover states everywhere including cursor ring text.
2. Tune PageTransition: outgoing fade + canvas wipe timing must feel seamless — test on at least 5 route pairs.
3. Cross the polish list: custom text selection, scrollbar, focus states, 404 numerals parallax, footer back-to-top via Lenis scrollTo, marquee pause on hover.
4. Performance pass: check bundle with rollup-plugin-visualizer; lazy-load GSAP-heavy routes; ensure hero LCP asset is preloaded; compress all sample images to AVIF/WebP with width descriptors and correct sizes attributes.
5. Accessibility pass: full keyboard walkthrough of every page; focus trap audit on FullscreenMenu and InquiryModal; aria-live on form errors; reduced-motion audit on every animated component.
6. Run Lighthouse mobile on every route. Fix anything below 90/95/95/95.
7. Final design ruthlessness pass against the brief: any viewport that feels like a template — symmetric columns, even spacing, small type, centered everything — restructure it per the grid and asymmetry rules.

Report Lighthouse scores and the list of refinements you made.

## OPTIONAL PHASE 4 — WebGL Hero (only after 95+ scores)

Add an OPTIONAL WebGL layer to the Home hero only, behind a feature flag so it can be disabled: React Three Fiber + drei. Concept: a slowly rotating architectural line-drawing of the tower (edges only, bronze material, fog), drawn with LineSegments from an extruded profile, subtle mouse parallax on camera (lerp 0.05), DPR capped at 1.5, pauses when tab hidden, falls back to the static hero image if WebGL unavailable or on reduced-motion. It must load AFTER LCP and add < 150KB gzipped to the hero route. If it hurts Lighthouse performance below 90, remove it.

---

# DESIGN TOKEN CHEAT SHEET
> Pin this next to your monitor. Every value below is canonical.

| Token | Value | Used for |
|---|---|---|
| `--color-canvas` | `#F0EEEA` | Page background — the ivory signature |
| `--color-canvas-soft` | `#F4F4F4` | Alternate section band |
| `--color-ink` | `#212121` | Headings |
| `--color-bronze` | `#7C7262` | Body text, quiet labels (the 111w57 move) |
| `--color-gold` | `#AE9751` | Primary CTAs & active states ONLY (the Sobha move) |
| `--color-sage` | `#D0D5D2` | Hairlines, borders, dividers |
| `--color-navy` | `#293C5B` | Links, selective emphasis |
| `--color-night` | `#1A1918` | Footer + one dark interlude per page |
| `--color-bone` | `#F5F2ED` | Text on dark |
| Display serif | Fraunces 300–400 (Canela class) | H1/H2/quotes/numerals |
| Grotesque | Inter 300/400/500 | Body/labels/nav/buttons |
| `--text-display-xl` | `clamp(3.5rem, 9vw, 8rem)`, lh 1.02, ls −0.03em | Hero H1 |
| `--text-label` | `0.9375rem`, ls 0.12em, 500, uppercase | Section labels |
| `--spacing-section` | `clamp(6rem, 12vh, 9.375rem)` | Chapter rhythm (~100px) |
| Grid | 12 col / gutter `clamp(16px,2vw,32px)` / max 1600px | `.site-max .site-grid` |
| Portrait ratio | 3:4 (4:5 acceptable) | Residence & amenity imagery |
| Ease | `expo.out` (linear ONLY in Marquee) | Everything |
| Durations | text 1.2s · images 1.4s · hover 0.4–0.8s · loader 1.8s+0.9s | Choreography |
| Lenis | `lerp 0.09` | Smooth scroll |
| Stagger | lines 0.09s · cards 0.08s · menu items 0.07s | Reveals |
| Parallax | images ±15% · full-bleed 0.85 scale | Scrub |

---

*Analysis sources: live inspection of 111w57.com (Nuxt 3 · Tailwind · Lenis · DatoCMS · the-serif/the-sans type system · 64px display at lh 1.0 ls −1.6px · portrait 3:4 imagery · ivory #F0EEEA / bronze #7C7262 palette) and sobha.com (WordPress · Inter 300 · gold #AE9751/#B79A4D conversion system · 13-city mega-menu IA · City→Project→Config finder widget · 33-project inventory). Fused and engineered for React 18 + Vite.*
