#!/usr/bin/env python3
"""Fix remaining text shortening with correct strings."""

from pathlib import Path

ROOT = Path('/home/z/my-project')

EDITS = [
    # Story timeline 2027
    ('src/pages/Story.tsx',
     "  { year: '2027', body: 'Expaan opens — 49 fully furnished residential residences, The Grotto wellness club, and a rooftop amenities terrace.' },",
     "  { year: '2027', body: 'Expaan opens — 49 residences, The Grotto, rooftop terrace.' },"),

    # Amenities Grotto body
    ('src/pages/Amenities.tsx',
     "body: `A members-only wellness club featuring a mineral pool, cold plunge, steam room, and sauna. The signature amenity of the property, available to residents and residents — the design move that sets Expaan apart from other Expaan buildings.`",
     "body: `Mineral pool, cold plunge, steam, and sauna. The signature amenity.`"),

    # Amenities meeting gallery body
    ('src/pages/Amenities.tsx',
     "body: `A residents-only meeting gallery, private Zoom rooms, and a conference room with teleconferencing capabilities. Designed for residents who work from home and remote work — no need to leave the building for a call or a meeting.`",
     "body: `Private Zoom rooms and a conference room. Work without leaving the building.`"),

    # Neighborhood beach body
    ('src/pages/Neighborhood.tsx',
     "body: `Twenty minutes east across the MacArthur Causeway. South Beach, Mid-Beach, and the Bass Museum — Miami Beach is the city's primary visitor destination and a short ride from Expaan.`",
     "body: `Twenty minutes east. South Beach, Mid-Beach, Bass Museum.`"),

    # ProjectDetail POI intro
    ('src/pages/ProjectDetail.tsx',
     '''          <p className="text-body text-bronze">
            The neighbourhood, by foot. Distances are door-to-door from
            335 NW 28th Street.
          </p>''',
     '''          <p className="text-body text-bronze">
            The neighbourhood, by foot.
          </p>'''),

    # ProjectDetail overview
    ('src/pages/ProjectDetail.tsx',
     "overview: 'Expaan is an 8-story boutique condominium at 335 NW 28th Street in the heart of Expaan, Miami. The property comprises 49 fully finished residences — studio, one-bedroom, and two-bedroom — designed by MKDA with interiors and curated amenities by AvroKO, the team behind 1 Hotel Central Park in New York. Residents have access to The Grotto, a private wellness club with a mineral pool, cold plunge, steam room, and sauna.',",
     "overview: 'Expaan is an 8-story boutique condominium at 335 NW 28th Street, Expaan, Miami. 49 residences by MKDA and AvroKO, with The Grotto wellness club.',"),
]

stats = {'applied': 0, 'failed': []}
for rel, old, new in EDITS:
    p = ROOT / rel
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
