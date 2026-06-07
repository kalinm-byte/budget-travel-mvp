export type Vibe =
  | "Beach"
  | "City"
  | "Mountains"
  | "International"
  | "Solo Reset"
  | "Girls Trip"
  | "Romantic"

export type Stops = "nonstop" | "one" | "cheapest"

export type Trip = {
  id: string
  destination: string
  region: string
  price: number
  travelMinutes: number
  stops: 0 | 1 | 2
  vibes: Vibe[]
  blurb: string
}

export type SearchInput = {
  airport: string
  budget: number
  dates: string
  vibe: Vibe
  stops: Stops
}

export type Badge = "Best Deal" | "Shortest Travel" | "Best Vibe Match"

export type ScoredTrip = Trip & {
  matchReason: string
  badge?: Badge
}

// A small curated catalog used to power the demo recommendations.
const CATALOG: Trip[] = [
  {
    id: "cun",
    destination: "Cancún, Mexico",
    region: "International",
    price: 268,
    travelMinutes: 230,
    stops: 0,
    vibes: ["Beach", "International", "Girls Trip", "Romantic"],
    blurb: "Warm turquoise water and all-inclusive resorts within a short hop.",
  },
  {
    id: "mia",
    destination: "Miami, FL",
    region: "Domestic",
    price: 154,
    travelMinutes: 185,
    stops: 0,
    vibes: ["Beach", "City", "Girls Trip"],
    blurb: "Nonstop beaches, nightlife, and art-deco strolls without a passport.",
  },
  {
    id: "den",
    destination: "Denver, CO",
    region: "Domestic",
    price: 132,
    travelMinutes: 205,
    stops: 0,
    vibes: ["Mountains", "Solo Reset"],
    blurb: "Gateway to the Rockies with quick access to trails and fresh air.",
  },
  {
    id: "sju",
    destination: "San Juan, Puerto Rico",
    region: "International",
    price: 221,
    travelMinutes: 255,
    stops: 0,
    vibes: ["Beach", "International", "Romantic"],
    blurb: "Caribbean beaches and old-town charm with no passport required.",
  },
  {
    id: "nyc",
    destination: "New York, NY",
    region: "Domestic",
    price: 118,
    travelMinutes: 165,
    stops: 0,
    vibes: ["City", "Solo Reset", "Girls Trip"],
    blurb: "Endless food, shows, and museums for a packed long weekend.",
  },
  {
    id: "lis",
    destination: "Lisbon, Portugal",
    region: "International",
    price: 489,
    travelMinutes: 540,
    stops: 1,
    vibes: ["City", "International", "Romantic", "Solo Reset"],
    blurb: "Affordable European charm with tiled streets and coastal day trips.",
  },
  {
    id: "slc",
    destination: "Salt Lake City, UT",
    region: "Domestic",
    price: 146,
    travelMinutes: 220,
    stops: 0,
    vibes: ["Mountains", "Solo Reset"],
    blurb: "Big-mountain scenery and lakeside calm just off the runway.",
  },
  {
    id: "nas",
    destination: "Nassau, Bahamas",
    region: "International",
    price: 243,
    travelMinutes: 240,
    stops: 1,
    vibes: ["Beach", "International", "Romantic", "Girls Trip"],
    blurb: "Powder-soft beaches and clear water a short flight from the coast.",
  },
  {
    id: "asheville",
    destination: "Asheville, NC",
    region: "Domestic",
    price: 128,
    travelMinutes: 175,
    stops: 1,
    vibes: ["Mountains", "Solo Reset", "Romantic"],
    blurb: "Blue Ridge views, cozy cabins, and a slow, restorative pace.",
  },
  {
    id: "cdmx",
    destination: "Mexico City, Mexico",
    region: "International",
    price: 212,
    travelMinutes: 300,
    stops: 0,
    vibes: ["City", "International", "Solo Reset"],
    blurb: "World-class food and culture at a fraction of the price.",
  },
]

function formatTravelTime(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

export function stopsLabel(stops: number) {
  if (stops === 0) return "Nonstop"
  if (stops === 1) return "1 stop"
  return `${stops} stops`
}

export function travelTimeLabel(minutes: number) {
  return formatTravelTime(minutes)
}

export function findTrips(input: SearchInput): ScoredTrip[] {
  const maxStops = input.stops === "nonstop" ? 0 : input.stops === "one" ? 1 : 2

  let candidates = CATALOG.filter(
    (t) => t.price <= input.budget && t.stops <= maxStops,
  )

  // If nothing fits, relax the stops constraint but keep budget.
  if (candidates.length === 0) {
    candidates = CATALOG.filter((t) => t.price <= input.budget)
  }
  // If still nothing, show the cheapest options regardless.
  if (candidates.length === 0) {
    candidates = [...CATALOG].sort((a, b) => a.price - b.price).slice(0, 5)
  }

  const scored = candidates
    .map((t) => {
      const vibeMatch = t.vibes.includes(input.vibe)
      // Lower score is better: blend of price and travel time, with a vibe bonus.
      const priceScore = t.price / input.budget
      const timeScore = t.travelMinutes / 600
      const vibeBonus = vibeMatch ? -0.4 : 0
      const score = priceScore + timeScore + vibeBonus
      return { trip: t, score, vibeMatch }
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)

  if (scored.length === 0) return []

  const cheapest = [...scored].sort((a, b) => a.trip.price - b.trip.price)[0]
  const fastest = [...scored].sort(
    (a, b) => a.trip.travelMinutes - b.trip.travelMinutes,
  )[0]
  const bestVibe = scored.find((s) => s.vibeMatch)

  return scored.map(({ trip, vibeMatch }) => {
    let badge: Badge | undefined
    if (trip.id === cheapest.trip.id) badge = "Best Deal"
    else if (trip.id === fastest.trip.id) badge = "Shortest Travel"
    else if (bestVibe && trip.id === bestVibe.trip.id) badge = "Best Vibe Match"

    const reasons: string[] = []
    if (vibeMatch) reasons.push(`great for a ${input.vibe.toLowerCase()} trip`)
    if (trip.price <= input.budget * 0.6)
      reasons.push("well under your budget")
    else reasons.push("fits your budget")
    if (trip.stops === 0) reasons.push("nonstop from " + input.airport.toUpperCase())
    else reasons.push(`${stopsLabel(trip.stops).toLowerCase()} from ${input.airport.toUpperCase()}`)

    const matchReason =
      reasons[0].charAt(0).toUpperCase() + reasons[0].slice(1) + ", " + reasons.slice(1).join(", ") + "."

    return { ...trip, badge, matchReason }
  })
}
