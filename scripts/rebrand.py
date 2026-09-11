#!/usr/bin/env python3
"""Rebrand DUOS Wynwood → Expaan across the codebase."""
import re
from pathlib import Path

# Ordered replacements (longest first to avoid partial hits)
REPLACEMENTS = [
    # Brand name variants
    ('DUOS Wynwood', 'Expaan'),
    ('duoswynwood.com', 'expaan.com'),
    ('duos-wynwood', 'expaan'),           # slug in URLs
    ('Duos Wynwood', 'Expaan'),           # alt case
    ('Wynwood', 'Expaan'),                # standalone Wynwood → Expaan
    ('wynwood', 'expaan'),                # lowercase (e.g., seed slugs)
    # Hotel/short-term-rental framing removed (real-estate site, not a hotel)
    ('hotel condominium', 'boutique condominium'),
    ('Hotel-condominium', 'Boutique condominium'),
    ('hotel-condominium', 'boutique condominium'),
    ('short-term-rental', 'residential'),
    ('short-term rental', 'residential'),
    ('short-term stays', 'residential living'),
    ('short-term-stay professionals', 'residents who work from home'),
    ('operated as a hotel', 'operated as a residential building'),
    ('hotel-grade ', 'residential-grade '),
    ('hotel guests', 'residents'),
]

# Files to process
TARGETS = [
    'src/components/layout/Header.tsx',
    'src/components/layout/Footer.tsx',
    'src/components/layout/FullscreenMenu.tsx',
    'src/components/motion/Preloader.tsx',
    'src/components/project/ProjectFinder.tsx',
    'src/components/forms/InquiryForm.tsx',
    'src/pages/Home.tsx',
    'src/pages/Story.tsx',
    'src/pages/Projects.tsx',
    'src/pages/ProjectDetail.tsx',
    'src/pages/Amenities.tsx',
    'src/pages/Neighborhood.tsx',
    'src/pages/Inquire.tsx',
    'src/pages/NotFound.tsx',
    'index.html',
    'public/sitemap.xml',
    'public/robots.txt',
]

root = Path('/home/z/my-project')
changed = []
for rel in TARGETS:
    p = root / rel
    if not p.exists():
        print(f'MISSING: {rel}')
        continue
    orig = p.read_text()
    new = orig
    for old, repl in REPLACEMENTS:
        new = new.replace(old, repl)
    if new != orig:
        p.write_text(new)
        # count replacements
        diffs = sum(1 for o, r in REPLACEMENTS if o in orig)
        changed.append((rel, diffs))
        print(f'  UPDATED: {rel} ({diffs} patterns matched)')
    else:
        print(f'  no-op:  {rel}')

print(f'\n{len(changed)} files updated')
