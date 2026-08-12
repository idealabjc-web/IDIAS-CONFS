import { Link } from 'react-router-dom'
import Img from './Img.jsx'

export function Pin(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
export function Cal(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

/** Lowest ticket price as a display string, or null when unknown. */
export function fromPrice(tickets = []) {
  const nums = tickets
    .map((t) => parseFloat(String(t.price).replace(/[^0-9.]/g, '')))
    .filter((n) => Number.isFinite(n) && n > 0)
  if (!nums.length) return null
  return `$${Math.min(...nums).toLocaleString()}`
}

/** Splits "20 Jul 2026 - 23 Jul 2026" into a compact day/month badge. */
function dateBadge(date) {
  if (!date) return null
  const m = date.match(/^(\d{1,2})\s+([A-Za-z]{3})/)
  if (!m) return null
  return { day: m[1], mon: m[2].toUpperCase() }
}

export default function EventCard({ event, featured = false }) {
  const badge = dateBadge(event.date)

  return (
    <article className="card group flex flex-col">
      <Link to={`/events/${event.slug}`} className="relative block">
        <Img
          src={event.image}
          alt={event.title}
          ratio={featured ? 'aspect-[16/9]' : 'aspect-[16/10]'}
          rounded="rounded-none"
          zoom
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-purpleDeep/80 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

        {badge && (
          <span className="absolute left-5 top-5 flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-white/95 shadow-lg backdrop-blur">
            <span className="text-xl font-black leading-none text-brand-purple">{badge.day}</span>
            <span className="mt-0.5 text-[10px] font-bold tracking-widest text-brand-pink">{badge.mon}</span>
          </span>
        )}

        {event.location && (
          <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white ring-1 ring-white/25 backdrop-blur-md">
            <Pin />
            {event.location}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-7">
        {event.date && (
          <p className="mb-3.5 inline-flex items-center gap-2 text-[13px] font-semibold text-brand-pink">
            <Cal />
            {event.date}
          </p>
        )}

        <h3 className={`font-extrabold leading-snug text-brand-purple transition-colors duration-300 group-hover:text-brand-violet ${featured ? 'text-2xl' : 'text-lg'}`}>
          <Link to={`/events/${event.slug}`}>{event.title}</Link>
        </h3>

        {event.description?.[0] && (
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-soft">
            {event.description[0]}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
          <Link
            to={`/events/${event.slug}`}
            className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-brand-purple transition-colors hover:text-brand-pink"
          >
            View details
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </Link>
          {fromPrice(event.tickets) && (
            <span className="shrink-0 rounded-full bg-brand-purple/[0.07] px-3 py-1 text-[11px] font-bold text-brand-purple">
              from {fromPrice(event.tickets)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
