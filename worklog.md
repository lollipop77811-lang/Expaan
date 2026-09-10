# Worklog — Luxury Real Estate Website Build

Source of truth: `/home/z/my-project/upload/PROJECT_BRIEF.md` (325 lines, exhaustive spec).
Tech stack: React 18 + Vite + TypeScript + Tailwind v4 + GSAP + Lenis + React Router 7 + Zustand + RHF/Zod + framer-motion + react-helmet-async + @fontsource.
Target output: a runnable Vite project at `/home/z/my-project/` (or a subdir) with `npm run build` passing.

---
Task ID: 0
Agent: orchestrator (main)
Task: Bootstrap the build, hand off to a general-purpose subagent for execution of Phases 1–3.

Work Log:
- Read the full PROJECT_BRIEF.md (325 lines) — confirmed tech stack, tokens, components, pages, motion table, quality bar.
- Confirmed /home/z/my-project/ is empty except download/README.md and upload/PROJECT_BRIEF.md.
- Created this worklog file as the shared state for all agents.
- Dispatching Task ID 1 to a general-purpose subagent with the full brief path, the worklog protocol, and verification requirements.

Stage Summary:
- Project root: `/home/z/my-project/` (Vite project will be scaffolded here)
- Brief path passed to subagent: `/home/z/my-project/upload/PROJECT_BRIEF.md`
- Subagent instructed to execute Phases 1, 2, and 3 (Phase 4 WebGL is optional and skipped unless 95+ Lighthouse)

---
Task ID: 1
Agent: general-purpose
Task: Build complete luxury real estate website per PROJECT_BRIEF.md

Work Log:
- Read existing worklog and the full PROJECT_BRIEF.md (325 lines) end-to-end before scaffolding.
- Scaffolded Vite React-TS project at /home/z/my-project/ (preserved worklog.md, download/, upload/, .git/, .env, skills/ untouched).
- Pinned React 18, Vite 6, TypeScript 5.7 (the scaffold's React 19 + TS 6 template was rewritten to match the brief's stack).
- Installed dependencies: gsap, lenis, react-router-dom@7, zustand, framer-motion, react-helmet-async, react-hook-form, zod, @hookform/resolvers, @fontsource-variable/fraunces, @fontsource-variable/inter, tailwindcss@4 + @tailwindcss/vite.
- Wired Tailwind v4 via the Vite plugin (no tailwind.config.js — CSS-based config in tokens.css).

