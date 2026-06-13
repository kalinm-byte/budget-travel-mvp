import { NextResponse } from "next/server"
import { resolveTravelDates } from "@/lib/flight-providers/date-defaults"
import { SerpApiGoogleFlightsProvider } from "@/lib/flight-providers/serpapi-google-flights"
import type { FlightProvider, FlightSearchRequest } from "@/lib/flight-providers/types"
import {
  findTrips,
  type ScoredTrip,
  type SearchInput,
  type Stops,
  type TripOption,
  type Vibe,
} from "@/lib/trips"

const VIBES: Vibe[] = [
  "Beach",
  "City",
  "Mountains",
  "International",
  "Solo Reset",
  "Girls Trip",
  "Romantic",
]

const STOPS: Stops[] = ["nonstop", "one", "cheapest"]

function isVibe(value: unknown): value is Vibe {
  return typeof value === "string" && VIBES.includes(value as Vibe)
}

function isStops(value: unknown): value is Stops {
  return typeof value === "string" && STOPS.includes(value as Stops)
}

function normalizeAirport(value: unknown) {
  if (typeof value !== "string") return "JFK"
  const airport = value.trim().toUpperCase()
  return /^[A-Z]{3}$/.test(airport) ? airport : "JFK"
}

function parseSearchInput(body: Partial<SearchInput>): SearchInput {
  const parsedBudget = Number(body.budget)

  return {
    airport: normalizeAirport(body.airport),
    budget: Number.isFinite(parsedBudget) && parsedBudget > 0 ? parsedBudget : 400,
    dates: typeof body.dates === "string" ? body.dates : "flexible",
    vibe: isVibe(body.vibe) ? body.vibe : "Beach",
    stops: isStops(body.stops) ? body.stops : "nonstop",
  }
}

function stopsLabel(stops: number) {
  if (stops === 0) return "nonstop"
  if (stops === 1) return "1 stop"
  return `${stops} stops`
}

function toScoredTrip(option: TripOption, input: SearchInput, index: number): ScoredTrip {
  const overBudget = option.price > input.budget
  const matchReason = `${overBudget ? "Close to your budget" : "Fits your budget"}, great for a ${input.vibe.toLowerCase()} trip, ${stopsLabel(option.stops)} from ${input.airport.toUpperCase()}.`

  return {
    id: `${option.destinationAirport.toLowerCase()}-${index}`,
    destination: option.destination,
    destinationAirport: option.destinationAirport,
    region: option.destinationAirport.length === 3 ? "Flight deal" : "Recommended",
    price: option.price,
    currency: option.currency,
    travelMinutes: option.travelTimeMinutes,
    travelTimeMinutes: option.travelTimeMinutes,
    stops: option.stops,
    airline: option.airline,
    flightSummary: option.flightSummary,
    dataSource: option.dataSource,
    affiliateProvider: option.affiliateProvider,
    affiliateUrl: option.affiliateUrl,
    affiliateUrlType: option.affiliateUrlType,
    vibes: [input.vibe],
    origins: [input.airport.toUpperCase()],
    blurb: option.flightSummary,
    matchReason,
    badge: index === 0 ? "Best Deal" : undefined,
  }
}

function fallbackTrips(input: SearchInput) {
  return {
    dataSource: "mock",
    trips: findTrips(input),
  }
}

function getProvider(): FlightProvider | null {
  const apiKey = process.env.SERPAPI_API_KEY
  return apiKey ? new SerpApiGoogleFlightsProvider(apiKey) : null
}

export async function POST(request: Request) {
  let body: Partial<SearchInput>

  try {
    body = (await request.json()) as Partial<SearchInput>
  } catch {
    return NextResponse.json({ error: "Invalid search request" }, { status: 400 })
  }

  const input = parseSearchInput(body)
  const dates = resolveTravelDates(input.dates)
  const providerInput: FlightSearchRequest = { ...input, ...dates }
  const provider = getProvider()

  if (!provider) {
    return NextResponse.json(fallbackTrips(input))
  }

  try {
    const options = await provider.searchTrips(providerInput)

    if (options.length === 0) {
      return NextResponse.json(fallbackTrips(input))
    }

    return NextResponse.json({
      dataSource: provider.name,
      outboundDate: dates.outboundDate,
      returnDate: dates.returnDate,
      trips: options.map((option, index) => toScoredTrip(option, input, index)),
    })
  } catch (error) {
    console.error("Flight provider search failed", error)
    return NextResponse.json(fallbackTrips(input))
  }
}
