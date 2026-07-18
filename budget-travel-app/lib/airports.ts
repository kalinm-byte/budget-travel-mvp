export type Airport = {
  code: string
  city: string
  stateOrCountry: string
  name: string
  aliases: string[]
}

export const AIRPORTS: Airport[] = [
  {
    code: "OKC",
    city: "Oklahoma City",
    stateOrCountry: "OK",
    name: "Will Rogers World Airport",
    aliases: ["Oklahoma City", "Will Rogers", "Will Rogers World", "OKC"],
  },
  {
    code: "DFW",
    city: "Dallas",
    stateOrCountry: "TX",
    name: "Dallas Fort Worth International Airport",
    aliases: ["Dallas", "Dallas Fort Worth", "DFW", "Fort Worth"],
  },
  {
    code: "DAL",
    city: "Dallas",
    stateOrCountry: "TX",
    name: "Dallas Love Field",
    aliases: ["Dallas", "Love Field", "Dallas Love", "DAL"],
  },
  {
    code: "AUS",
    city: "Austin",
    stateOrCountry: "TX",
    name: "Austin-Bergstrom International Airport",
    aliases: ["Austin", "Austin Bergstrom", "AUS"],
  },
  {
    code: "IAH",
    city: "Houston",
    stateOrCountry: "TX",
    name: "George Bush Intercontinental Airport",
    aliases: ["Houston", "George Bush", "Bush Intercontinental", "IAH"],
  },
  {
    code: "HOU",
    city: "Houston",
    stateOrCountry: "TX",
    name: "William P. Hobby Airport",
    aliases: ["Houston", "Hobby", "Houston Hobby", "HOU"],
  },
  {
    code: "JFK",
    city: "New York",
    stateOrCountry: "NY",
    name: "John F. Kennedy International Airport",
    aliases: ["New York", "NYC", "JFK", "Kennedy"],
  },
  {
    code: "LGA",
    city: "New York",
    stateOrCountry: "NY",
    name: "LaGuardia Airport",
    aliases: ["New York", "NYC", "LaGuardia", "LGA"],
  },
  {
    code: "EWR",
    city: "Newark",
    stateOrCountry: "NJ",
    name: "Newark Liberty International Airport",
    aliases: ["New York", "NYC", "Newark", "Newark Liberty", "EWR"],
  },
  {
    code: "LAX",
    city: "Los Angeles",
    stateOrCountry: "CA",
    name: "Los Angeles International Airport",
    aliases: ["Los Angeles", "LA", "LAX"],
  },
  {
    code: "ORD",
    city: "Chicago",
    stateOrCountry: "IL",
    name: "O'Hare International Airport",
    aliases: ["Chicago", "O'Hare", "Ohare", "ORD"],
  },
  {
    code: "ATL",
    city: "Atlanta",
    stateOrCountry: "GA",
    name: "Hartsfield-Jackson Atlanta International Airport",
    aliases: ["Atlanta", "Hartsfield", "ATL"],
  },
  {
    code: "DEN",
    city: "Denver",
    stateOrCountry: "CO",
    name: "Denver International Airport",
    aliases: ["Denver", "DIA", "DEN"],
  },
  {
    code: "SFO",
    city: "San Francisco",
    stateOrCountry: "CA",
    name: "San Francisco International Airport",
    aliases: ["San Francisco", "Bay Area", "SFO"],
  },
  {
    code: "SEA",
    city: "Seattle",
    stateOrCountry: "WA",
    name: "Seattle-Tacoma International Airport",
    aliases: ["Seattle", "SeaTac", "Seattle Tacoma", "SEA"],
  },
  {
    code: "MIA",
    city: "Miami",
    stateOrCountry: "FL",
    name: "Miami International Airport",
    aliases: ["Miami", "MIA"],
  },
  {
    code: "BOS",
    city: "Boston",
    stateOrCountry: "MA",
    name: "Boston Logan International Airport",
    aliases: ["Boston", "Logan", "BOS"],
  },
  {
    code: "PHX",
    city: "Phoenix",
    stateOrCountry: "AZ",
    name: "Phoenix Sky Harbor International Airport",
    aliases: ["Phoenix", "Sky Harbor", "PHX"],
  },
  {
    code: "LAS",
    city: "Las Vegas",
    stateOrCountry: "NV",
    name: "Harry Reid International Airport",
    aliases: ["Las Vegas", "Vegas", "Harry Reid", "LAS"],
  },
  {
    code: "SAN",
    city: "San Diego",
    stateOrCountry: "CA",
    name: "San Diego International Airport",
    aliases: ["San Diego", "SAN"],
  },
  {
    code: "MSY",
    city: "New Orleans",
    stateOrCountry: "LA",
    name: "Louis Armstrong New Orleans International Airport",
    aliases: ["New Orleans", "NOLA", "Louis Armstrong", "MSY"],
  },
  {
    code: "MCO",
    city: "Orlando",
    stateOrCountry: "FL",
    name: "Orlando International Airport",
    aliases: ["Orlando", "MCO"],
  },
  {
    code: "TPA",
    city: "Tampa",
    stateOrCountry: "FL",
    name: "Tampa International Airport",
    aliases: ["Tampa", "TPA"],
  },
  {
    code: "DCA",
    city: "Washington",
    stateOrCountry: "DC",
    name: "Ronald Reagan Washington National Airport",
    aliases: ["Washington DC", "Washington", "DC", "Reagan", "National", "DCA"],
  },
  {
    code: "IAD",
    city: "Washington",
    stateOrCountry: "DC",
    name: "Washington Dulles International Airport",
    aliases: ["Washington DC", "Washington", "DC", "Dulles", "IAD"],
  },
  {
    code: "BWI",
    city: "Baltimore",
    stateOrCountry: "MD",
    name: "Baltimore/Washington International Thurgood Marshall Airport",
    aliases: ["Baltimore", "Washington DC", "DC", "BWI"],
  },
  {
    code: "PHL",
    city: "Philadelphia",
    stateOrCountry: "PA",
    name: "Philadelphia International Airport",
    aliases: ["Philadelphia", "Philly", "PHL"],
  },
  {
    code: "CLT",
    city: "Charlotte",
    stateOrCountry: "NC",
    name: "Charlotte Douglas International Airport",
    aliases: ["Charlotte", "Charlotte Douglas", "CLT"],
  },
  {
    code: "MSP",
    city: "Minneapolis",
    stateOrCountry: "MN",
    name: "Minneapolis-Saint Paul International Airport",
    aliases: ["Minneapolis", "St Paul", "Saint Paul", "Twin Cities", "MSP"],
  },
  {
    code: "DTW",
    city: "Detroit",
    stateOrCountry: "MI",
    name: "Detroit Metropolitan Wayne County Airport",
    aliases: ["Detroit", "Detroit Metro", "DTW"],
  },
  {
    code: "SLC",
    city: "Salt Lake City",
    stateOrCountry: "UT",
    name: "Salt Lake City International Airport",
    aliases: ["Salt Lake City", "SLC"],
  },
  {
    code: "PDX",
    city: "Portland",
    stateOrCountry: "OR",
    name: "Portland International Airport",
    aliases: ["Portland", "PDX"],
  },
  {
    code: "CUN",
    city: "Cancun",
    stateOrCountry: "Mexico",
    name: "Cancun International Airport",
    aliases: ["Cancun", "CUN"],
  },
  {
    code: "SJU",
    city: "San Juan",
    stateOrCountry: "Puerto Rico",
    name: "Luis Munoz Marin International Airport",
    aliases: ["San Juan", "Puerto Rico", "SJU"],
  },
  {
    code: "MBJ",
    city: "Montego Bay",
    stateOrCountry: "Jamaica",
    name: "Sangster International Airport",
    aliases: ["Montego Bay", "Jamaica", "Sangster", "MBJ"],
  },
  {
    code: "NAS",
    city: "Nassau",
    stateOrCountry: "Bahamas",
    name: "Lynden Pindling International Airport",
    aliases: ["Nassau", "Bahamas", "NAS"],
  },
  {
    code: "SJD",
    city: "Cabo San Lucas",
    stateOrCountry: "Mexico",
    name: "Los Cabos International Airport",
    aliases: ["Cabo", "Cabo San Lucas", "Los Cabos", "SJD"],
  },
  {
    code: "MEX",
    city: "Mexico City",
    stateOrCountry: "Mexico",
    name: "Mexico City International Airport",
    aliases: ["Mexico City", "CDMX", "MEX"],
  },
  {
    code: "YYZ",
    city: "Toronto",
    stateOrCountry: "Canada",
    name: "Toronto Pearson International Airport",
    aliases: ["Toronto", "Pearson", "YYZ"],
  },
  {
    code: "YUL",
    city: "Montreal",
    stateOrCountry: "Canada",
    name: "Montreal-Trudeau International Airport",
    aliases: ["Montreal", "Trudeau", "YUL"],
  },
  {
    code: "YVR",
    city: "Vancouver",
    stateOrCountry: "Canada",
    name: "Vancouver International Airport",
    aliases: ["Vancouver", "YVR"],
  },
  {
    code: "LIS",
    city: "Lisbon",
    stateOrCountry: "Portugal",
    name: "Humberto Delgado Airport",
    aliases: ["Lisbon", "Portugal", "LIS"],
  },
  {
    code: "LHR",
    city: "London",
    stateOrCountry: "England",
    name: "Heathrow Airport",
    aliases: ["London", "Heathrow", "LHR"],
  },
  {
    code: "CDG",
    city: "Paris",
    stateOrCountry: "France",
    name: "Charles de Gaulle Airport",
    aliases: ["Paris", "Charles de Gaulle", "CDG"],
  },
  {
    code: "BCN",
    city: "Barcelona",
    stateOrCountry: "Spain",
    name: "Barcelona-El Prat Airport",
    aliases: ["Barcelona", "Spain", "BCN"],
  },
  {
    code: "FCO",
    city: "Rome",
    stateOrCountry: "Italy",
    name: "Leonardo da Vinci-Fiumicino Airport",
    aliases: ["Rome", "Fiumicino", "Leonardo da Vinci", "FCO"],
  },
]

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()
}