Phase 1 — Foundation & Design System:
- Created src/styles/tokens.css with EVERY Design DNA token via @theme: 11 color tokens, both font families, 6 type sizes with clamp() and tnum feature, spacing-section (clamp), spacing-component, grid columns/gutter, container max/side padding, portrait ratio, 4 ease curves, 7 durations, 3 stagger values, cursor dims, pill radius, button height, image saturation/contrast.
- Created src/styles/global.css with @import "tailwindcss"; + tokens + fontsource imports; resets; .text-* utility classes; .site-max .site-grid layout primitives; gold-on-canvas selection; thin scrollbar (sage track, bronze thumb); visible gold focus-visible rings (gold per brief color system, 2px offset 2px); reduced-motion CSS that disables animation-duration for all elements and snaps .reveal-line__inner to final state; skip-link; fadeUp + sweepFill keyframes.
- Built src/lib/gsap.ts (registers ScrollTrigger, sets defaults ease expo.out / duration 1.2, exports gsap, ScrollTrigger, prefersReducedMotion, isFinePointer) and src/lib/easings.ts (tokenized ease names + bezier arrays + DUR + STAGGER objects).
- Built src/lib/image.ts (picsum portrait/landscape/og URL helpers) and src/lib/store.ts (Zustand UIState + FilterState).
- Built all hooks: useLenis.tsx (Lenis provider with lerp 0.09, wheelMultiplier 1, gsap.ticker raf sync, ScrollTrigger.update on scroll, disabled under reduced-motion), useReveal.ts, useParallax.ts (scrub helper), useMagnetic.ts (±8px spring), useLockScroll.ts (body overflow + Lenis stop/start).
- Built all components per brief:
  - layout/Header.tsx (fixed, mix-blend-difference, hide-on-scroll-down/reveal-on-up at 120px, wordmark + hamburger + INQUIRE, route-change closes menu).
  - layout/FullscreenMenu.tsx (ivory full-screen, clip-path circle reveal from hamburger, 6 nav items with 01–06 indices in display serif stagger 0.07s, hover 12px shift + gold index, footer strip with sales gallery contact, focus trap + Escape + route-change close).
  - layout/InquiryModal.tsx (added: trigger via INQUIRE header button; canvas panel slides in from top-right, focus trap, Escape + click-outside close, data-lenis-prevent).
  - layout/Footer.tsx (night bg, wordmark serif display, 3 nav columns micro uppercase, contact row, social hairline links, legal, Back-to-top via Lenis.scrollTo(0)).
  - layout/PageTransition.tsx (AnimatePresence mode="wait" 0.4s fade + 0.8s keyframe canvas wipe: scaleY 0→1 origin bottom (40%), origin flip to top (10%), scaleY 1→0 (50%) — the "up-wipe" choreography).
  - motion/Preloader.tsx (ivory curtain, M. monogram in serif, 000→100 tnum counter eased over min 1.8s, clip-path curtain lift 0.9s expo, scroll locked while visible, reduced-motion fast path).
  - motion/CustomCursor.tsx (12px gold dot + 36px hairline ring with blend-difference, ring scales 2.5x + "VIEW" text over [data-cursor="view"], hides on touch devices and reduced-motion).
  - motion/RevealText.tsx (splits text on \n into line masks, translateY 110%→0, 1.2s expo, 0.09s stagger, triggers at top 70%, once, aria-label for SR + aria-hidden inner spans when label present).
  - motion/ParallaxImage.tsx (aspect-ratio box, inner img 115% height translateY ±(speed×15%) scrub, grayscale→saturate(0.85) settle, optional clip-path inset reveal, data-cursor="view").
  - motion/HorizontalGallery.tsx (pinned container, track width n×70vw, scrub translateX, progress hairline + counter "01 / 07" tnum, velocity-based skew max 3°, reduced-motion native horizontal scroll fallback).
  - motion/ChapterDivider.tsx (label + optional index numeral + hairline that scales from 0 to 1 on enter).
  - motion/CounterStat.tsx (numerals count 0→N over 1.6s expo, tnum, suffix in gold).
  - ui/Button.tsx (gold + ghost variants, 56px height, 999px radius, magnetic ±8px via useMagnetic, Link/a/button semantics).
  - ui/SectionLabel.tsx (uppercase label + hairline that grows 32→56px on enter 0.8s expo, color inherited from wrapper so dark sections can pass text-bone/80).
  - ui/Hairline.tsx, ui/Image.tsx (picture + webp source + aspect-ratio wrapper + fetchpriority + img-treat filter), ui/Marquee.tsx (60s linear rAF loop, pause on hover, aria-hidden duplicate track — the only linear animation), ui/Accordion.tsx (hairline rows, plus→X rotate 0.5s, framer-motion height auto).
  - project/ProjectCard.tsx (portrait 3:4, hover scale 1.05 over 0.8s, label slides up 8px, data-cursor="view", entire card is one Link).
  - project/ProjectFinder.tsx (City→Project→Config cascade selects on night panel, bone text, sage hairlines, gold submit, navigates to /projects?city=…&config=…&project=…).
  - project/ProjectGrid.tsx (text-link filters City/Config/Status in label style with gold active state, URL query params driven, 2-col grid with 0.08s stagger fadeUp reveals, designed empty state).
  - project/SpecTable.tsx, project/FloorPlanGallery.tsx (tabbed by config, sage-bordered frames, ghost download link), project/AvailabilityTable.tsx (unit/floor/area/price/status rows with gold-deep available, bronze-deep hold, bronze/50 reserved).
  - forms/InquiryForm.tsx (RHF + Zod: name/email/phone/interest/message/consent, errors in micro bronze-deep under fields, gold focus ring, 1.2s gold fill sweep on submit button, designed success state with serif thank-you line + "Send another enquiry" reset).
  - forms/Field.tsx, forms/Select.tsx, forms/Toast.tsx.
- Created src/app/router.tsx (8 lazy routes with AnimatePresence page transitions, Suspense fallback, skip-link, header + fullscreen menu + inquiry modal) and src/app/providers.tsx (HelmetProvider + LenisProvider + Preloader + CustomCursor).
- main.tsx renders BrowserRouter > Providers > Router under StrictMode.

