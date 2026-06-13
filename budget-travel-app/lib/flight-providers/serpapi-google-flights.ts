import type { Stops, TripOption } from "@/lib/trips"
import { getCuratedDestinations } from "./destinations"
import { rankTripOptions } from "./ranking"
import type { DestinationCandidate, FlightProvider, FlightSearchRequest } from "./types"

const SERPAPI_ENDPOINT = "https://serpapi.com/search"

type SerpApiFlightSegment = {
  airline?: string
  flight_number?: string
  departure_airport?: { id?: string }
  arrival_airport?: { id?: string }
}

type SerpApiFlightResult = {
  flights?: SerpApiFlightSegment[]
  layovers?: unknown[]
  total_duration?: number
  price?: number
  type?: string
  booking_token?: string
}

type SerpApiGoogleFlightsResponse = {
  best_flights?: SerpApiFlightResult[]
  other_flights?: SerpApiFlightResult[]
  search_metadata?: {
    google_flights_url?: string
  }
  error?: string
}

function serpApiStops(stops: Stops) {
  if (stops === "nonstop") return "1"
  if (stops === "one") return "2"
  return "3"
}

function flightDetailsUrl(input: FlightSearchRequest, destination: DestinationCandidate) {
  const params = new URLSearchParams({
    hl: "en",
    gl: "us",
    curr: "USD",
    q: `Flights from ${input.airport.toUpperCase()} to ${destination.airport} ${input.outboundDate} ${input.returnDate}`,
  })

  return `https://www.google.com/travel/flights?${params.toString()}`
}

function normalizeResult(
  result: SerpApiFlightResult,
  destination: DestinationCandidate,
  input: FlightSearchRequest,
  googleFlightsUrl?: string,
): TripOption | null {
  if (!result.price || !result.total_duration) return null

  const segments = result.flights ?? []
  const airlines = Array.from(
    new Set(segments.map((flight) => flight.airline).filter((airline): airline is string => Boolean(airline))),
  )
  const airline = airlines.length === 0 ? "Multiple airlines" : airlines.slice(0, 2).join(", ")
  const stops = Math.min(
    2,
    Math.max(0, result.layovers?.length ?? Math.max(segments.length - 1, 0)),
  ) as 0 | 1 | 2
  const firstFlight = segments[0]
  const lastFlight = segments[segments.length - 1]
  const route =
    firstFlight?.departure_airport?.id && lastFlight?.arrival_airport?.id
      ? `${firstFlight.departure_airport.id} to ${lastFlight.arrival_airport.id}`
      : `${input.airport.toUpperCase()} to ${destination.airport}`

  return {
    destination: destination.destination,
    destinationAirport: destination.airport,
    price: result.price,
    currency: "USD",
    travelTimeMinutes: result.total_duration,
    stops,
    airline,
    flightSummary: `${airline} round trip, ${route}`,
    dataSource: "SerpApi Google Flights",
    affiliateProvider: null,
    affiliateUrl: googleFlightsUrl ?? flightDetailsUrl(input, destination),
    affiliateUrlType: result.booking_token ? "availability" : "flight_details",
  }
}

async function searchDestination(
  apiKey: string,
  input: FlightSearchRequest,
  destination: DestinationCandidate,
) {
  const params = new URLSearchParams({
    engine: "google_flights",
    api_key: apiKey,
    departure_id: input.airport.toUpperCase(),
    arrival_id: destination.airport,
    type: "1",
    currency: "USD",
    outbound_date: input.outboundDate,
    return_date: input.returnDate,
    max_price: String(input.budget),
    stops: serpApiStops(input.stops),
    hl: "en",
    gl: "us",
  })

  const response = await fetch(`${SERPAPI_ENDPOINT}?${params.toString()}`, {
    next: { revalidate: 60 * 60 },
  })

  if (!response.ok) {
    throw new Error(`SerpApi returned ${response.status} for ${destination.airport}`)
  }

  const data = (await response.json()) as SerpApiGoogleFlightsResponse
  if (data.error) {
    throw new Error(data.error)
  }

  const flights = [...(data.best_flights ?? []), ...(data.other_flights ?? [])]
  return flights
    .map((flight) =>
      normalizeResult(flight, destination, input, data.search_metadata?.google_flights_url),
    )
    .filter((trip): trip is TripOption => Boolean(trip))
}

export class SerpApiGoogleFlightsProvider implements FlightProvider {
  name = "serpapi-google-flights"

  constructor(private readonly apiKey: string) {}

  async searchTrips(input: FlightSearchRequest) {
    const destinations = getCuratedDestinations(input.vibe, input.airport)
    const settled = await Promise.allSettled(
      destinations.map((destination) => searchDestination(this.apiKey, input, destination)),
    )

    const trips = settled.flatMap((result) =>
      result.status === "fulfilled" ? result.value : [],
    )

    return rankTripOptions(trips, input).slice(0, 3)
  }
}
