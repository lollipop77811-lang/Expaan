#!/bin/bash
# Generate all real estate images sequentially with delays to avoid rate limits.
# Runs in background; writes progress to /tmp/img-progress.log

OUT=/home/z/my-project/public/realestate
LOG=/tmp/img-progress.log
mkdir -p "$OUT"
echo "START $(date)" > "$LOG"

gen() {
  local name="$1"; local size="$2"; local prompt="$3"
  if [ -f "$OUT/$name.png" ] && [ -s "$OUT/$name.png" ]; then
    echo "  ✓ $name (cached)" >> "$LOG"
    return 0
  fi
  echo "  ⏳ $name ..." >> "$LOG"
  if timeout 240 z-ai image -p "$prompt" -o "$OUT/$name.png" -s "$size" > /dev/null 2>&1; then
    if [ -f "$OUT/$name.png" ] && [ -s "$OUT/$name.png" ]; then
      echo "  ✓ $name done" >> "$LOG"
    else
      echo "  ✗ $name (no file)" >> "$LOG"
    fi
  else
    echo "  ✗ $name (timeout)" >> "$LOG"
  fi
  sleep 8
}

# === PORTRAITS (864x1152) ===
P=864x1152
L=1344x768

gen "expaan-1" "$P" "Modern 8-story apartment building facade with glass balconies, Miami architectural style, blue sky, daytime, professional real estate photography"
gen "expaan-4" "$P" "Modern one-bedroom apartment interior with open kitchen and bedroom, contemporary Miami design, large windows, professional real estate photography"
gen "expaan-5" "$P" "Modern two-bedroom apartment interior with living room and city view, luxury Miami condo, contemporary furniture, professional interior photography"
gen "expaan-6" "$P" "Luxury wellness spa interior with mineral pool, cold plunge, steam room, and sauna, warm wood finishes, ambient lighting, professional interior photography"
gen "expaan-7" "$P" "Rooftop terrace with lounge seating, planted greenery, and Miami skyline view at sunset, luxury condo amenities, professional photography"
gen "expaan-philosophy" "$P" "Architectural detail of luxury apartment interior, warm wood paneling and stone finishes, close-up, professional interior photography"

# Amenities (3 new — amen-2,3,6 reuse gallery)
gen "amen-1" "$P" "Landscaped walkway entrance to modern luxury apartment building, planted greenery, water feature, Miami dusk, professional photography"
gen "amen-4" "$P" "Modern meeting room with conference table, video conferencing screen, and chairs in luxury apartment building, professional interior photography"
gen "amen-5" "$P" "Windowed fitness center with cardio and strength equipment, natural light, Miami view through floor-to-ceiling windows, professional photography"

# Projects page cards (3)
gen "expaan-studio" "$P" "Modern furnished studio apartment, compact luxury interior with Murphy bed and desk, Miami design, professional real estate photography"
gen "expaan-1br" "$P" "Modern one-bedroom apartment with kitchen island and bedroom nook, Miami luxury condo interior, professional photography"
gen "expaan-2br" "$P" "Modern two-bedroom apartment living room with sofa and city view through floor-to-ceiling windows, Miami luxury condo"

# Story leader portraits (4)
gen "leader-1" "$P" "Corporate professional portrait of male real estate developer in business attire, neutral background, professional headshot"
gen "leader-2" "$P" "Corporate professional portrait of female finance executive in business attire, neutral background, professional headshot"
gen "leader-3" "$P" "Corporate professional portrait of male luxury hospitality executive in business attire, neutral background, professional headshot"
gen "leader-4" "$P" "Corporate professional portrait of male architect in business attire, neutral background, professional headshot"

# Floor plans (3) — architectural diagrams
gen "fp-expaan-studio" "$P" "Minimalist architectural floor plan diagram of studio apartment, technical drawing with labeled rooms, black and white line drawing"
gen "fp-expaan-1br" "$P" "Minimalist architectural floor plan diagram of one-bedroom apartment, technical drawing with labeled rooms, black and white line drawing"
gen "fp-expaan-2br" "$P" "Minimalist architectural floor plan diagram of two-bedroom apartment, technical drawing with labeled rooms, black and white line drawing"

# === LANDSCAPES (1344x768) ===
gen "expaan-wide" "$L" "Aerial view of Miami skyline at golden hour with modern luxury condo buildings, palm trees, Biscayne Bay, professional real estate photography"
gen "district-expaan" "$L" "Aerial view of Wynwood Miami neighborhood with colorful street art murals on buildings, vibrant arts district, professional photography"
gen "district-design" "$L" "Miami Design District luxury retail street with modern showrooms, palm trees, designer boutiques, professional photography"
gen "district-midtown" "$L" "Aerial view of Midtown Miami with mid-rise residential buildings, retail, restaurants, urban neighborhood, professional photography"
gen "district-brickell" "$L" "Aerial view of Brickell Miami financial district skyline with high-rise office towers and residential condos, professional photography"
gen "district-downtown" "$L" "Aerial view of Downtown Miami with skyscrapers, Bayfront Park, and waterfront, professional real estate photography"
gen "district-beach" "$L" "Aerial view of Miami South Beach with ocean, palm trees, art deco buildings, and sandy beach at sunset, professional photography"

echo "DONE $(date)" >> "$LOG"
echo "Total files: $(ls $OUT/*.png 2>/dev/null | wc -l)" >> "$LOG"
