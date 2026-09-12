#!/usr/bin/env python3
"""Shorten text density across the site — replace long paragraphs with
shorter, image-led copy. Add more imagery where it makes sense."""

from pathlib import Path
import re

ROOT = Path('/home/z/my-project')

# Each tuple: (file, old_string, new_string)
EDITS = [
    # ===== Home.tsx =====
    ('src/pages/Home.tsx',
     '''          <p className="text-body-l text-bronze font-light">
            An 8-story boutique condominium designed by MKDA with interiors and
            curated amenities by AvroKO — the team behind 1 Hotel Central Park.
            Studio, one-bedroom, and two-bedroom residences, 400 to 844 square
            feet, offered as a boutique condominium program for residential.
          </p>''',
     '''          <p className="text-body-l text-bronze font-light">
            Designed by MKDA. Interiors by AvroKO.
            Studio, one-, and two-bedroom residences from 400 sq ft.
          </p>'''),

    ('src/pages/Home.tsx',
     '''          <p className="mt-6 text-body text-bronze">
            Three configurations — studio, one-bedroom, and two-bedroom — each
            with 9-foot ceilings, fully furnished, and operated as a
            boutique condominium for residential.
          </p>''',
     '''          <p className="mt-6 text-body text-bronze">
            Studio, one-, and two-bedroom.
            9-foot ceilings throughout.
          </p>'''),

    ('src/pages/Home.tsx',
     '''          <p className="text-body-l text-bronze">
            Expaan opens in Q1 2027 with studio, one-bedroom, and
            two-bedroom residences from $495,000. Pre-construction sales by
            appointment through the sales gallery in Expaan.
          </p>''',
     '''          <p className="text-body-l text-bronze">
            Pre-construction. From $495,000.
            Possession Q1 2027.
          </p>'''),

    # Shorten amenity chapter bodies
    ('src/pages/Home.tsx',
     "body: 'A planted, walk-through arrival sequence from NW 28th Street sets the building apart from the Expaan streetscape and establishes a quiet transition into the gallery lobby.',",
     "body: 'A planted arrival sequence from NW 28th Street.',"),

    ('src/pages/Home.tsx',
     "body: 'A members-only wellness club featuring a mineral pool, cold plunge, steam room, and sauna. The signature amenity of the property, available to residents and residents.',",
     "body: 'Mineral pool, cold plunge, steam, and sauna.',"),

    ('src/pages/Home.tsx',
     "body: 'A residents-only meeting gallery, private Zoom rooms, and a conference room with teleconferencing capabilities, plus building-wide high-speed Wi-Fi and dedicated printing facilities.',",
     "body: 'Private Zoom rooms, conference room, building-wide Wi-Fi.',"),
]

stats = {'applied': 0, 'failed': []}
for rel, old, new in EDITS:
    p = ROOT / rel
    if not p.exists():
        stats['failed'].append(f'MISSING: {rel}')
        continue
    content = p.read_text()
    if old not in content:
        stats['failed'].append(f'NOT FOUND in {rel}: {old[:80]}...')
        continue
    content = content.replace(old, new)
    p.write_text(content)
    stats['applied'] += 1
    print(f'  ✓ {rel}')

print(f"\nApplied: {stats['applied']}, Failed: {len(stats['failed'])}")
for f in stats['failed']:
    print(f'  ✗ {f}')
