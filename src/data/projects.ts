/**
 * projects.ts — typed project inventory. The single source of truth.
 *
 * Six realistic residences across three cities (New York, Miami, Los Angeles).
 * All images use picsum.photos seeded URLs so layout is stable on every load.
 */

import { portrait, landscape } from '../lib/image'

export interface FloorPlan {
  config: string
  label: string
  area: string
  image: string
}

export interface AvailabilityRow {
  unit: string
  floor: string
  area: string
  price: string
  status: 'Available' | 'Hold' | 'Reserved'
}

export interface Project {
  slug: string
  name: string
  city: string
  district: string
  config: string[]
  sizes: string
  status: string
  possession: string
  priceFrom: string
  heroImage: string
  heroImageLandscape: string
  gallery: { seed: string; src: string; alt: string; caption: string }[]
  amenities: { title: string; body: string }[]
  floorPlans: FloorPlan[]
  availability?: AvailabilityRow[]
  coordinates: { lat: number; lng: number }
  highlights: string[]
  overview: string
  architect: string
  interiors: string
  nearby: { name: string; distance: string; category: string }[]
}

export const projects: Project[] = [
  {
    slug: 'the-meridian-111w57',
    name: 'The Meridian',
    city: 'New York',
    district: 'Midtown West',
    config: ['Full-Floor 3BR', 'Penthouse 4BR'],
    sizes: '3,420 – 7,210 sq ft',
    status: 'Under construction',
    possession: 'Q3 2026',
    priceFrom: '$7,850,000',
    heroImage: portrait('meridian-hero', 1200, 1600),
    heroImageLandscape: landscape('meridian-wide', 1920, 1080),
    gallery: [
      { seed: 'meridian-1', src: portrait('meridian-1', 900, 1200), alt: 'The Meridian exterior', caption: 'West façade at dusk' },
      { seed: 'meridian-2', src: portrait('meridian-2', 900, 1200), alt: 'The Meridian lobby', caption: 'Arrival lobby' },
      { seed: 'meridian-3', src: portrait('meridian-3', 900, 1200), alt: 'The Meridian living', caption: 'Full-floor residence, level 32' },
      { seed: 'meridian-4', src: portrait('meridian-4', 900, 1200), alt: 'The Meridian kitchen', caption: 'Polished oak kitchen' },
      { seed: 'meridian-5', src: portrait('meridian-5', 900, 1200), alt: 'The Meridian primary suite', caption: 'Primary suite, southwest corner' },
      { seed: 'meridian-6', src: portrait('meridian-6', 900, 1200), alt: 'The Meridian spa', caption: 'Resident spa' },
    ],
    amenities: [
      { title: 'Concierge & doorman', body: 'Twenty-four-hour concierge, attended lobby, and a private doorman. The Meridian operates as a full-service building with white-glove attention to every arrival.' },
      { title: 'Resident spa & pool', body: 'An 82-foot lap pool, paired steam and sauna rooms, and two treatment suites. Operated by an in-house wellness director.' },
      { title: 'Private dining', body: `A 24-seat dining room with a chef's kitchen for residents and their guests, bookable through the concierge.` },
      { title: 'Wine cellar', body: 'A 600-bottle cellar, climate-controlled, with private lockers assigned to each residence.' },
    ],
    floorPlans: [
      { config: 'Full-Floor 3BR', label: 'Full-floor, 3-bedroom', area: '3,420 sq ft', image: portrait('fp-meridian-3br', 1200, 900) },
      { config: 'Penthouse 4BR', label: 'Penthouse, 4-bedroom', area: '7,210 sq ft', image: portrait('fp-meridian-ph', 1200, 900) },
    ],
    availability: [
      { unit: 'PHB', floor: '84', area: '7,210 sq ft', price: '$32,400,000', status: 'Available' },
      { unit: '80A', floor: '80', area: '3,820 sq ft', price: '$18,900,000', status: 'Hold' },
      { unit: '78B', floor: '78', area: '3,420 sq ft', price: '$14,200,000', status: 'Available' },
      { unit: '70A', floor: '70', area: '3,820 sq ft', price: '$16,800,000', status: 'Reserved' },
      { unit: '64B', floor: '64', area: '3,420 sq ft', price: '$12,950,000', status: 'Available' },
    ],
    coordinates: { lat: 40.7614, lng: -73.9777 },
    highlights: ['Full-floor residences', '82-foot lap pool', 'Central Park views', 'Private wine cellar'],
    overview: `The Meridian is an 84-storey tower on Billionaires' Row, comprising full-floor three-bedroom residences and a four-bedroom penthouse. Each floor is occupied by a single residence, with private elevator entry, three exposures, and unobstructed views toward Central Park.`,
    architect: 'Shop Architects',
    interiors: 'Studio Sofield',
    nearby: [
      { name: 'Central Park', distance: '0.2 mi', category: 'Park' },
      { name: 'Carnegie Hall', distance: '0.4 mi', category: 'Concert hall' },
      { name: 'MoMA', distance: '0.5 mi', category: 'Museum' },
      { name: 'Bergdorf Goodman', distance: '0.6 mi', category: 'Retail' },
    ],
  },
  {
    slug: 'ashford-house',
    name: 'Ashford House',
    city: 'New York',
    district: 'Tribeca',
    config: ['2BR Loft', '3BR Loft', 'Penthouse 4BR'],
    sizes: '2,180 – 5,400 sq ft',
    status: 'Move-in ready',
    possession: 'Immediate',
    priceFrom: '$4,200,000',
    heroImage: portrait('ashford-hero', 1200, 1600),
    heroImageLandscape: landscape('ashford-wide', 1920, 1080),
    gallery: [
      { seed: 'ashford-1', src: portrait('ashford-1', 900, 1200), alt: 'Ashford House exterior', caption: 'Tribeca loft facade' },
      { seed: 'ashford-2', src: portrait('ashford-2', 900, 1200), alt: 'Ashford House loft', caption: 'Great room, level 6' },
      { seed: 'ashford-3', src: portrait('ashford-3', 900, 1200), alt: 'Ashford House kitchen', caption: 'Hand-finished kitchen' },
      { seed: 'ashford-4', src: portrait('ashford-4', 900, 1200), alt: 'Ashford House terrace', caption: 'Private planted terrace' },
      { seed: 'ashford-5', src: portrait('ashford-5', 900, 1200), alt: 'Ashford House bath', caption: 'Primary bath, Calacatta' },
    ],
    amenities: [
      { title: 'Attended lobby', body: 'Twenty-four-hour doorman and concierge, parcel room, cold storage for deliveries.' },
      { title: 'Roof terrace', body: 'A 4,200 sq ft planted terrace with kitchen, lounge, and Hudson River views.' },
      { title: 'Fitness studio', body: 'A double-height fitness studio with private training rooms and a yoga studio.' },
      { title: 'Bike room', body: 'Secure bicycle storage and an EV charging station in the garage.' },
    ],
    floorPlans: [
      { config: '2BR Loft', label: '2-bedroom loft', area: '2,180 sq ft', image: portrait('fp-ashford-2br', 1200, 900) },
      { config: '3BR Loft', label: '3-bedroom loft', area: '3,140 sq ft', image: portrait('fp-ashford-3br', 1200, 900) },
      { config: 'Penthouse 4BR', label: 'Penthouse, 4-bedroom', area: '5,400 sq ft', image: portrait('fp-ashford-ph', 1200, 900) },
    ],
    availability: [
      { unit: 'PH', floor: '12', area: '5,400 sq ft', price: '$16,800,000', status: 'Available' },
      { unit: '9A', floor: '9', area: '3,140 sq ft', price: '$8,950,000', status: 'Available' },
      { unit: '7B', floor: '7', area: '2,180 sq ft', price: '$4,200,000', status: 'Hold' },
    ],
    coordinates: { lat: 40.7180, lng: -74.0123 },
    highlights: ['Cast-iron facade', 'Private terraces', 'Hudson River views', 'Loft proportions'],
    overview: 'Ashford House is the restoration of a 1908 cast-iron warehouse into twelve loft residences, each with ceilings over 11 feet, oversized casement windows, and finishes selected by Studio Sofield.',
    architect: 'CetraRuddy',
    interiors: 'Studio Sofield',
    nearby: [
      { name: 'Hudson River Park', distance: '0.3 mi', category: 'Park' },
      { name: 'Brookfield Place', distance: '0.4 mi', category: 'Retail' },
      { name: 'Stonewall Inn', distance: '0.5 mi', category: 'Landmark' },
    ],
  },
  {
    slug: 'marlowe-miami',
    name: 'Marlowe',
    city: 'Miami',
    district: 'Brickell',
    config: ['2BR Residence', '3BR Residence', 'Sky Penthouse 5BR'],
    sizes: '2,400 – 9,800 sq ft',
    status: 'Under construction',
    possession: 'Q4 2026',
    priceFrom: '$3,400,000',
    heroImage: portrait('marlowe-hero', 1200, 1600),
    heroImageLandscape: landscape('marlowe-wide', 1920, 1080),
    gallery: [
      { seed: 'marlowe-1', src: portrait('marlowe-1', 900, 1200), alt: 'Marlowe exterior', caption: 'Brickell skyline facade' },
      { seed: 'marlowe-2', src: portrait('marlowe-2', 900, 1200), alt: 'Marlowe pool deck', caption: 'Pool deck, level 9' },
      { seed: 'marlowe-3', src: portrait('marlowe-3', 900, 1200), alt: 'Marlowe residence', caption: '3-bedroom residence' },
      { seed: 'marlowe-4', src: portrait('marlowe-4', 900, 1200), alt: 'Marlowe kitchen', caption: 'Open kitchen' },
      { seed: 'marlowe-5', src: portrait('marlowe-5', 900, 1200), alt: 'Marlowe spa', caption: 'Wellness pavilion' },
      { seed: 'marlowe-6', src: portrait('marlowe-6', 900, 1200), alt: 'Marlowe terrace', caption: 'Sky terrace, level 60' },
    ],
    amenities: [
      { title: 'Pool deck', body: 'A 110-foot pool, two jacuzzis, and twelve cabanas on level 9. Open year-round with full poolside service.' },
      { title: 'Wellness pavilion', body: 'A wellness suite with sauna, steam, cold plunge, and four treatment rooms.' },
      { title: 'Sky lounge', body: 'A double-height lounge on level 60 with bar, library, and a 40-foot terrace overlooking Biscayne Bay.' },
      { title: 'Marina', body: 'A private marina with twelve slips accommodating vessels up to 80 feet.' },
    ],
    floorPlans: [
      { config: '2BR Residence', label: '2-bedroom residence', area: '2,400 sq ft', image: portrait('fp-marlowe-2br', 1200, 900) },
      { config: '3BR Residence', label: '3-bedroom residence', area: '3,260 sq ft', image: portrait('fp-marlowe-3br', 1200, 900) },
      { config: 'Sky Penthouse 5BR', label: 'Sky penthouse, 5-bedroom', area: '9,800 sq ft', image: portrait('fp-marlowe-ph', 1200, 900) },
    ],
    availability: [
      { unit: 'PH', floor: '70', area: '9,800 sq ft', price: '$42,000,000', status: 'Available' },
      { unit: '60A', floor: '60', area: '3,260 sq ft', price: '$9,400,000', status: 'Hold' },
      { unit: '50B', floor: '50', area: '2,400 sq ft', price: '$3,800,000', status: 'Available' },
    ],
    coordinates: { lat: 25.7608, lng: -80.1902 },
    highlights: ['110-foot pool', 'Private marina', 'Biscayne Bay views', 'Sky lounge'],
    overview: 'Marlowe is a 70-storey tower on the Brickell waterfront, the second in a series of waterfront residences by the studio. The building is set back from the avenue, with a private motor court and direct access to the bay.',
    architect: 'Studio Muniz',
    interiors: 'Michele Bönan',
    nearby: [
      { name: 'Brickell City Centre', distance: '0.4 mi', category: 'Retail' },
      { name: 'Bayfront Park', distance: '0.6 mi', category: 'Park' },
      { name: 'Pérez Art Museum', distance: '0.8 mi', category: 'Museum' },
    ],
  },
  {
    slug: 'verdant-miami',
    name: 'Verdant',
    city: 'Miami',
    district: 'Coconut Grove',
    config: ['3BR Garden', '4BR Villa'],
    sizes: '3,800 – 6,200 sq ft',
    status: 'Move-in ready',
    possession: 'Immediate',
    priceFrom: '$5,600,000',
    heroImage: portrait('verdant-hero', 1200, 1600),
    heroImageLandscape: landscape('verdant-wide', 1920, 1080),
    gallery: [
      { seed: 'verdant-1', src: portrait('verdant-1', 900, 1200), alt: 'Verdant exterior', caption: 'Coconut Grove facade' },
      { seed: 'verdant-2', src: portrait('verdant-2', 900, 1200), alt: 'Verdant garden', caption: 'Private garden' },
      { seed: 'verdant-3', src: portrait('verdant-3', 900, 1200), alt: 'Verdant living', caption: 'Living room' },
      { seed: 'verdant-4', src: portrait('verdant-4', 900, 1200), alt: 'Verdant kitchen', caption: 'Outdoor kitchen' },
      { seed: 'verdant-5', src: portrait('verdant-5', 900, 1200), alt: 'Verdant pool', caption: 'Private pool' },
    ],
    amenities: [
      { title: 'Private gardens', body: 'Each residence includes a private garden of at least 1,400 sq ft, designed by Enzo Enea.' },
      { title: 'Pool & cabanas', body: `A residents' pool with four cabanas, a children's pool, and a private dining pavilion.` },
      { title: 'Boat house', body: 'A shared boat house with kayaks and paddleboards, accessible through the rear gate.' },
      { title: 'Grove membership', body: 'A complimentary two-year membership to the neighbouring Coconut Grove Club.' },
    ],
    floorPlans: [
      { config: '3BR Garden', label: '3-bedroom garden residence', area: '3,800 sq ft', image: portrait('fp-verdant-3br', 1200, 900) },
      { config: '4BR Villa', label: '4-bedroom villa', area: '6,200 sq ft', image: portrait('fp-verdant-4br', 1200, 900) },
    ],
    availability: [
      { unit: 'V-04', floor: 'G', area: '6,200 sq ft', price: '$12,800,000', status: 'Available' },
      { unit: 'V-02', floor: 'G', area: '6,200 sq ft', price: '$11,200,000', status: 'Hold' },
      { unit: 'G-08', floor: '1', area: '3,800 sq ft', price: '$5,600,000', status: 'Available' },
    ],
    coordinates: { lat: 25.7270, lng: -80.2420 },
    highlights: ['Private gardens', 'Enea landscape', 'Coconut Grove', 'Outdoor kitchens'],
    overview: 'Verdant is a collection of eighteen garden villas and ground-floor residences in Coconut Grove, each with a private garden designed by Enea. A rare low-rise offering in a neighbourhood of dense towers.',
    architect: 'Max Strang Architecture',
    interiors: 'Marcelo Villalobos',
    nearby: [
      { name: 'Peacock Park', distance: '0.3 mi', category: 'Park' },
      { name: 'Coconut Grove Sailing Club', distance: '0.5 mi', category: 'Marina' },
      { name: 'Vizcaya', distance: '0.9 mi', category: 'Museum' },
    ],
  },
  {
    slug: 'pacific-hollow',
    name: 'Pacific Hollow',
    city: 'Los Angeles',
    district: 'Pacific Palisades',
    config: ['3BR Bungalow', '4BR Estate'],
    sizes: '3,200 – 6,800 sq ft',
    status: 'Under construction',
    possession: 'Q2 2027',
    priceFrom: '$6,400,000',
    heroImage: portrait('pacific-hero', 1200, 1600),
    heroImageLandscape: landscape('pacific-wide', 1920, 1080),
    gallery: [
      { seed: 'pacific-1', src: portrait('pacific-1', 900, 1200), alt: 'Pacific Hollow exterior', caption: 'Pacific Palisades facade' },
      { seed: 'pacific-2', src: portrait('pacific-2', 900, 1200), alt: 'Pacific Hollow living', caption: 'Great room' },
      { seed: 'pacific-3', src: portrait('pacific-3', 900, 1200), alt: 'Pacific Hollow kitchen', caption: 'Stone island kitchen' },
      { seed: 'pacific-4', src: portrait('pacific-4', 900, 1200), alt: 'Pacific Hollow pool', caption: 'Lap pool' },
      { seed: 'pacific-5', src: portrait('pacific-5', 900, 1200), alt: 'Pacific Hollow primary', caption: 'Primary suite' },
    ],
    amenities: [
      { title: 'Private pool & spa', body: 'Each residence includes a 40-foot lap pool and a private spa. Site works by Edgeesign.' },
      { title: 'Outdoor kitchen', body: 'A full outdoor kitchen with grill, pizza oven, and dining for ten.' },
      { title: 'Wine room', body: 'A 500-bottle climate-controlled wine room adjoining the dining room.' },
      { title: 'EV garage', body: 'A three-car garage with EV charging standard in every residence.' },
    ],
    floorPlans: [
      { config: '3BR Bungalow', label: '3-bedroom bungalow', area: '3,200 sq ft', image: portrait('fp-pacific-3br', 1200, 900) },
      { config: '4BR Estate', label: '4-bedroom estate', area: '6,800 sq ft', image: portrait('fp-pacific-4br', 1200, 900) },
    ],
    availability: [
      { unit: 'E-03', floor: 'G', area: '6,800 sq ft', price: '$14,200,000', status: 'Available' },
      { unit: 'B-05', floor: 'G', area: '3,200 sq ft', price: '$6,400,000', status: 'Hold' },
    ],
    coordinates: { lat: 34.0489, lng: -118.5266 },
    highlights: ['Ocean views', 'Private pools', 'Outdoor living', 'EV garage'],
    overview: 'Pacific Hollow is a collection of eight bungalows and four estates in Pacific Palisades, each with a private pool, outdoor kitchen, and views toward the Santa Monica Mountains and ocean.',
    architect: 'Marmol Radziner',
    interiors: 'Marmol Radziner',
    nearby: [
      { name: 'Palisades Park', distance: '0.4 mi', category: 'Park' },
      { name: 'Will Rogers Beach', distance: '0.7 mi', category: 'Beach' },
      { name: 'Sunset Boulevard retail', distance: '0.9 mi', category: 'Retail' },
    ],
  },
  {
    slug: 'fairbanks-la',
    name: 'Fairbanks',
    city: 'Los Angeles',
    district: 'Silver Lake',
    config: ['2BR Loft', '3BR Loft'],
    sizes: '1,800 – 2,900 sq ft',
    status: 'Move-in ready',
    possession: 'Immediate',
    priceFrom: '$1,950,000',
    heroImage: portrait('fairbanks-hero', 1200, 1600),
    heroImageLandscape: landscape('fairbanks-wide', 1920, 1080),
    gallery: [
      { seed: 'fairbanks-1', src: portrait('fairbanks-1', 900, 1200), alt: 'Fairbanks exterior', caption: 'Silver Lake facade' },
      { seed: 'fairbanks-2', src: portrait('fairbanks-2', 900, 1200), alt: 'Fairbanks loft', caption: 'Loft living' },
      { seed: 'fairbanks-3', src: portrait('fairbanks-3', 900, 1200), alt: 'Fairbanks kitchen', caption: 'Open kitchen' },
      { seed: 'fairbanks-4', src: portrait('fairbanks-4', 900, 1200), alt: 'Fairbanks terrace', caption: 'Roof terrace' },
      { seed: 'fairbanks-5', src: portrait('fairbanks-5', 900, 1200), alt: 'Fairbanks view', caption: 'Reservoir view' },
    ],
    amenities: [
      { title: 'Roof terrace', body: 'A 2,200 sq ft shared roof terrace with kitchen and reservoir views.' },
      { title: 'Co-working', body: 'A ground-floor co-working suite and private meeting room for residents.' },
      { title: 'Bike storage', body: 'Secure bike storage and a workshop in the basement.' },
      { title: 'Courtyard', body: 'A landscaped courtyard by Art Luna, with a fire pit and lounge seating.' },
    ],
    floorPlans: [
      { config: '2BR Loft', label: '2-bedroom loft', area: '1,800 sq ft', image: portrait('fp-fairbanks-2br', 1200, 900) },
      { config: '3BR Loft', label: '3-bedroom loft', area: '2,900 sq ft', image: portrait('fp-fairbanks-3br', 1200, 900) },
    ],
    availability: [
      { unit: 'PH', floor: '4', area: '2,900 sq ft', price: '$3,800,000', status: 'Available' },
      { unit: '3A', floor: '3', area: '1,800 sq ft', price: '$1,950,000', status: 'Hold' },
    ],
    coordinates: { lat: 34.0867, lng: -118.2693 },
    highlights: ['Loft proportions', 'Reservoir views', 'Roof terrace', 'Walkable Silver Lake'],
    overview: 'Fairbanks is the conversion of a 1962 concrete-frame office building into fourteen loft residences in Silver Lake, with floor-to-ceiling glass, polished concrete floors, and reservoir views.',
    architect: 'LOHA',
    interiors: 'Britt Design',
    nearby: [
      { name: 'Silver Lake Reservoir', distance: '0.2 mi', category: 'Park' },
      { name: 'Sunset Junction', distance: '0.4 mi', category: 'Retail' },
      { name: 'Echo Park Lake', distance: '1.1 mi', category: 'Park' },
    ],
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
export const getNextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return projects[0]
  return projects[(i + 1) % projects.length]
}
