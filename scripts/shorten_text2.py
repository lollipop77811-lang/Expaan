#!/usr/bin/env python3
"""Shorten text across Story, Amenities, Neighborhood, ProjectDetail, Inquire."""

from pathlib import Path

ROOT = Path('/home/z/my-project')

EDITS = [
    # ===== Story.tsx — founder narrative, philosophy =====
    ('src/pages/Story.tsx',
     '''          <p className="text-body-l text-bronze font-light">
            Hugo Lindqvist began as a restorer of older buildings — townhouses,
            warehouses, the patient kind of architecture that asks the same
            questions decade after decade.
          </p>
          <p className="text-body text-bronze">
            The Meridian carries that patience forward. Each residence is drawn
            once, built once, and addressed to a small number of owners. There
            are six, today, across three American cities.
          </p>
          <p className="text-body text-bronze">
            “We design for the people who will live in these buildings in
            fifty years,” says Hugo. “Not for the press release in three
            months.”
          </p>''',
     '''          <p className="text-body-l text-bronze font-light">
            A studio of restorers and patient architects.
            Each residence drawn once, built once.
          </p>'''),

    ('src/pages/Story.tsx',
     '''            text={'We believe in 400 to 844 square feet,\\ndrawn once and built once.\\nWe believe in 9-foot ceilings,\\nfurnished residences, and a building\\nthat operates as a hotel.\\nWe believe in materials drawn from\\nthe city they sit in. We believe in\\nfinishes that age well, not finishes\\nthat photograph well.'}''',
     '''            text={'We believe in 400 to 844 square feet,\\ndrawn once and built once.\\nWe believe in 9-foot ceilings,\\nand finishes that age well.'}'''),

    # Story design team notes
    ('src/pages/Story.tsx',
     "  { firm: 'MKDA', role: 'Architecture', note: 'Internationally recognized architecture firm leading the building design and floor plans.' },",
     "  { firm: 'MKDA', role: 'Architecture', note: 'Building design and floor plans.' },"),

    ('src/pages/Story.tsx',
     "  { firm: 'AvroKO', role: 'Interiors & curated amenities', note: 'The interior design team behind 1 Hotel Central Park in New York — responsible for the gallery lobby, The Grotto, and resident lounges.' },",
     "  { firm: 'AvroKO', role: 'Interiors & curated amenities', note: 'Gallery lobby, The Grotto, resident lounges.' },"),

    # Story timeline — shorten each entry
    ('src/pages/Story.tsx',
     "  { year: '2025', body: 'Wave Group Development, Vitrium Capital, and Zambala Luxury Apartments assemble the site at 335 NW 28th Street in the heart of Expaan.' },",
     "  { year: '2025', body: 'Site assembled at 335 NW 28th Street, Expaan.' },"),

    ('src/pages/Story.tsx',
     "  { year: '2026', body: 'MKDA engaged as architect. AvroKO — the team behind 1 Hotel Central Park — appointed to lead interiors and curated amenities.' },",
     "  { year: '2026', body: 'MKDA appointed as architect. AvroKO leads interiors.' },"),

    ('src/pages/Story.tsx',
     "  { year: '2026', body: 'Pre-construction sales open. Studio, one-bedroom, and two-bedroom residences from $495,000.' },",
     "  { year: '2026', body: 'Pre-construction sales open. From $495,000.' },"),

    ('src/pages/Story.tsx',
     "  { year: '2027', body: 'Expaan opens — 49 fully furnished short-term-rental residences, The Grotto wellness club, and a rooftop amenities terrace.' },",
     "  { year: '2027', body: 'Expaan opens — 49 residences, The Grotto, rooftop terrace.' },"),

    # ===== Amenities.tsx — chapter bodies =====
    ('src/pages/Amenities.tsx',
     "body: `A planted, walk-through arrival sequence from NW 28th Street sets the building apart from the Expaan streetscape and establishes a quiet transition into the gallery lobby — a hospitality-driven lobby with digital access control.`",
     "body: `A planted arrival sequence into a hospitality-driven lobby with digital access control.`"),

    ('src/pages/Amenities.tsx',
     "body: `A gallery lobby lounge with a dedicated coffee bar, curated by AvroKO as the social heart of the building. Residents and guests check in, settle in, and work from the lounge. Building-wide high-speed Wi-Fi and dedicated printing facilities available.`",
     "body: `A coffee bar and lounge, curated by AvroKO. The social heart of the building.`"),

    ('src/pages/Amenities.tsx',
     "body: `A members-only wellness club featuring a mineral pool, cold plunge, steam room, and sauna. The signature amenity of the property, available to residents and hotel guests — the design move that sets Expaan apart from other Expaan buildings.`",
     "body: `Mineral pool, cold plunge, steam, and sauna. The signature amenity.`"),

    ('src/pages/Amenities.tsx',
     "body: `A residents-only meeting gallery, private Zoom rooms, and a conference room with teleconferencing capabilities. Designed for short-term-stay professionals and remote work — no need to leave the building for a call or a meeting.`",
     "body: `Private Zoom rooms and a conference room. Work without leaving the building.`"),

    ('src/pages/Amenities.tsx',
     "body: `A natural-light fitness center with cardio and strength-training equipment, operated as a residents-only facility with extended hours. Open to natural light and views across the Expaan streetscape.`",
     "body: `Cardio and strength equipment. Natural light and Expaan views.`"),

    ('src/pages/Amenities.tsx',
     "body: `A rooftop terrace with planted surfaces, lounge seating, and views across Expaan and the Miami skyline. Bookable for resident events and operated as an extension of the gallery lobby and The Grotto.`",
     "body: `Planted surfaces, lounge seating, Miami skyline views. Bookable for events.`"),

    # ===== Neighborhood.tsx — district chapter bodies =====
    ('src/pages/Neighborhood.tsx',
     "body: `DUOS Expaan is in the heart of Expaan — within walking distance of Expaan Walls, the neighbourhood's iconic street art, galleries, restaurants, breweries, and nightlife venues along 2nd Avenue.`",
     "body: `Within walking distance of Expaan Walls, galleries, restaurants, and 2nd Avenue.`"),

    ('src/pages/Neighborhood.tsx',
     "body: `An eight-minute walk north. The Miami Design District is a neighbourhood of luxury retail, design showrooms, and galleries — the city's most concentrated district for furniture, fashion, and contemporary art.`",
     "body: `Eight minutes north. Luxury retail, design showrooms, contemporary art.`"),

    ('src/pages/Neighborhood.tsx',
     "body: `Five minutes east. Midtown Miami is a 56-block mixed-use district with retail, restaurants, and the Expaan-adjacent mid-rise residential community. A short walk or a 4-minute drive.`",
     "body: `Five minutes east. A 56-block mixed-use district of retail and residences.`"),

    ('src/pages/Neighborhood.tsx',
     "body: `Brickell is 10 minutes south by car. Miami's financial district and densest residential neighbourhood — home to Brickell City Centre, the corporate offices of Amazon, Citadel, Spotify, PwC, and Live Nation, and the future site of Miami's tallest towers.`",
     "body: `Ten minutes south. Miami's financial district. Home to Amazon, Citadel, Spotify, PwC, Live Nation.`"),

    ('src/pages/Neighborhood.tsx',
     "body: `Ten minutes south. Downtown Miami is the civic and commercial core — FTX Arena, Bayfront Park, the Perez Art Museum, and the Brightline MiamiCentral station with hourly service to West Palm Beach, Fort Lauderdale, Aventura, and Orlando.`",
     "body: `Ten minutes south. Civic core, Bayfront Park, Perez Art Museum, Brightline MiamiCentral.`"),

    ('src/pages/Neighborhood.tsx',
     "body: `Twenty minutes east across the MacArthur Causeway. South Beach, Mid-Beach, and the Bass Museum — Miami Beach is the city's primary visitor destination and a short ride from Expaan Expaan.`",
     "body: `Twenty minutes east across the MacArthur Causeway. South Beach, Mid-Beach, Bass Museum.`"),

    # Neighborhood skyline intro
    ('src/pages/Neighborhood.tsx',
     '''          <p className="text-body text-bronze">
            Distances are measured by foot, not by car. We build where the
            city works — Expaan, the Design District, Midtown, Brickell,
            Downtown, and the Beach.
          </p>''',
     '''          <p className="text-body text-bronze">
            Distances by foot, not by car.
          </p>'''),

    # ===== ProjectDetail.tsx — overview, POI intro =====
    ('src/pages/ProjectDetail.tsx',
     '          <p className="text-body text-bronze">\\n            The neighbourhood, by foot. Distances are door-to-door from\\n            335 NW 28th Street.\\n          </p>',
     '          <p className="text-body text-bronze">\\n            The neighbourhood, by foot.\\n          </p>'),

    # ===== Inquire.tsx — pitch paragraph =====
    ('src/pages/Inquire.tsx',
     '''          <p className="text-body-l text-bronze font-light max-w-md">
            A member of the sales gallery will respond within one working day.
            By appointment, seven days a week, in Expaan.
          </p>''',
     '''          <p className="text-body-l text-bronze font-light max-w-md">
            By appointment, seven days a week.
          </p>'''),
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
