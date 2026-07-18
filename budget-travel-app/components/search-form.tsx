"use client"

import type React from "react"
import { useId, useMemo, useRef, useState } from "react"
import { Plane, Wallet, CalendarDays, Compass, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  type Airport,
  findAirportByCode,
  searchAirports,
} from "@/lib/airports"
import { cn } from "@/lib/utils"
import type { SearchInput, Stops, Vibe } from "@/lib/trips"

const VIBES: Vibe[] = [
  "Beach",
  "City",
  "Mountains",
  "International",
  "Solo Reset",
  "Girls Trip",
  "Romantic",
]

export function SearchForm({
  onSearch,
  isSearching = false,
}: {
  onSearch: (input: SearchInput) => void
  isSearching?: boolean
}) {
  const airportInputId = useId()
  const airportListboxId = useId()
  const airportBlurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [airportQuery, setAirportQuery] = useState("")
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null)
  const [isAirportListOpen, setIsAirportListOpen] = useState(false)
  const [activeAirportIndex, setActiveAirportIndex] = useState(0)
  const [airportError, setAirportError] = useState("")
  const [budget, setBudget] = useState("")
  const [dates, setDates] = useState("flexible")
  const [vibe, setVibe] = useState<Vibe>("Beach")
  const [stops, setStops] = useState<Stops>("nonstop")
  const airportSuggestions = useMemo(() => searchAirports(airportQuery, 6), [airportQuery])

  function airportLabel(airport: Airport) {
    return `${airport.city}, ${airport.stateOrCountry} (${airport.code})`
  }

  function airportSuggestionLabel(airport: Airport) {
    return `${airport.city}, ${airport.stateOrCountry} - ${airport.name} (${airport.code})`
  }

  function selectAirport(airport: Airport) {
    setSelectedAirport(airport)
    setAirportQuery(airportLabel(airport))
    setAirportError("")
    setIsAirportListOpen(false)
    setActiveAirportIndex(0)
  }

  function resolveAirport() {
    const trimmedQuery = airportQuery.trim()
    if (!trimmedQuery) {
      setAirportError("Choose your home airport.")
      return null
    }

    if (selectedAirport && airportLabel(selectedAirport) === trimmedQuery) {
      return selectedAirport
    }

    const codeMatch = /^[A-Za-z]{3}$/.test(trimmedQuery)
      ? findAirportByCode(trimmedQuery)
      : null

    if (codeMatch) {
      selectAirport(codeMatch)
      return codeMatch
    }

    const matches = searchAirports(trimmedQuery, 2)
    if (matches.length === 1) {
      selectAirport(matches[0])
      return matches[0]
    }

    setAirportError(
      matches.length === 0
        ? "No matching airports found. Try a city, airport name, or three-letter code."
        : "Select an airport from the suggestions so we know where to search from.",
    )
    setIsAirportListOpen(true)
    return null
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isSearching) return

    const resolvedAirport = resolveAirport()
    if (!resolvedAirport) return

    const parsedBudget = Number.parseInt(budget, 10)
    onSearch({
      airport: resolvedAirport.code,
      budget: Number.isFinite(parsedBudget) && parsedBudget > 0 ? parsedBudget : 400,
      dates,
      vibe,
      stops,
    })
  }

  function handleAirportChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAirportQuery(e.target.value)
    setSelectedAirport(null)
    setAirportError("")
    setActiveAirportIndex(0)
    setIsAirportListOpen(true)
  }

  function handleAirportKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setIsAirportListOpen(true)
      setActiveAirportIndex((index) =>
        airportSuggestions.length === 0 ? 0 : (index + 1) % airportSuggestions.length,
      )
      return
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      setIsAirportListOpen(true)
      setActiveAirportIndex((index) =>
        airportSuggestions.length === 0
          ? 0
          : (index - 1 + airportSuggestions.length) % airportSuggestions.length,
      )
      return
    }

    if (
      e.key === "Enter" &&
      isAirportListOpen &&
      airportSuggestions[activeAirportIndex] &&
      !findAirportByCode(airportQuery)
    ) {
      e.preventDefault()
      selectAirport(airportSuggestions[activeAirportIndex])
      return
    }

    if (e.key === "Escape") {
      setIsAirportListOpen(false)
    }
  }

  function handleAirportBlur() {
    airportBlurTimeoutRef.current = setTimeout(() => {
      setIsAirportListOpen(false)
    }, 120)
  }

  function handleAirportFocus() {
    if (airportBlurTimeoutRef.current) {
      clearTimeout(airportBlurTimeoutRef.current)
    }
    setIsAirportListOpen(true)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-5 shadow-xl shadow-black/5 sm:p-7"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Airport */}
        <div className="relative space-y-2">
          <Label htmlFor={airportInputId} className="flex items-center gap-2 text-sm font-medium">
            <Plane className="size-4 text-primary" aria-hidden="true" />
            Home airport
          </Label>
          <Input
            id={airportInputId}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isAirportListOpen}
            aria-controls={airportListboxId}
            aria-activedescendant={
              isAirportListOpen && airportSuggestions[activeAirportIndex]
                ? `${airportListboxId}-${airportSuggestions[activeAirportIndex].code}`
                : undefined
            }
            aria-invalid={Boolean(airportError)}
            aria-describedby={airportError ? `${airportInputId}-error` : undefined}
            placeholder="City or airport, e.g. Oklahoma City or OKC"
            value={airportQuery}
            onBlur={handleAirportBlur}
            onChange={handleAirportChange}
            onFocus={handleAirportFocus}
            onKeyDown={handleAirportKeyDown}
            className="h-12 rounded-xl"
            autoComplete="off"
          />
          {isAirportListOpen && airportQuery.trim() && (
            <div
              id={airportListboxId}
              role="listbox"
              className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-xl shadow-black/10"
            >
              {airportSuggestions.length > 0 ? (
                airportSuggestions.map((airport, index) => (
                  <button
                    id={`${airportListboxId}-${airport.code}`}
                    key={airport.code}
                    type="button"
                    role="option"
                    aria-selected={index === activeAirportIndex}
                    className={cn(
                      "flex w-full flex-col px-4 py-3 text-left text-sm transition-colors",
                      index === activeAirportIndex
                        ? "bg-primary/10 text-foreground"
                        : "hover:bg-muted",
                    )}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => setActiveAirportIndex(index)}
                    onClick={() => selectAirport(airport)}
                  >
                    <span className="font-medium">{airportSuggestionLabel(airport)}</span>
                    <span className="text-xs text-muted-foreground">
                      {airport.aliases.slice(0, 3).join(" / ")}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-muted-foreground">
                  No matching airports found.
                </div>
              )}
            </div>
          )}
          {airportError && (
            <p id={`${airportInputId}-error`} className="text-sm text-destructive">
              {airportError}
            </p>
          )}
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label htmlFor="budget" className="flex items-center gap-2 text-sm font-medium">
            <Wallet className="size-4 text-primary" aria-hidden="true" />
            Budget (round-trip)
          </Label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <Input
              id="budget"
              type="number"
              inputMode="numeric"
              min={0}
              placeholder="400"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="h-12 rounded-xl pl-7"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <CalendarDays className="size-4 text-primary" aria-hidden="true" />
            Travel dates
          </Label>
          <Select value={dates} onValueChange={setDates}>
            <SelectTrigger className="h-12 w-full rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flexible">I&apos;m flexible</SelectItem>
              <SelectItem value="this-weekend">This weekend</SelectItem>
              <SelectItem value="next-month">Next month</SelectItem>
              <SelectItem value="summer">This summer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Vibe */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Compass className="size-4 text-primary" aria-hidden="true" />
            Trip vibe
          </Label>
          <Select value={vibe} onValueChange={(v) => setVibe(v as Vibe)}>
            <SelectTrigger className="h-12 w-full rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {VIBES.map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stops */}
        <div className="space-y-2 md:col-span-2">
          <Label className="text-sm font-medium">Max stops</Label>
          <Select value={stops} onValueChange={(v) => setStops(v as Stops)}>
            <SelectTrigger className="h-12 w-full rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nonstop">Nonstop preferred</SelectItem>
              <SelectItem value="one">1 stop okay</SelectItem>
              <SelectItem value="cheapest">Cheapest okay</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSearching}
        className="mt-6 h-13 w-full gap-2 rounded-xl text-base font-semibold"
      >
        {isSearching ? "Checking flights" : "Find Trips"}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Button>
    </form>
  )
}
