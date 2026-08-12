import { useMemo, useState } from 'react'
import content from '../data/content.json'
import PageHero from '../components/PageHero.jsx'
import EventCard from '../components/EventCard.jsx'
import CTA from '../components/CTA.jsx'
import Reveal from '../components/Reveal.jsx'
import { byDate } from '../lib/events.js'

export default function Events() {
  const events = useMemo(() => [...(content.events || [])].sort(byDate), [])
  const [q, setQ] = useState('')
  const [city, setCity] = useState('all')
  const [year, setYear] = useState('all')

  const cities = useMemo(
    () => ['all', ...Array.from(new Set(events.map((e) => e.location).filter(Boolean))).sort()],
    [events],
  )
  const years = useMemo(() => {
    const set = new Set()
    events.forEach((e) => {
      const m = (e.date || '').match(/\b(20\d{2})\b/)
      if (m) set.add(m[1])
    })
    return ['all', ...Array.from(set).sort()]
  }, [events])

  const filtered = events.filter((e) => {
    const okQ =
      !q ||
      e.title.toLowerCase().includes(q.toLowerCase()) ||
      (e.location || '').toLowerCase().includes(q.toLowerCase())
    const okCity = city === 'all' || e.location === city
    const okYear = year === 'all' || (e.date || '').includes(year)
    return okQ && okCity && okYear
  })

  const reset = () => { setQ(''); setCity('all'); setYear('all') }
  const active = q || city !== 'all' || year !== 'all'

  return (
    <>
      <PageHero
        kicker="The calendar"
        title="Conferences & Summits"
        subtitle={`${events.length} international congresses on leadership, empowerment, mental wellbeing and resilience.`}
        image={events[0]?.image}
      />

      <section className="py-16 lg:py-24">
        <div className="container-x">
          {/* Filter bar */}
          <Reveal>
            <div className="card mb-12 flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-5 top-1/2 -translate-y-1/2 text-ink-muted">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by name or city..."
                  aria-label="Search conferences"
                  className="w-full rounded-full bg-brand-purple/[0.04] py-3.5 pl-14 pr-5 text-sm outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-2 focus:ring-brand-pink/40"
                />
              </div>

              <div className="flex gap-3">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  aria-label="Filter by location"
                  className="flex-1 rounded-full bg-brand-purple/[0.04] px-5 py-3.5 text-sm font-medium outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-2 focus:ring-brand-pink/40"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>{c === 'all' ? 'All locations' : c}</option>
                  ))}
                </select>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  aria-label="Filter by year"
                  className="rounded-full bg-brand-purple/[0.04] px-5 py-3.5 text-sm font-medium outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-2 focus:ring-brand-pink/40"
                >
                  {years.map((yv) => (
                    <option key={yv} value={yv}>{yv === 'all' ? 'Any year' : yv}</option>
                  ))}
                </select>
              </div>
            </div>
          </Reveal>

          <div className="mb-10 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-ink-soft">
              Showing <span className="text-brand-pink">{filtered.length}</span> of {events.length} congresses
            </p>
            {active && (
              <button type="button" onClick={reset} className="text-[13px] font-bold uppercase tracking-wider text-brand-purple hover:text-brand-pink">
                Clear filters
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((e, i) => (
                <Reveal key={e.slug} delay={(i % 3) * 90}>
                  <EventCard event={e} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="card p-20 text-center">
              <p className="text-lg font-extrabold text-brand-purple">No congresses match that search.</p>
              <button type="button" onClick={reset} className="btn-ghost mt-7">Clear filters</button>
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  )
}
