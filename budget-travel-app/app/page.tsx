"use client"

import { useRef, useState } from "react"
import { Luggage, Plane } from "lucide-react"
import { SearchForm } from "@/components/search-form"
import { TripCard } from "@/components/trip-card"
import type { ScoredTrip, SearchInput } from "@/lib/trips"

type TripSearchResponse = {
  trips: ScoredTrip[]
}

export default function Page() {
  const [results, setResults] = useState<ScoredTrip[] | null>(null)
  const [query, setQuery] = useState<SearchInput | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  async function handleSearch(input: SearchInput) {
    if (isSearching) return

    setQuery(input)
    setIsSearching(true)
    setResults(null)
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    })

    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })

      if (!response.ok) throw new Error("Trip search failed")

      const data = (await response.json()) as TripSearchResponse
      setResults(data.trips)
    } catch {
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Plane className="size-4" aria-hidden="true" />
          </span>
          <span className="font-heading text-lg font-semibold tracking-tight">Layover</span>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
          <a href="#search" className="transition-colors hover:text-foreground">Find trips</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-5 pb-8 pt-6 sm:pt-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary" />
                Budget-first trip discovery
              </span>
              <h1 className="font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl">
                Find the best trip your budget can actually afford
              </h1>
              <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Enter your budget, airport, and travel vibe. We&apos;ll show you the
                top 3 trips with the best balance of price and travel time.
              </p>
              <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
                <div>
                  <div className="font-heading text-2xl font-semibold text-foreground">3</div>
                  curated picks
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <div className="font-heading text-2xl font-semibold text-foreground">$0</div>
                  to search
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-2xl shadow-black/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero-travel.png"
                  alt="Aerial view of a sunny tropical coastline with turquoise water and palm trees"
                  className="size-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section id="search" className="mx-auto max-w-2xl scroll-mt-6 px-5 py-8">
        <SearchForm onSearch={handleSearch} isSearching={isSearching} />
      </section>

      {/* Results */}
      <section
        id="results"
        ref={resultsRef}
        className="mx-auto max-w-5xl scroll-mt-6 px-5 pb-20"
      >
        {isSearching && query && (
          <div className="py-10 text-center">
            <div
              className="travel-loading mx-auto mb-5"
              aria-hidden="true"
            >
              <div className="travel-loading__path" />
              <Luggage className="travel-loading__luggage" />
              <Plane className="travel-loading__plane" />
            </div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              Checking flights
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Looking for {query.vibe.toLowerCase()} trips from {query.airport.toUpperCase()}.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              This may take a few seconds while we compare live fares.
            </p>
          </div>
        )}
        {results && query && (
          <>
            <div className="mb-6 text-center">
              <h2 className="font-heading text-2xl font-semibold tracking-tight">
                {results.length > 0
                  ? "Your top trips"
                  : "No trips matched"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {results.length > 0
                  ? `Based on a $${query.budget} budget from ${query.airport.toUpperCase()} / ${query.vibe} vibe`
                  : "Try raising your budget or allowing more stops."}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </>
        )}
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-5 py-8 text-center text-sm text-muted-foreground">
          Layover: smarter trips for real budgets. Flight prices can change; check availability before booking.
        </div>
      </footer>
    </main>
  )
}
