import type { SearchInput, TripOption } from "@/lib/trips"

export type FlightSearchRequest = SearchInput & {
  outboundDate: string
  returnDate: string
}

export type FlightProvider = {
  name: string
  searchTrips(input: FlightSearchRequest): Promise<TripOption[]>
}

export type DestinationCandidate = {
  destination: string
  airport: string
}
