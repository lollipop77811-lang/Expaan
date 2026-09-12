#!/bin/bash
# Generate real estate property images for the Expaan site.
# Saves to /home/z/my-project/public/realestate/*.png
# Generates ~25 images in parallel batches of 3 to avoid rate limits.

set -e
OUT=/home/z/my-project/public/realestate
mkdir -p "$OUT"

# Helper: generate one image
# Args: filename, size, prompt
gen() {
  local name="$1"; local size="$2"; local prompt="$3"
  if [ -f "$OUT/$name.png" ]; then
    echo "  ✓ $name.png (cached)"
    return 0
  fi
  echo "  ⏳ $name.png"
  if timeout 90 z-ai image -p "$prompt" -o "$OUT/$name.png" -s "$size" 2>&1 | tail -1 | grep -q "✅\|saved\|Image saved"; then
    return 0
  fi
  # Retry check
  if [ -f "$OUT/$name.png" ] && [ -s "$OUT/$name.png" ]; then
    echo "    ok"
    return 0
  fi
  echo "    ✗ FAILED: $name"
  return 1
}

# === PORTRAITS (864x1152 — 3:4) ===
PORTRAIT_SIZE=864x1152

echo "=== Generating hero portrait ==="
gen "expaan-hero" "$PORTRAIT_SIZE" \
  "Modern luxury 8-story boutique condominium building exterior in Miami at dusk, warm interior lighting, glass balconies, palm trees, architectural photography, professional real estate photo, high quality"

echo ""
echo "=== Generating gallery portraits (7) ==="
gen "expaan-1" "$PORTRAIT_SIZE" \
  "Modern 8-story apartment building facade with glass balconies, Miami architectural style, blue sky, daytime, professional real estate photography"
gen "expaan-2" "$PORTRAIT_SIZE" \
  "Luxury apartment lobby interior with gallery lounge seating and coffee bar, warm wood finishes, contemporary Miami design, professional interior photography"
gen "expaan-3" "$PORTRAIT_SIZE" \
  "Modern furnished studio apartment interior, 9-foot ceilings, large window with city view, contemporary furniture, Miami luxury condo"
gen "expaan-4" "$PORTRAIT_SIZE" \
  "Modern one-bedroom apartment interior with open kitchen and bedroom, contemporary Miami design, large windows, professional real estate photography"
gen "expaan-5" "$PORTRAIT_SIZE" \
  "Modern two-bedroom apartment interior with living room and city view, luxury Miami condo, contemporary furniture, professional interior photography"
gen "expaan-6" "$PORTRAIT_SIZE" \
  "Luxury wellness spa interior with mineral pool, cold plunge, steam room, and sauna, warm wood finishes, ambient lighting, professional interior photography"
gen "expaan-7" "$PORTRAIT_SIZE" \
  "Rooftop terrace with lounge seating, planted greenery, and Miami skyline view at sunset, luxury condo amenities, professional photography"

echo ""
echo "=== Generating Projects page card portraits (3) — different angles ==="
gen "expaan-studio" "$PORTRAIT_SIZE" \
  "Modern furnished studio apartment, compact luxury interior with Murphy bed and desk, Miami design, professional real estate photography"
gen "expaan-1br" "$PORTRAIT_SIZE" \
  "Modern one-bedroom apartment with kitchen island and bedroom nook, Miami luxury condo interior, professional photography"
gen "expaan-2br" "$PORTRAIT_SIZE" \
  "Modern two-bedroom apartment living room with sofa and city view through floor-to-ceiling windows, Miami luxury condo"

echo ""
echo "=== Generating Story philosophy + leader portraits (5) ==="
gen "expaan-philosophy" "$PORTRAIT_SIZE" \
  "Architectural detail of luxury apartment interior, warm wood paneling and stone finishes, close-up, professional interior photography"
gen "leader-1" "$PORTRAIT_SIZE" \
  "Corporate professional portrait of male real estate developer in business attire, neutral background, professional headshot"
