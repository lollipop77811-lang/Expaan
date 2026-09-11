#!/usr/bin/env python3
"""Demo cleanup pass:
1. Remove all <Helmet>...</Helmet> blocks from page files
2. Remove `import { Helmet } from 'react-helmet-async'` lines
3. Remove `img-treat ` from all className strings (keep the rest of the className)
4. Rename `duos` → `expaan` (variable names, image seeds, image filenames)
   - Word-boundary aware so it doesn't rename inside other identifiers
5. Remove `prefers-reduced-motion` GSAP reduced-motion CSS rule
"""
import re
from pathlib import Path

ROOT = Path('/home/z/my-project')

PAGE_FILES = [
    'src/pages/Home.tsx',
    'src/pages/Story.tsx',
    'src/pages/Projects.tsx',
    'src/pages/ProjectDetail.tsx',
    'src/pages/Amenities.tsx',
    'src/pages/Neighborhood.tsx',
    'src/pages/Inquire.tsx',
    'src/pages/NotFound.tsx',
]

COMPONENT_FILES = [
    'src/components/ui/Image.tsx',
    'src/components/ui/Button.tsx',
    'src/components/ui/Marquee.tsx',
    'src/components/ui/Accordion.tsx',
    'src/components/ui/Hairline.tsx',
    'src/components/ui/SectionLabel.tsx',
    'src/components/motion/RevealText.tsx',
    'src/components/motion/ParallaxImage.tsx',
    'src/components/motion/HorizontalGallery.tsx',
    'src/components/motion/CounterStat.tsx',
    'src/components/motion/ChapterDivider.tsx',
    'src/components/motion/Preloader.tsx',
    'src/components/motion/CustomCursor.tsx',
    'src/components/layout/Header.tsx',
    'src/components/layout/Footer.tsx',
    'src/components/layout/FullscreenMenu.tsx',
    'src/components/layout/InquiryModal.tsx',
    'src/components/layout/PageTransition.tsx',
    'src/components/project/ProjectCard.tsx',
    'src/components/project/ProjectFinder.tsx',
    'src/components/project/ProjectGrid.tsx',
    'src/components/project/SpecTable.tsx',
    'src/components/project/FloorPlanGallery.tsx',
    'src/components/project/AvailabilityTable.tsx',
    'src/components/forms/InquiryForm.tsx',
    'src/components/forms/Field.tsx',
    'src/components/forms/Select.tsx',
    'src/components/forms/Toast.tsx',
]

ALL_FILES = PAGE_FILES + COMPONENT_FILES + [
    'src/app/providers.tsx',
    'src/app/router.tsx',
    'src/data/projects.ts',
    'src/lib/store.ts',
    'src/lib/image.ts',
    'src/main.tsx',
]

def remove_helmet_blocks(text: str) -> str:
    """Remove <Helmet>...</Helmet> blocks (and the closing tag with whitespace)."""
    # Match <Helmet>...</Helmet> including multiline content + the optional trailing newline
    pattern = re.compile(
        r'\s*<Helmet>.*?</Helmet>\s*\n?',
        flags=re.DOTALL,
    )
    return pattern.sub('\n', text)

def remove_helmet_import(text: str) -> str:
    text = re.sub(r'^import\s*\{[^}]*Helmet[^}]*\}\s*from\s*[\'"]react-helmet-async[\'"]\s*\n', '', text, flags=re.MULTILINE)
    return text

def remove_img_treat(text: str) -> str:
    """Remove `img-treat ` (with trailing space) from className strings.
    Also remove ` img-treat` (with leading space) if it ends a className.
    Also remove standalone `img-treat` if alone.
    """
    # Remove "img-treat " (with trailing space, typically mid className)
    text = text.replace('img-treat ', '')
    # Remove " img-treat" (with leading space, end of className)
    text = text.replace(' img-treat', '')
    # Remove standalone "img-treat" (alone in className)
    text = text.replace('img-treat', '')
    return text

def rename_duos_to_expaan(text: str) -> str:
    """Word-boundary aware replacement of `duos` → `expaan`.
    Handles: variable names, image seeds ('duos-studio' → 'expaan-studio'),
    image filenames ('duos-hero' → 'expaan-hero')."""
    # Match `duos` as a whole word OR followed by `-` (image seed) OR `_`
    # NOT inside other identifiers like 'duoswynwood' (which we already cleaned)
    text = re.sub(r'\bduos\b', 'expaan', text, flags=re.IGNORECASE)
    # Also handle 'duos-' (image seed prefix) — the regex above already covers
    # 'duos-studio' because \b matches between 'duos' and '-'.
    return text

def remove_gsap_imports(text: str) -> str:
    """Remove gsap-related imports from ../../lib/gsap."""
    text = re.sub(
        r'^import\s*\{[^}]*\}\s*from\s*[\'"][^"\']*lib/gsap[\'"]\s*\n',
        '',
        text,
        flags=re.MULTILINE,
    )
    return text

stats = {'helmet_removed': 0, 'helmet_import_removed': 0, 'img_treat_removed': 0,
         'duos_renamed': 0, 'gsap_import_removed': 0, 'files_changed': 0}

for rel in ALL_FILES:
    p = ROOT / rel
    if not p.exists():
        print(f'MISSING: {rel}')
        continue
    orig = p.read_text()
    new = orig

    # 1. Remove <Helmet> blocks (only in page files + components that might have them)
    new_no_helmet = remove_helmet_blocks(new)
    if new_no_helmet != new:
        stats['helmet_removed'] += 1
        new = new_no_helmet

    # 2. Remove Helmet imports
    new_no_helmet_imp = remove_helmet_import(new)
    if new_no_helmet_imp != new:
        stats['helmet_import_removed'] += 1
        new = new_no_helmet_imp

    # 3. Remove img-treat class usage
    new_no_img = remove_img_treat(new)
    if new_no_img != new:
        stats['img_treat_removed'] += 1
        new = new_no_img

    # 4. Rename duos → expaan
    new_renamed = rename_duos_to_expaan(new)
    if new_renamed != new:
        stats['duos_renamed'] += 1
        new = new_renamed

    # 5. Remove gsap imports (we'll handle the gsap.ts file separately)
    new_no_gsap = remove_gsap_imports(new)
    if new_no_gsap != new:
        stats['gsap_import_removed'] += 1
        new = new_no_gsap

    if new != orig:
        p.write_text(new)
        stats['files_changed'] += 1
        print(f'  UPDATED: {rel}')

print(f'\nStats: {stats}')