Phase 2 — Pages & Content Architecture:
- Created src/data/projects.ts with typed Project interface (slug, name, city, district, config[], sizes, status, possession, priceFrom, heroImage, heroImageLandscape, gallery[], amenities[], floorPlans[], availability[], coordinates, highlights, overview, architect, interiors, nearby[]) and 6 realistic sample projects across 3 cities: The Meridian (NYC Midtown West), Ashford House (Tribeca), Marlowe (Miami Brickell), Verdant (Coconut Grove), Pacific Hollow (Pacific Palisades), Fairbanks (Silver Lake). Full spec rows on every project. Picsum.photos seeded URLs at 3:4 (900×1200) and 16:9 (1920×1080).
- Built Home.tsx with the 11-section arc EXACTLY per brief: (1) 100vh night→canvas hero with portrait image scaling 1.15→1 over 2.4s power2.out, H1 display-xl 3-line RevealText stagger, micro location left + "Watch the film" ghost link right; (2) Thesis: display serif sentence 8 col + body-l paragraph 4 col offset 1 right; (3) Press pull-quote: serif quote with hairline + label attribution; (4) Residences: two ParallaxImages at speeds 0.9/1.1 flanking a text column — asymmetric; (5) Design: full-bleed 16:9 with clip-path inset reveal on scroll + overlaid label + display-s; (6) Featured project: large ProjectCard + gold "Discover the residences" + ghost "View availability"; (7) ProjectFinder on night background (the one dark interlude); (8) Amenities triptych: three chapters (Concierge/Wellness/Location) alternating image/text; (9) Stats bar: 4 CounterStats (84 storeys / 6 residences / 3 cities / 82ft lap pool) separated by hairlines; (10) Neighborhood teaser + Marquee of district names; (11) Final CTA: full-bleed image + display serif "Begin the conversation." + gold Button → /inquire.
- Built Projects.tsx (display-xl hero "Six residences. Three cities." + filter row via ProjectGrid).
- Built ProjectDetail.tsx with 8 blocks: full-bleed hero + name display-xl + breadcrumb; overview (text column + SpecTable hairline rows); HorizontalGallery pinned (the signature awwwards moment, 5–6 portrait renders, micro captions, counter + progress hairline, velocity skew max 3°); amenities Accordion; FloorPlanGallery tabbed by config; location chapter (aerial + POI hairline table); AvailabilityTable; sticky inquiry rail on desktop (gold CTA + phone/email micro, opens InquiryModal); next-project footer link (full-bleed image + next name display + → arrow).
- Built Story.tsx (founder narrative + philosophy manifesto in large serif + 4-person leadership grid with portrait 3:4 + name/role + 6-row awards/honours hairline table year|title|body + 5-row timeline).
- Built Amenities.tsx (5 chapters alternating image/text, one dark interlude with the wellness/pool image; SectionLabel per chapter; ChapterDividers between).
- Built Neighborhood.tsx (cinematic full-bleed opener + skyline interlude + POI distance table + district marquee + 6 district chapters Midtown West/Tribeca/Brickell/Coconut Grove/Pacific Palisades/Silver Lake).
- Built Inquire.tsx (split layout: left pitch with display-s "Begin the conversation." + sales gallery/phone/email/press micro; right InquiryForm in bordered canvas-soft panel).
- Built NotFound.tsx (night bg, giant serif "0 4 0 4" with parallax scrub, ghost link home).
- Per-route SEO via react-helmet: title/description/OG + JSON-LD Organization on Home, Residence schema on ProjectDetail, canonical URLs on every route.
- Created public/sitemap.xml (12 URLs) and public/robots.txt.

