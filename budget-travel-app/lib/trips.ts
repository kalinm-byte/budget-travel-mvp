export type Vibe =
  | "Beach"
  | "City"
  | "Mountains"
  | "International"
  | "Solo Reset"
  | "Girls Trip"
  | "Romantic"

export type Stops = "nonstop" | "one" | "cheapest"

export type AffiliateUrlType = "flight_details" | "availability" | "none"

export type Trip = {
  id: string
  destination: string
  destinationAirport?: string
  region: string
  price: number
  currency?: string
  travelMinutes: number
  travelTimeMinutes?: number
  stops: 0 | 1 | 2
  airline?: string
  flightSummary?: string
  dataSource?: string
  affiliateProvider?: string | null
  affiliateUrl?: string | null
  affiliateUrlType?: AffiliateUrlType
  vibes: Vibe[]
  /** Home airports this trip can depart from. */
  origins: string[]
  blurb: string
}

export type SearchInput = {
  airport: string
  budget: number
  dates: string
  vibe: Vibe
  stops: Stops
}

export type Badge = "Best Deal" | "Shortest Travel" | "Fewest Stops"

export type ScoredTrip = Trip & {
  matchReason: string
  badge?: Badge
}

export type TripOption = {
  destination: string
  destinationAirport: string
  price: number
  currency: string
  travelTimeMinutes: number
  stops: 0 | 1 | 2
  airline: string
  flightSummary: string
  dataSource: string
  affiliateProvider: string | null
  affiliateUrl: string | null
  affiliateUrlType: AffiliateUrlType
}

function googleFlightsUrl(destinationAirport: string) {
  return `https://www.google.com/travel/flights?q=flights%20to%20${encodeURIComponent(destinationAirport)}`
}

function tripDefaults(trip: {
  destinationAirport: string
  travelMinutes: number
  stops: 0 | 1 | 2
}): Pick<
  Trip,
  | "destinationAirport"
  | "currency"
  | "travelTimeMinutes"
  | "airline"
  | "flightSummary"
  | "dataSource"
  | "affiliateProvider"
  | "affiliateUrl"
  | "affiliateUrlType"
> {
  return {
    destinationAirport: trip.destinationAirport,
    currency: "USD",
    travelTimeMinutes: trip.travelMinutes,
    airline: "Multiple airlines",
    flightSummary: `${stopsLabel(trip.stops)} round trip to ${trip.destinationAirport}`,
    dataSource: "Mock catalog",
    affiliateProvider: null,
    affiliateUrl: googleFlightsUrl(trip.destinationAirport),
    affiliateUrlType: "flight_details",
  }
}

