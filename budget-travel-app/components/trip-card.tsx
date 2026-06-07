"use client"

import { useState } from "react"
import { Clock, Plane, MapPin, Check, Heart, Sparkles, Zap, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { type ScoredTrip, stopsLabel, travelTimeLabel } from "@/lib/trips"

const BADGE_STYLES: Record<string, { className: string; icon: typeof Tag }> = {
  "Best Deal": {
    className: "bg-primary text-primary-foreground",
    icon: Tag,
  },
  "Shortest Travel": {
    className: "bg-accent text-accent-foreground",
    icon: Zap,
  },
  "Best Vibe Match": {
    className: "bg-secondary text-secondary-foreground border border-border",
    icon: Sparkles,
  },
}

export function TripCard({ trip }: { trip: ScoredTrip }) {
  const [saved, setSaved] = useState(false)
  const badge = trip.badge ? BADGE_STYLES[trip.badge] : null
  const BadgeIcon = badge?.icon

  return (
    <Card className="flex flex-col overflow-hidden rounded-3xl border-border p-0 shadow-sm transition-shadow hover:shadow-lg">
      <div className="flex items-start justify-between gap-3 p-6 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden="true" />
            {trip.region}
          </div>
          <h3 className="font-heading text-xl font-semibold leading-tight text-foreground text-balance">
            {trip.destination}
          </h3>
        </div>
        {badge && BadgeIcon && (
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
              badge.className,
            )}
          >
            <BadgeIcon className="size-3" aria-hidden="true" />
            {trip.badge}
          </span>
        )}
      </div>

      <div className="px-6">
        <div className="flex items-end gap-1">
          <span className="text-3xl font-bold tracking-tight text-foreground">
            ${trip.price}
          </span>
          <span className="pb-1 text-sm text-muted-foreground">est. round-trip</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden border-y border-border bg-border">
        <div className="flex items-center gap-2 bg-card px-6 py-3">
          <Clock className="size-4 text-muted-foreground" aria-hidden="true" />
          <div className="leading-tight">
            <div className="text-sm font-medium text-foreground">
              {travelTimeLabel(trip.travelMinutes)}
            </div>
            <div className="text-xs text-muted-foreground">Travel time</div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-card px-6 py-3">
          <Plane className="size-4 text-muted-foreground" aria-hidden="true" />
          <div className="leading-tight">
            <div className="text-sm font-medium text-foreground">
              {stopsLabel(trip.stops)}
            </div>
            <div className="text-xs text-muted-foreground">Stops</div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {trip.matchReason}
        </p>
        <Button
          variant={saved ? "secondary" : "outline"}
          className="mt-5 w-full gap-2 rounded-xl"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
        >
          {saved ? (
            <>
              <Check className="size-4" aria-hidden="true" />
              Saved
            </>
          ) : (
            <>
              <Heart className="size-4" aria-hidden="true" />
              Save Trip
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