function startsWithNormalized(value: string, query: string) {
  return normalize(value).startsWith(query)
}

function includesNormalized(value: string, query: string) {
  return normalize(value).includes(query)
}

function rankAirport(airport: Airport, normalizedQuery: string): number | null {
  const code = airport.code.toLowerCase()
  const aliases = airport.aliases

  if (code === normalizedQuery) return 0
  if (startsWithNormalized(airport.city, normalizedQuery)) return 1
  if (aliases.some((alias) => startsWithNormalized(alias, normalizedQuery))) return 1
  if (startsWithNormalized(airport.name, normalizedQuery)) return 2
  if (code.includes(normalizedQuery)) return 3
  if (includesNormalized(airport.city, normalizedQuery)) return 3
  if (includesNormalized(airport.stateOrCountry, normalizedQuery)) return 3
  if (includesNormalized(airport.name, normalizedQuery)) return 3
  if (aliases.some((alias) => includesNormalized(alias, normalizedQuery))) return 3

  return null
}

export function searchAirports(query: string, limit = 6): Airport[] {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) return []

  return AIRPORTS.map((airport, index) => {
    const rank = rankAirport(airport, normalizedQuery)
    return rank === null ? null : { airport, rank, index }
  })
    .filter((result): result is { airport: Airport; rank: number; index: number } => Boolean(result))
    .sort((a, b) => a.rank - b.rank || a.index - b.index)
    .slice(0, limit)
    .map((result) => result.airport)
}

export function findAirportByCode(code: string): Airport | null {
  const normalizedCode = code.trim().toUpperCase()
  return AIRPORTS.find((airport) => airport.code === normalizedCode) ?? null
}
