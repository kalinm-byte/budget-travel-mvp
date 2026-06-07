"use client"

import type React from "react"
import { useState } from "react"
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
}: {
  onSearch: (input: SearchInput) => void
}) {
  const [airport, setAirport] = useState("")
  const [budget, setBudget] = useState("")
  const [dates, setDates] = useState("flexible")
  const [vibe, setVibe] = useState<Vibe>("Beach")
  const [stops, setStops] = useState<Stops>("nonstop")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsedBudget = Number.parseInt(budget, 10)
    onSearch({
      airport: airport.trim() || "JFK",
      budget: Number.isFinite(parsedBudget) && parsedBudget > 0 ? parsedBudget : 400,
      dates,
      vibe,
      stops,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-5 shadow-xl shadow-black/5 sm:p-7"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Airport */}
        <div className="space-y-2">
          <Label htmlFor="airport" className="flex items-center gap-2 text-sm font-medium">
            <Plane className="size-4 text-primary" aria-hidden="true" />
            Home airport
          </Label>
          <Input
            id="airport"
            placeholder="e.g. JFK, LAX, ORD"
            value={airport}
            onChange={(e) => setAirport(e.target.value)}
            className="h-12 rounded-xl"
            autoComplete="off"
          />
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
        className="mt-6 h-13 w-full gap-2 rounded-xl text-base font-semibold"
      >
        Find Trips
        <ArrowRight className="size-4" aria-hidden="true" />
      </Button>
    </form>
  )
}
