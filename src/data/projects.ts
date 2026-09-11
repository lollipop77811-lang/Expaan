/**
 * projects.ts — Expaan. Single-property real-estate microsite.
 *
 * 335 NW 28th Street, Miami FL 33127 — Expaan neighbourhood.
 * 8 stories, 49 units, boutique condominium.
 * Studio / 1-BR / 2-BR, 400–844 sq ft, 9-ft ceilings, fully finished.
 *
 * Developer: Wave Group Development, Vitrium Capital, and Zambala.
 * Architecture: MKDA. Interiors & curated amenities: AvroKO.
 *
 * Real facts sourced from the project's pre-construction marketing materials
 * (May 2026) and Florida YIMBY coverage. Image URLs use picsum.photos seeds
 * so layout is stable on every load — swap for production photography later.
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
    slug: 'expaan',
    name: 'Expaan',
    city: 'Miami',
    district: 'Expaan',
    config: ['Studio', '1-Bedroom', '2-Bedroom'],
    sizes: '400 – 844 sq ft',
    status: 'Pre-construction',
    possession: 'Q1 2027',
    priceFrom: 'From $495,000',
    heroImage: portrait('expaan-hero', 1200, 1600),
    heroImageLandscape: landscape('expaan-wide', 1920, 1080),
    gallery: [
      { seed: 'expaan-1', src: portrait('expaan-1', 900, 1200), alt: 'Expaan exterior, 28th Street facade', caption: '8-story facade, NW 28th Street' },
      { seed: 'expaan-2', src: portrait('expaan-2', 900, 1200), alt: 'Gallery lobby lounge', caption: 'Gallery lobby + coffee bar' },
      { seed: 'expaan-3', src: portrait('expaan-3', 900, 1200), alt: 'Studio residence interior', caption: 'Studio, 478 sq ft' },
      { seed: 'expaan-4', src: portrait('expaan-4', 900, 1200), alt: 'One-bedroom residence', caption: 'One-bedroom, 612 sq ft' },
      { seed: 'expaan-5', src: portrait('expaan-5', 900, 1200), alt: 'Two-bedroom residence', caption: 'Two-bedroom, 844 sq ft' },
      { seed: 'expaan-6', src: portrait('expaan-6', 900, 1200), alt: 'The Grotto wellness club', caption: 'The Grotto — mineral pool' },
      { seed: 'expaan-7', src: portrait('expaan-7', 900, 1200), alt: 'Rooftop terrace', caption: 'Rooftop amenities terrace' },
    ],
    amenities: [
      { title: 'Landscaped paseo arrival', body: 'A planted, walk-through arrival sequence from NW 28th Street, designed to set the building apart from the Expaan streetscape and establish a quiet transition into the lobby.' },
      { title: 'Gallery lobby + coffee bar', body: 'A hospitality-driven lobby with digital access control, gallery lounge seating, and a dedicated coffee bar. Curated by AvroKO as the social heart of the building.' },
      { title: 'Meeting gallery + private Zoom rooms', body: 'A residents-only meeting gallery, private Zoom rooms, and a conference room with teleconferencing capabilities for residents who work from home.' },
      { title: 'Windowed fitness center', body: 'A natural-light fitness center with cardio and strength-training equipment, operated as a residents-only facility with extended hours.' },
      { title: 'The Grotto — private wellness club', body: 'A members-only wellness club featuring a mineral pool, cold plunge, steam room, and sauna. The signature amenity of the property, available to residents.' },
      { title: 'Rooftop amenities terrace', body: 'A rooftop terrace with planted surfaces, lounge seating, and views across Expaan and the Miami skyline. Bookable for resident events.' },
      { title: 'High-speed Wi-Fi throughout', body: 'Building-wide high-speed Wi-Fi and dedicated printing facilities — work from the lobby, the gallery, or the rooftop without leaving the network.' },
      { title: '24-hour security + controlled access', body: 'A 24-hour security system with controlled elevator access, on-site laundry, and resident storage. Building operations designed for residential workflows.' },
    ],
    floorPlans: [
      { config: 'Studio', label: 'Studio residence', area: '478 sq ft', image: portrait('fp-expaan-studio', 1200, 900) },
      { config: '1-Bedroom', label: 'One-bedroom residence', area: '612 sq ft', image: portrait('fp-expaan-1br', 1200, 900) },
      { config: '2-Bedroom', label: 'Two-bedroom residence', area: '844 sq ft', image: portrait('fp-expaan-2br', 1200, 900) },
    ],
    availability: [
      { unit: 'PH-08', floor: '8', area: '844 sq ft', price: '$895,000', status: 'Available' },
      { unit: 'PH-07', floor: '8', area: '844 sq ft', price: '$865,000', status: 'Hold' },
      { unit: '702', floor: '7', area: '612 sq ft', price: '$575,000', status: 'Available' },
      { unit: '608', floor: '6', area: '844 sq ft', price: '$815,000', status: 'Reserved' },
      { unit: '502', floor: '5', area: '612 sq ft', price: '$565,000', status: 'Available' },
      { unit: '404', floor: '4', area: '478 sq ft', price: '$495,000', status: 'Available' },
      { unit: '304', floor: '3', area: '478 sq ft', price: '$485,000', status: 'Hold' },
      { unit: '208', floor: '2', area: '844 sq ft', price: '$795,000', status: 'Available' },
    ],
    coordinates: { lat: 25.8017, lng: -80.1993 },
    highlights: ['Expaan location', 'The Grotto wellness club', 'MKDA + AvroKO design', 'Boutique condominium'],
    overview: 'Expaan is an 8-story boutique condominium at 335 NW 28th Street in the heart of Expaan, Miami. The property comprises 49 fully finished residences — studio, one-bedroom, and two-bedroom — designed by MKDA with interiors and curated amenities by AvroKO, the team behind 1 Hotel Central Park in New York. Residents have access to The Grotto, a private wellness club with a mineral pool, cold plunge, steam room, and sauna.',
    architect: 'MKDA',
    interiors: 'AvroKO',
    nearby: [
      { name: 'Expaan Walls', distance: '0.2 mi', category: 'Street art' },
      { name: 'Expaan 2nd Avenue galleries', distance: '0.1 mi', category: 'Galleries' },
      { name: 'Design District', distance: '0.8 mi', category: 'Retail' },
      { name: 'Midtown Miami', distance: '0.5 mi', category: 'Retail' },
      { name: 'Brickell City Centre', distance: '2.4 mi', category: 'Retail' },
      { name: 'Brightline MiamiCentral', distance: '2.2 mi', category: 'Transit' },
      { name: 'Miami International Airport', distance: '5.4 mi', category: 'Airport' },
      { name: 'South Beach', distance: '4.8 mi', category: 'Beach' },
    ],
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
export const getNextProject = (_slug: string) => {
  // Single-property site — getNextProject wraps to itself for the next-project footer link.
  return projects[0]
}
