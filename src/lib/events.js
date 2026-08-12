import content from '../data/content.json'

export const events = content.events || []

export function getEvent(slug) {
  return events.find((e) => e.slug === slug) || null
}

const MONTHS = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
}

/**
 * "20 Jul 2026 - 23 Jul 2026" -> Date for the first day (local midnight).
 * Built from parts rather than Date.parse, which is implementation-defined
 * for non-ISO strings.
 */
export function startDate(event) {
  const m = (event?.date || '').match(/^(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{4})/)
  if (!m) return null
  const month = MONTHS[m[2].slice(0, 3).toLowerCase()]
  if (month === undefined) return null
  const d = new Date(Number(m[3]), month, Number(m[1]), 0, 0, 0, 0)
  return Number.isNaN(d.getTime()) ? null : d
}

export function isUpcoming(event, now = new Date()) {
  const d = startDate(event)
  return d ? d.getTime() >= now.getTime() : true
}

/** Sorts by start date, undated last. */
export function byDate(a, b) {
  const da = startDate(a)
  const db = startDate(b)
  if (da && db) return da - db
  if (da) return -1
  if (db) return 1
  return 0
}

/** Minutes since midnight from "07:30 - 08:00". */
function startMinutes(time) {
  const m = String(time || '').match(/(\d{1,2}):(\d{2})/)
  return m ? Number(m[1]) * 60 + Number(m[2]) : null
}

/**
 * The scraped session list is every day concatenated. Split it wherever the
 * clock goes backwards, capped at the number of day labels so the counts
 * always line up.
 */
export function groupSessions(sessions = [], dayLabels = []) {
  if (!sessions.length) return []
  const maxGroups = Math.max(1, dayLabels.length || 1)
  const groups = []
  let cur = []
  let prev = -1

  sessions.forEach((s) => {
    const mins = startMinutes(s.time)
    const val = mins === null ? prev : mins
    if (val < prev && cur.length && groups.length < maxGroups - 1) {
      groups.push(cur)
      cur = []
    }
    cur.push(s)
    prev = val
  })
  if (cur.length) groups.push(cur)

  return groups.map((sessions, i) => ({
    label: dayLabels[i] || `Day ${i + 1}`,
    sessions,
  }))
}

/** Break helpers so the timeline can style them differently. */
export function isBreak(title = '') {
  return /break|lunch|ceremony|registration|networking|closing/i.test(title)
}
export function isOpenSlot(title = '') {
  return /slot available/i.test(title)
}

/** Speaker name out of "Keynote Speaker / Jane Doe". */
export function sessionSpeaker(title = '') {
  const parts = title.split('/')
  return parts.length > 1 ? parts.slice(1).join('/').trim() : null
}
export function sessionRole(title = '') {
  const parts = title.split('/')
  return parts.length > 1 ? parts[0].trim() : title.trim()
}

export function lowestPrice(tickets = []) {
  const nums = tickets
    .map((t) => parseFloat(String(t.price).replace(/[^0-9.]/g, '')))
    .filter((n) => Number.isFinite(n) && n > 0)
  return nums.length ? Math.min(...nums) : null
}

/** Other events at the same city on the same dates. */
export function coLocated(event) {
  if (!event) return []
  const norm = (s) => String(s || '').toLowerCase().replace(/[.,\s]/g, '')
  return events.filter(
    (e) =>
      e.slug !== event.slug &&
      norm(e.location) === norm(event.location) &&
      e.date === event.date,
  )
}