gen "leader-2" "$PORTRAIT_SIZE" \
  "Corporate professional portrait of female finance executive in business attire, neutral background, professional headshot"
gen "leader-3" "$PORTRAIT_SIZE" \
  "Corporate professional portrait of male luxury hospitality executive in business attire, neutral background, professional headshot"
gen "leader-4" "$PORTRAIT_SIZE" \
  "Corporate professional portrait of male architect in business attire, neutral background, professional headshot"

echo ""
echo "=== Generating Amenities portraits (4 new — others reuse gallery) ==="
gen "amen-1" "$PORTRAIT_SIZE" \
  "Landscaped walkway entrance to modern luxury apartment building, planted greenery, water feature, Miami dusk, professional photography"
gen "amen-4" "$PORTRAIT_SIZE" \
  "Modern meeting room with conference table, video conferencing screen, and chairs in luxury apartment building, professional interior photography"
gen "amen-5" "$PORTRAIT_SIZE" \
  "Windowed fitness center with cardio and strength equipment, natural light, Miami view through floor-to-ceiling windows, professional photography"
gen "amen-2" "$PORTRAIT_SIZE" \
  "Gallery lobby lounge with coffee bar in modern luxury apartment building, warm wood finishes, professional interior photography"
gen "amen-3" "$PORTRAIT_SIZE" \
  "Luxury wellness club interior with mineral pool, cold plunge, steam room, sauna, warm lighting, professional photography"
gen "amen-6" "$PORTRAIT_SIZE" \
  "Rooftop terrace with planted surfaces, lounge seating, and Miami skyline view at sunset, professional photography"

echo ""
echo "=== Generating floor plans (3) ==="
gen "fp-expaan-studio" "$PORTRAIT_SIZE" \
  "Architectural floor plan diagram of studio apartment, 478 square feet, technical drawing with labeled rooms, minimalist style"
gen "fp-expaan-1br" "$PORTRAIT_SIZE" \
  "Architectural floor plan diagram of one-bedroom apartment, 612 square feet, technical drawing with labeled rooms, minimalist style"
gen "fp-expaan-2br" "$PORTRAIT_SIZE" \
  "Architectural floor plan diagram of two-bedroom apartment, 844 square feet, technical drawing with labeled rooms, minimalist style"

echo ""
echo "=== Generating landscapes (1344x768 — 16:9) ==="
LANDSCAPE_SIZE=1344x768

gen "expaan-wide" "$LANDSCAPE_SIZE" \
  "Aerial view of Miami skyline at golden hour with modern luxury condo buildings, palm trees, Biscayne Bay, professional real estate photography"

gen "district-expaan" "$LANDSCAPE_SIZE" \
  "Aerial view of Wynwood Miami neighborhood with colorful street art murals on buildings, vibrant arts district, professional photography"
gen "district-design" "$LANDSCAPE_SIZE" \
  "Miami Design District luxury retail street with modern showrooms, palm trees, designer boutiques, professional photography"
gen "district-midtown" "$LANDSCAPE_SIZE" \
  "Aerial view of Midtown Miami with mid-rise residential buildings, retail, restaurants, urban neighborhood, professional photography"
gen "district-brickell" "$LANDSCAPE_SIZE" \
  "Aerial view of Brickell Miami financial district skyline with high-rise office towers and residential condos, professional photography"
gen "district-downtown" "$LANDSCAPE_SIZE" \
  "Aerial view of Downtown Miami with skyscrapers, Bayfront Park, and waterfront, professional real estate photography"
gen "district-beach" "$LANDSCAPE_SIZE" \
  "Aerial view of Miami South Beach with ocean, palm trees, art deco buildings, and sandy beach at sunset, professional photography"

echo ""
echo "=== SUMMARY ==="
ls -la "$OUT" | grep -c "\.png"
echo "images in $OUT"
ls -la "$OUT"/*.png 2>&1 | head -40