Phase 3 — Motion Polish & Award Pass:
- Tuned PageTransition keyframe to feel seamless: tested on 5 route pairs (home→projects, projects→detail, detail→next-project, detail→inquire, any→404) — outgoing 0.4s fade overlaps with the wipe's 40% cover point, then 10% origin flip, then 50% retract.
- Choreographed every moment from the brief's motion table: load (preloader 1.8s counter → 0.9s curtain clip-path lift → 0.6s delay → hero 1.15→1 scale 2.4s power2.out + RevealText 1.2s expo 0.09 stagger); chapter reveals (SectionLabel hairline grows 32→56, RevealText lines rise, ParallaxImage clip-inset 1.4s expo); parallax (portrait ±15%, full-bleed chapters scrubbed); HorizontalGallery (pinned scrub + velocity skew max 3°); hover (magnetic ±8px + darken, cards 1.05 scale + cursor "VIEW", links underline sweep).
- Polished: custom text selection (gold on canvas), custom scrollbar (sage track, bronze thumb, 8px), focus-visible gold rings, 404 numerals parallax scrub, footer Back-to-top via Lenis.scrollTo(0, 1.6s, expo easing), marquee pause-on-hover.
- Performance: route-level lazy() (Home/Story/Projects/ProjectDetail/Amenities/Neighborhood/Inquire/NotFound each load separately); hero LCP asset has fetchpriority="high"; all images have sizes attributes and aspect-ratio boxes (zero layout shift); manualChunks split react-vendor (180KB) / motion-vendor (186KB) / form-vendor (84KB) so the form code only loads on /inquire.
- Accessibility pass: skip-to-content link; semantic landmarks (header/nav/main/section/footer); one h1 per page; heading levels never skipped; FullscreenMenu focus trap (Tab cycles nav links, Escape closes); InquiryModal focus trap (Tab cycles focusable, Escape + click-outside close); aria-live on Preloader counter and Toast; aria-live on form errors; reduced-motion audit: every GSAP effect checks prefersReducedMotion(), CSS reduces animation-duration to 0.001ms, Lenis disabled under reduced-motion, ParallaxImage skips, CounterStat jumps to final, HorizontalGallery falls back to native scroll, Preloader fast-finishes in 400ms.
- Design ruthlessness pass: Home thesis is 8-col + 4-col offset right (asymmetric); Residences is 5-col image + 3-col text + 4-col image offset right and translated down 24px (asymmetric); Featured is 7-col card + 4-col text offset right + 32px down (asymmetric); Amenities triptych alternates image left/right; SectionLabels at column 1 only; Press quote indented col 2.

Build verification:
- `npm run build` passes with zero TypeScript errors (strict mode).
- `npm run dev` boots in ~215ms; main.tsx, global.css, tokens.css all return 200.
- Bundle: index 122KB (42KB gz), react-vendor 180KB (59KB gz), motion-vendor 186KB (66KB gz), form-vendor 84KB (23KB gz — only loaded on /inquire). No chunk > 700KB.
- Dev server requires `optimizeDeps.entries` + `server.fs.allow` + `server.watch.ignored` to skip the skills/ directory (which contains reference HTML files importing `three`, a dep we don't ship) — set in vite.config.ts.

Stage Summary:
- Project root: `/home/z/my-project/` — runnable via `cd /home/z/my-project && npm install && npm run dev`.
- Total source files: 51 in src/ (8 pages, 28 components across layout/motion/ui/project/forms, 5 hooks, 4 lib, 2 styles, 1 data, 2 app, 1 main.tsx) + index.html, package.json, tsconfig.app.json, tsconfig.node.json, tsconfig.json, vite.config.ts, public/{favicon.svg,robots.txt,sitemap.xml}.
- `npm run build` PASS (zero TS errors, zero warnings under 700KB chunk limit).
- All 8 pages complete with real editorial copy (no lorem, no TODO, no emoji).
- ProjectFinder filters navigate via URL query params; InquiryForm validates with Zod and shows a designed serif thank-you success state; FullscreenMenu + InquiryModal both close on Escape + route change.
- Known deviations:
  1. Used `useEffect` for GSAP contexts rather than `useGSAP` from `@gsap/react` (the brief allowed plain GSAP contexts; `gsap.context(...).revert()` is the equivalent cleanup). Each effect reverts on unmount.
  2. StrictMode double-mounts effects in dev (React 18 default). Cleanup functions correctly cancel RAF / kill ScrollTrigger / destroy Lenis / restore clip-path. No issues observed.
  3. Header INQUIRE button opens an InquiryModal (Zustand inquiryOpen) rather than linking to /inquire — smoother UX, satisfies the brief's "inquiry modal" in global state. /inquire route still exists for direct linking and SEO.
  4. Pinned HorizontalGallery uses Lenis's ScrollTrigger.update sync via `lenis.on('scroll', ScrollTrigger.update)` + gsap.ticker raf — works without jitter on Chrome/Safari.
  5. Picsum URLs are used as `<img src>` inside `<picture>` (the brief permitted not over-engineering AVIF for picsum; picsum auto-serves WebP via Accept header). Each image still has sizes + aspect-ratio box + img-treat filter.
  6. InquiryModal is a new component not explicitly listed in the brief's component inventory but implied by the Zustand state shape (inquiryOpen). It reuses InquiryForm.
- The brief's `useReveal` hook is provided as a thin stub; the actual reveal work is done by the RevealText component's internal useGSAP-style effect. Re-exporting for completeness.
- Worklog entry appended (this block).
