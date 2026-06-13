function formatDate(date: Date) {
  return date.toISOString().slice(0, 10)
}

function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function nextFriday(from: Date) {
  const friday = new Date(from)
  const day = friday.getDay()
  const daysUntilFriday = (5 - day + 7) % 7 || 7
  friday.setDate(friday.getDate() + daysUntilFriday)
  return friday
}

export function resolveTravelDates(selection: string) {
  const today = new Date()

  if (selection === "this-weekend") {
    const outbound = nextFriday(today)
    return {
      outboundDate: formatDate(outbound),
      returnDate: formatDate(addDays(outbound, 2)),
    }
  }

  if (selection === "next-month") {
    const outbound = addDays(today, 35)
    return {
      outboundDate: formatDate(outbound),
      returnDate: formatDate(addDays(outbound, 5)),
    }
  }

  if (selection === "summer") {
    const year = today.getMonth() > 7 ? today.getFullYear() + 1 : today.getFullYear()
    const outbound = new Date(Date.UTC(year, 6, 10))
    return {
      outboundDate: formatDate(outbound),
      returnDate: formatDate(addDays(outbound, 5)),
    }
  }

  const outbound = addDays(today, 30)
  return {
    outboundDate: formatDate(outbound),
    returnDate: formatDate(addDays(outbound, 4)),
  }
}
