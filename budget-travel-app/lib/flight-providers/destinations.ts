import type { Vibe } from "@/lib/trips"
import type { DestinationCandidate } from "./types"

const DESTINATIONS_BY_VIBE: Record<Vibe, DestinationCandidate[]> = {
  Beach: [
    { destination: "Miami, FL", airport: "MIA" },
    { destination: "San Diego, CA", airport: "SAN" },
    { destination: "Honolulu, HI", airport: "HNL" },
    { destination: "San Juan, Puerto Rico", airport: "SJU" },
    { destination: "Nassau, Bahamas", airport: "NAS" },
    { destination: "Cancun, Mexico", airport: "CUN" },
    { destination: "Cabo San Lucas, Mexico", airport: "SJD" },
    { destination: "Montego Bay, Jamaica", airport: "MBJ" },
    { destination: "Vancouver, Canada", airport: "YVR" },
    { destination: "Barcelona, Spain", airport: "BCN" },
  ],
  City: [
    { destination: "New York, NY", airport: "JFK" },
    { destination: "Chicago, IL", airport: "ORD" },
    { destination: "Austin, TX", airport: "AUS" },
    { destination: "Los Angeles, CA", airport: "LAX" },
    { destination: "Toronto, Canada", airport: "YYZ" },
    { destination: "Montreal, Canada", airport: "YUL" },
    { destination: "Mexico City, Mexico", airport: "MEX" },
    { destination: "San Juan, Puerto Rico", airport: "SJU" },
    { destination: "London, England", airport: "LHR" },
    { destination: "Paris, France", airport: "CDG" },
    { destination: "Lisbon, Portugal", airport: "LIS" },
  ],
  Mountains: [
    { destination: "Denver, CO", airport: "DEN" },
    { destination: "Salt Lake City, UT", airport: "SLC" },
    { destination: "Bozeman, MT", airport: "BZN" },
    { destination: "Jackson Hole, WY", airport: "JAC" },
    { destination: "Asheville, NC", airport: "AVL" },
    { destination: "Calgary, Canada", airport: "YYC" },
    { destination: "Vancouver, Canada", airport: "YVR" },
    { destination: "Mexico City, Mexico", airport: "MEX" },
    { destination: "Zurich, Switzerland", airport: "ZRH" },
    { destination: "Munich, Germany", airport: "MUC" },
  ],
  International: [
    { destination: "Cancun, Mexico", airport: "CUN" },
    { destination: "Mexico City, Mexico", airport: "MEX" },
    { destination: "Cabo San Lucas, Mexico", airport: "SJD" },
    { destination: "San Juan, Puerto Rico", airport: "SJU" },
    { destination: "Nassau, Bahamas", airport: "NAS" },
    { destination: "Montego Bay, Jamaica", airport: "MBJ" },
    { destination: "Toronto, Canada", airport: "YYZ" },
    { destination: "Montreal, Canada", airport: "YUL" },
    { destination: "Lisbon, Portugal", airport: "LIS" },
    { destination: "London, England", airport: "LHR" },
    { destination: "Paris, France", airport: "CDG" },
    { destination: "Barcelona, Spain", airport: "BCN" },
  ],
  "Solo Reset": [
    { destination: "Denver, CO", airport: "DEN" },
    { destination: "San Diego, CA", airport: "SAN" },
    { destination: "Portland, OR", airport: "PDX" },
    { destination: "Asheville, NC", airport: "AVL" },
    { destination: "Phoenix, AZ", airport: "PHX" },
    { destination: "San Juan, Puerto Rico", airport: "SJU" },
    { destination: "Cancun, Mexico", airport: "CUN" },
    { destination: "Vancouver, Canada", airport: "YVR" },
    { destination: "Montreal, Canada", airport: "YUL" },
    { destination: "Lisbon, Portugal", airport: "LIS" },
  ],
  "Girls Trip": [
    { destination: "Miami, FL", airport: "MIA" },
    { destination: "New Orleans, LA", airport: "MSY" },
    { destination: "Charleston, SC", airport: "CHS" },
    { destination: "Las Vegas, NV", airport: "LAS" },
    { destination: "San Juan, Puerto Rico", airport: "SJU" },
    { destination: "Nassau, Bahamas", airport: "NAS" },
    { destination: "Cancun, Mexico", airport: "CUN" },
    { destination: "Cabo San Lucas, Mexico", airport: "SJD" },
    { destination: "Toronto, Canada", airport: "YYZ" },
    { destination: "Barcelona, Spain", airport: "BCN" },
  ],
  Romantic: [
    { destination: "Charleston, SC", airport: "CHS" },
    { destination: "Savannah, GA", airport: "SAV" },
    { destination: "San Juan, Puerto Rico", airport: "SJU" },
    { destination: "Nassau, Bahamas", airport: "NAS" },
    { destination: "Cancun, Mexico", airport: "CUN" },
    { destination: "Cabo San Lucas, Mexico", airport: "SJD" },
    { destination: "Quebec City, Canada", airport: "YQB" },
    { destination: "Montreal, Canada", airport: "YUL" },
    { destination: "Lisbon, Portugal", airport: "LIS" },
    { destination: "Paris, France", airport: "CDG" },
    { destination: "Rome, Italy", airport: "FCO" },
  ],
}

export const SERPAPI_DESTINATION_LIMIT = 20

function shuffleDestinations(destinations: DestinationCandidate[]) {
  const shuffled = [...destinations]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const currentDestination = shuffled[index]
    const randomDestination = shuffled[randomIndex]

    shuffled[index] = randomDestination
    shuffled[randomIndex] = currentDestination
  }

  return shuffled
}

export function getCuratedDestinations(vibe: Vibe, departureAirport: string) {
  const departure = departureAirport.toUpperCase()
  const availableDestinations = DESTINATIONS_BY_VIBE[vibe].filter(
    (destination) => destination.airport !== departure,
  )

  return shuffleDestinations(availableDestinations).slice(0, SERPAPI_DESTINATION_LIMIT)
}
