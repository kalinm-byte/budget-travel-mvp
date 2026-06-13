import type { SearchInput, TripOption } from "@/lib/trips"

function normalize(value: number, min: number, max: number) {
  return max === min ? 0 : (value - min) / (max - min)
}

export function rankTripOptions(trips: TripOption[], input: SearchInput) {
  if (trips.length <= 1) return trips

  const minPrice = Math.min(...trips.map((trip) => trip.price))
  const maxPrice = Math.max(...trips.map((trip) => trip.price))
  const minTime = Math.min(...trips.map((trip) => trip.travelTimeMinutes))
  const maxTime = Math.max(...trips.map((trip) => trip.travelTimeMinutes))

  return [...trips]
    .map((trip) => {
      const overBudgetPenalty = trip.price > input.budget ? 1 : 0
      const budgetFit = Math.abs(input.budget - trip.price) / Math.max(input.budget, trip.price, 1)
      const priceScore = normalize(trip.price, minPrice, maxPrice)
      const timeScore = normalize(trip.travelTimeMinutes, minTime, maxTime)
      const stopScore = trip.stops / 2
      const score =
        overBudgetPenalty * 1.5 +
        budgetFit * 0.4 +
        priceScore * 0.3 +
        timeScore * 0.2 +
        stopScore * 0.1

      return { trip, score }
    })
    .sort((a, b) => a.score - b.score)
    .map(({ trip }) => trip)
}