// A curated catalog of 30 trips used as the fallback recommendations.
const CATALOG: Trip[] = [
  {
    id: "cun",
    destination: "Cancun, Mexico",
    destinationAirport: "CUN",
    region: "International",
    price: 268,
    travelMinutes: 230,
    stops: 0,
    vibes: ["Beach", "International", "Girls Trip", "Romantic"],
    origins: ["JFK", "ATL", "DFW", "ORD", "MIA"],
    blurb: "Warm turquoise water and all-inclusive resorts within a short hop.",
  },
  {
    id: "mia",
    destination: "Miami, FL",
    destinationAirport: "MIA",
    region: "Domestic",
    price: 154,
    travelMinutes: 185,
    stops: 0,
    vibes: ["Beach", "City", "Girls Trip"],
    origins: ["JFK", "BOS", "ORD", "ATL", "LAX"],
    blurb: "Nonstop beaches, nightlife, and art-deco strolls without a passport.",
  },
  {
    id: "den",
    destination: "Denver, CO",
    destinationAirport: "DEN",
    region: "Domestic",
    price: 132,
    travelMinutes: 205,
    stops: 0,
    vibes: ["Mountains", "Solo Reset"],
    origins: ["JFK", "ORD", "DFW", "SFO", "SEA", "LAX"],
    blurb: "Gateway to the Rockies with quick access to trails and fresh air.",
  },
  {
    id: "sju",
    destination: "San Juan, Puerto Rico",
    destinationAirport: "SJU",
    region: "International",
    price: 221,
    travelMinutes: 255,
    stops: 0,
    vibes: ["Beach", "International", "Romantic"],
    origins: ["JFK", "MIA", "ATL", "BOS"],
    blurb: "Caribbean beaches and old-town charm with no passport required.",
  },
  {
    id: "nyc",
    destination: "New York, NY",
    destinationAirport: "JFK",
    region: "Domestic",
    price: 118,
    travelMinutes: 165,
    stops: 0,
    vibes: ["City", "Solo Reset", "Girls Trip"],
    origins: ["LAX", "SFO", "ORD", "ATL", "MIA", "DEN", "SEA"],
    blurb: "Endless food, shows, and museums for a packed long weekend.",
  },
  {
    id: "lis",
    destination: "Lisbon, Portugal",
    destinationAirport: "LIS",
    region: "International",
    price: 489,
    travelMinutes: 540,
    stops: 1,
    vibes: ["City", "International", "Romantic", "Solo Reset"],
    origins: ["JFK", "BOS", "ORD"],
    blurb: "Affordable European charm with tiled streets and coastal day trips.",
  },
  {
    id: "slc",
    destination: "Salt Lake City, UT",
    destinationAirport: "SLC",
    region: "Domestic",
    price: 146,
    travelMinutes: 220,
    stops: 0,
    vibes: ["Mountains", "Solo Reset"],
    origins: ["JFK", "LAX", "SFO", "SEA", "DEN", "ORD"],
    blurb: "Big-mountain scenery and lakeside calm just off the runway.",
  },
  {
    id: "nas",
    destination: "Nassau, Bahamas",
    destinationAirport: "NAS",
    region: "International",
    price: 243,
    travelMinutes: 240,
    stops: 1,
    vibes: ["Beach", "International", "Romantic", "Girls Trip"],
    origins: ["JFK", "MIA", "ATL", "BOS", "ORD"],
    blurb: "Powder-soft beaches and clear water a short flight from the coast.",
  },
  {
    id: "avl",
    destination: "Asheville, NC",
    destinationAirport: "AVL",
    region: "Domestic",
    price: 128,
    travelMinutes: 175,
    stops: 1,
    vibes: ["Mountains", "Solo Reset", "Romantic"],
    origins: ["JFK", "ATL", "ORD", "MIA"],
    blurb: "Blue Ridge views, cozy cabins, and a slow, restorative pace.",
  },
  {
    id: "cdmx",
    destination: "Mexico City, Mexico",
    destinationAirport: "MEX",
    region: "International",
    price: 212,
    travelMinutes: 300,
    stops: 0,
    vibes: ["City", "International", "Solo Reset"],
    origins: ["JFK", "LAX", "DFW", "ORD", "ATL"],
    blurb: "World-class food and culture at a fraction of the price.",
  },
  {
    id: "lax",
    destination: "Los Angeles, CA",
    destinationAirport: "LAX",
    region: "Domestic",
    price: 178,
    travelMinutes: 360,
    stops: 0,
    vibes: ["City", "Beach", "Girls Trip"],
    origins: ["JFK", "ORD", "ATL", "BOS", "DEN", "SEA"],
    blurb: "Sunny beaches, Hollywood glamour, and endless taco trucks.",
  },
  {
    id: "banff",
    destination: "Banff, Canada",
    destinationAirport: "YYC",
    region: "International",
    price: 398,
    travelMinutes: 420,
    stops: 1,
    vibes: ["Mountains", "Romantic", "Solo Reset"],
    origins: ["JFK", "SEA", "SFO", "ORD", "DEN"],
    blurb: "Glacier-fed lakes and soaring peaks in the Canadian Rockies.",
  },
  {
    id: "nola",
    destination: "New Orleans, LA",
    destinationAirport: "MSY",
    region: "Domestic",
    price: 162,
    travelMinutes: 215,
    stops: 0,
    vibes: ["City", "Girls Trip", "Romantic"],
    origins: ["JFK", "ATL", "DFW", "ORD", "MIA"],
    blurb: "Jazz, beignets, and French Quarter charm around every corner.",
  },
  {
    id: "san",
    destination: "San Diego, CA",
    destinationAirport: "SAN",
    region: "Domestic",
    price: 189,
    travelMinutes: 345,
    stops: 0,
    vibes: ["Beach", "City", "Solo Reset"],
    origins: ["JFK", "ORD", "DEN", "SEA", "DFW"],
    blurb: "Laid-back beaches, perfect weather, and world-class fish tacos.",
  },
  {
    id: "cabo",
    destination: "Cabo San Lucas, Mexico",
    destinationAirport: "SJD",
    region: "International",
    price: 312,
    travelMinutes: 330,
    stops: 0,
    vibes: ["Beach", "International", "Romantic", "Girls Trip"],
    origins: ["LAX", "SFO", "DFW", "ORD", "DEN"],
    blurb: "Desert-meets-ocean resorts with dramatic rock arches.",
  },
  {
    id: "sea",
    destination: "Seattle, WA",
    destinationAirport: "SEA",
    region: "Domestic",
    price: 198,
    travelMinutes: 350,
    stops: 0,
    vibes: ["City", "Mountains", "Solo Reset"],
    origins: ["JFK", "ORD", "ATL", "BOS", "DEN", "DFW"],
    blurb: "Coffee culture, waterfront markets, and mountains on the horizon.",
  },
  {
    id: "chs",
    destination: "Charleston, SC",
    destinationAirport: "CHS",
    region: "Domestic",
    price: 144,
    travelMinutes: 165,
    stops: 0,
    vibes: ["City", "Romantic", "Girls Trip"],
    origins: ["JFK", "ATL", "ORD", "BOS"],
    blurb: "Cobblestone streets, southern food, and historic charm.",
  },
  {
    id: "pdx",
    destination: "Portland, OR",
    destinationAirport: "PDX",
    region: "Domestic",
    price: 207,
    travelMinutes: 365,
    stops: 1,
    vibes: ["City", "Mountains", "Solo Reset"],
    origins: ["JFK", "ORD", "DEN", "DFW", "ATL"],
    blurb: "Quirky neighborhoods, food carts, and forest day trips.",
  },
  {
    id: "mbj",
    destination: "Montego Bay, Jamaica",
    destinationAirport: "MBJ",
    region: "International",
    price: 289,
    travelMinutes: 255,
    stops: 0,
    vibes: ["Beach", "International", "Romantic", "Girls Trip"],
    origins: ["JFK", "MIA", "ATL", "ORD"],
    blurb: "Reggae rhythms and white-sand beaches in the Caribbean sun.",
  },
  {
    id: "yvr",
    destination: "Vancouver, Canada",
    destinationAirport: "YVR",
    region: "International",
    price: 276,
    travelMinutes: 330,
    stops: 0,
    vibes: ["City", "Mountains", "International", "Solo Reset"],
    origins: ["JFK", "SEA", "SFO", "LAX", "ORD"],
    blurb: "Glass towers framed by ocean and snow-capped peaks.",
  },
  {
    id: "rsw",
    destination: "Fort Myers, FL",
    destinationAirport: "RSW",
    region: "Domestic",
    price: 138,
    travelMinutes: 195,
    stops: 0,
    vibes: ["Beach", "Solo Reset", "Romantic"],
    origins: ["JFK", "BOS", "ORD", "ATL"],
    blurb: "Quiet Gulf-coast beaches and shell-strewn shores.",
  },
  {
    id: "phx",
    destination: "Phoenix, AZ",
    destinationAirport: "PHX",
    region: "Domestic",
    price: 156,
    travelMinutes: 300,
    stops: 0,
    vibes: ["Mountains", "Solo Reset", "City"],
    origins: ["JFK", "ORD", "ATL", "SEA", "DEN", "BOS"],
    blurb: "Desert sun, spa resorts, and red-rock day trips to Sedona.",
  },
  {
    id: "aus",
    destination: "Austin, TX",
    destinationAirport: "AUS",
    region: "Domestic",
    price: 167,
    travelMinutes: 230,
    stops: 0,
    vibes: ["City", "Girls Trip", "Solo Reset"],
    origins: ["JFK", "ORD", "ATL", "LAX", "SFO"],
    blurb: "Live music, barbecue, and a buzzing, laid-back food scene.",
  },
  {
    id: "puj",
    destination: "Punta Cana, Dominican Republic",
    destinationAirport: "PUJ",
    region: "International",
    price: 331,
    travelMinutes: 270,
    stops: 1,
    vibes: ["Beach", "International", "Romantic", "Girls Trip"],
    origins: ["JFK", "MIA", "ATL", "BOS", "ORD"],
    blurb: "Palm-lined beaches and easy all-inclusive escapes.",
  },
  {
    id: "bzn",
    destination: "Bozeman, MT",
    destinationAirport: "BZN",
    region: "Domestic",
    price: 254,
    travelMinutes: 320,
    stops: 1,
    vibes: ["Mountains", "Solo Reset"],
    origins: ["JFK", "ORD", "DEN", "SEA", "LAX"],
    blurb: "Big-sky country and a base camp for Yellowstone adventures.",
  },
  {
    id: "rome",
    destination: "Rome, Italy",
    destinationAirport: "FCO",
    region: "International",
    price: 612,
    travelMinutes: 600,
    stops: 1,
    vibes: ["City", "International", "Romantic"],
    origins: ["JFK", "BOS", "ORD", "MIA"],
    blurb: "Ancient ruins, espresso, and unforgettable pasta.",
  },
  {
    id: "sfo",
    destination: "San Francisco, CA",
    destinationAirport: "SFO",
    region: "Domestic",
    price: 199,
    travelMinutes: 370,
    stops: 0,
    vibes: ["City", "Solo Reset", "Romantic"],
    origins: ["JFK", "ORD", "ATL", "BOS", "DEN", "SEA"],
    blurb: "Iconic bridges, foggy hills, and standout food neighborhoods.",
  },
  {
    id: "sav",
    destination: "Savannah, GA",
    destinationAirport: "SAV",
    region: "Domestic",
    price: 149,
    travelMinutes: 180,
    stops: 1,
    vibes: ["City", "Romantic", "Girls Trip"],
    origins: ["JFK", "ATL", "ORD", "BOS"],
    blurb: "Oak-lined squares, ghost tours, and southern hospitality.",
  },
  {
    id: "aua",
    destination: "Oranjestad, Aruba",
    destinationAirport: "AUA",
    region: "International",
    price: 358,
    travelMinutes: 290,
    stops: 1,
    vibes: ["Beach", "International", "Romantic", "Girls Trip"],
    origins: ["JFK", "MIA", "ATL", "BOS"],
    blurb: "Year-round sun, calm waters, and powdery white sand.",
  },
  {
    id: "jac",
    destination: "Jackson Hole, WY",
    destinationAirport: "JAC",
    region: "Domestic",
    price: 287,
    travelMinutes: 340,
    stops: 1,
    vibes: ["Mountains", "Romantic", "Solo Reset"],
    origins: ["JFK", "ORD", "DEN", "SFO", "LAX"],
    blurb: "Dramatic Teton peaks and rugged wide-open wilderness.",
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

function maxStopsFor(stops: Stops) {
  if (stops === "nonstop") return 0
  if (stops === "one") return 1
  return 2
}

/**
 * Filter the catalog by budget, home airport, vibe, and max stops,
 * then rank the matches and return the top 3 by a blend of price,
 * travel time, and number of stops. Returns an empty array when
 * nothing matches so the UI can show an empty state.
 */
export function findTrips(input: SearchInput): ScoredTrip[] {
  const airport = input.airport.trim().toUpperCase()
  const maxStops = maxStopsFor(input.stops)

  const candidates = CATALOG.filter(
    (trip) =>
      trip.price <= input.budget &&
      trip.stops <= maxStops &&
      trip.origins.includes(airport) &&
      trip.vibes.includes(input.vibe),
  )

  if (candidates.length === 0) return []

  const minPrice = Math.min(...candidates.map((trip) => trip.price))
  const maxPrice = Math.max(...candidates.map((trip) => trip.price))
  const minTime = Math.min(...candidates.map((trip) => trip.travelMinutes))
  const maxTime = Math.max(...candidates.map((trip) => trip.travelMinutes))

  const norm = (value: number, min: number, max: number) =>
    max === min ? 0 : (value - min) / (max - min)

  const ranked = [...candidates]
    .map((trip) => {
      const priceScore = norm(trip.price, minPrice, maxPrice)
      const timeScore = norm(trip.travelMinutes, minTime, maxTime)
      const stopScore = trip.stops / 2
      const score = priceScore * 0.45 + timeScore * 0.35 + stopScore * 0.2
      return { trip, score }
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((rankedTrip) => rankedTrip.trip)

  const cheapest = [...ranked].sort((a, b) => a.price - b.price)[0]
  const fastest = [...ranked].sort((a, b) => a.travelMinutes - b.travelMinutes)[0]
  const fewestStops = [...ranked].sort((a, b) => a.stops - b.stops)[0]

  const usedBadges = new Set<Badge>()

  return ranked.map((trip) => {
    let badge: Badge | undefined

    if (trip.id === cheapest.id && !usedBadges.has("Best Deal")) {
      badge = "Best Deal"
    } else if (trip.id === fastest.id && !usedBadges.has("Shortest Travel")) {
      badge = "Shortest Travel"
    } else if (trip.id === fewestStops.id && trip.stops === 0 && !usedBadges.has("Fewest Stops")) {
      badge = "Fewest Stops"
    }

    if (badge) usedBadges.add(badge)

    const reasons: string[] = []
    if (trip.price <= input.budget * 0.6) reasons.push("well under your budget")
    else reasons.push("fits your budget")
    reasons.push(`great for a ${input.vibe.toLowerCase()} trip`)
    if (trip.stops === 0) reasons.push(`nonstop from ${airport}`)
    else reasons.push(`${stopsLabel(trip.stops).toLowerCase()} from ${airport}`)

    const matchReason =
      reasons[0].charAt(0).toUpperCase() +
      reasons[0].slice(1) +
      ", " +
      reasons.slice(1).join(", ") +
      "."

    const destinationAirport = trip.destinationAirport ?? trip.id.toUpperCase()

    return {
      ...trip,
      ...tripDefaults({ ...trip, destinationAirport }),
      badge,
      matchReason,
    }
  })
}
