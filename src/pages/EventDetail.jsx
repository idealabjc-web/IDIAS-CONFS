import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import content from '../data/content.json'
import {
  getEvent, startDate, groupSessions, isBreak, isOpenSlot,
  sessionSpeaker, sessionRole, lowestPrice, coLocated,
} from '../lib/events.js'
import Img from '../components/Img.jsx'
import Reveal from '../components/Reveal.jsx'
import Countdown from '../components/Countdown.jsx'
import EventCard, { Pin, Cal } from '../components/EventCard.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { useScrollY, prefersReducedMotion } from '../hooks/useMotion.js'

function Clock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

export default function EventDetail() {
  const { slug } = useParams()
  const event = getEvent(slug)
  const [day, setDay] = useState(0)
  const y = useScrollY()
  const reduce = prefersReducedMotion()

  // Navigating between two events keeps this component mounted, so the
  // selected day has to reset or it can point past the new agenda.
  useEffect(() => { setDay(0) }, [slug])

  if (!event) return <Navigate to="/events" replace />

  const days = groupSessions(event.sessions, event.days)
  const start = startDate(event)
  const from = lowestPrice(event.tickets)
  const siblings = coLocated(event)
  const speakers = (content.speakers || []).slice(0, 8)
  const bgY = reduce ? 0 : Math.min(y * 0.3, 240)

  const chips = [
    event.date && { icon: <Cal />, label: event.date },
    event.location && { icon: <Pin />, label: event.location },
    event.time && {
      icon: <Clock />,
      label: `${event.time}${event.timezone ? ` (${event.timezone})` : ''}`,
    },
  ].filter(Boolean)

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative isolate overflow-hidden bg-brand-purpleDeep">
        <div
          className="absolute inset-x-0 -top-20 bottom-[-20%] will-change-transform"
          style={{ transform: `translate3d(0, ${bgY}px, 0) scale(1.1)` }}
        >
          <img src={event.image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purpleDeep/96 via-brand-purple/85 to-brand-violet/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-purpleDeep to-transparent" />
        <div className="noise absolute inset-0" />
        <div className="orb -right-40 top-0 h-[30rem] w-[30rem] animate-floaty bg-brand-pink/25" />

        <div className="container-x relative z-10 py-24 lg:py-32">
          <nav aria-label="Breadcrumb" className="mb-7 text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">
            <Link to="/" className="transition-colors hover:text-brand-pink">Home</Link>
            <span className="mx-2.5">/</span>
            <Link to="/events" className="transition-colors hover:text-brand-pink">Events</Link>
          </nav>

          <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:items-end">
            <div>
              <h1 className="h-display max-w-3xl text-white">{event.title}</h1>

              <div className="mt-8 flex flex-wrap gap-3">
                {chips.map((c) => (
                  <span
                    key={c.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-[13px] font-semibold text-white backdrop-blur-md"
                  >
                    <span className="text-brand-pink">{c.icon}</span>
                    {c.label}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#tickets" className="btn-primary">
                  Register interest
                </a>
                {days.length > 0 && (
                  <a href="#programme" className="btn-outline">View programme</a>
                )}
              </div>
            </div>

            {start && (
              <div className="lg:pb-2">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.26em] text-white/45">
                  Doors open in
                </p>
                <Countdown target={start} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- BODY ---------------- */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_390px] lg:items-start">
          {/* main column */}
          <div className="min-w-0">
            {event.description?.length > 0 ? (
              <Reveal>
                <div className="card p-8 sm:p-11">
                  <span className="eyebrow">About the congress</span>
                  <h2 className="mb-7 text-2xl font-extrabold text-brand-purple sm:text-3xl">
                    What this summit sets out to do
                  </h2>
                  <div className="space-y-5">
                    {event.description.map((p, i) => (
                      <p key={i} className="text-[15px] leading-[1.85] text-ink-soft">{p}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <div className="card border border-dashed border-brand-purple/20 p-8 sm:p-11">
                  <span className="eyebrow">About the congress</span>
                  <h2 className="mb-5 text-2xl font-extrabold text-brand-purple">
                    Full brief available on request
                  </h2>
                  <p className="text-[15px] leading-[1.85] text-ink-soft">
                    The detailed scope for this congress has not been published yet. Our team can
                    send you the concept note, the call for abstracts and the draft agenda as soon
                    as they are finalised.
                  </p>
                  <Link to="/contact" state={{ subject: event.title }} className="btn-ghost mt-8">
                    Request the brief
                  </Link>
                </div>
              </Reveal>
            )}

            {/* Programme */}
            {days.length > 0 && (
              <div id="programme" className="mt-14 scroll-mt-28">
                <Reveal>
                  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <span className="eyebrow">Programme</span>
                      <h2 className="text-2xl font-extrabold text-brand-purple sm:text-3xl">
                        {days.length}-day agenda
                      </h2>
                    </div>
                    <span className="rounded-full bg-brand-purple/[0.07] px-4 py-1.5 text-xs font-bold text-brand-purple">
                      {event.sessions.length} sessions
                    </span>
                  </div>
                </Reveal>

                {event.sharedProgrammeFrom && (
                  <Reveal>
                    <p className="mb-6 flex items-start gap-3 rounded-2xl bg-brand-purple/[0.05] p-4 text-[13px] leading-relaxed text-ink-soft">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0 text-brand-pink"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                      <span>
                        Joint programme, shared with the co-located congresses at this venue
                        (published under <strong>{event.sharedProgrammeFrom}</strong>). Confirm your
                        session times with the organisers when you register.
                      </span>
                    </p>
                  </Reveal>
                )}

                {/* Day tabs */}
                <Reveal>
                  <div className="no-scrollbar -mx-1 mb-7 flex gap-2.5 overflow-x-auto px-1 pb-1">
                    {days.map((d, i) => (
                      <button
                        key={d.label}
                        type="button"
                        onClick={() => setDay(i)}
                        aria-pressed={day === i}
                        className={`shrink-0 rounded-full px-5 py-2.5 text-[13px] font-bold transition-all duration-300 ${
                          day === i
                            ? 'bg-brand-gradient text-white shadow-glow'
                            : 'bg-white text-brand-purple ring-1 ring-brand-purple/12 hover:ring-brand-pink/40'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </Reveal>

                {/* Timeline */}
                <div className="card overflow-hidden p-2 sm:p-4">
                  <ol className="relative">
                    {days[day]?.sessions.map((s, i) => {
                      const brk = isBreak(s.title)
                      const open = isOpenSlot(s.title)
                      const who = sessionSpeaker(s.title)
                      const role = sessionRole(s.title)
                      return (
                        <li
                          key={`${s.time}-${i}`}
                          className="group/row relative flex gap-5 rounded-2xl px-4 py-4 transition-colors hover:bg-brand-purple/[0.035] sm:gap-7 sm:px-5"
                        >
                          {/* rail */}
                          <div className="relative flex w-[86px] shrink-0 flex-col items-end sm:w-[104px]">
                            <span className="text-[13px] font-bold tabular-nums text-brand-purple">
                              {(s.time || '').split('-')[0]?.trim()}
                            </span>
                            <span className="mt-0.5 text-[11px] tabular-nums text-ink-muted">
                              {(s.time || '').split('-')[1]?.trim()}
                            </span>
                          </div>

                          <div className="relative flex shrink-0 flex-col items-center">
                            <span
                              className={`mt-1.5 h-3 w-3 rounded-full ring-4 transition-all ${
                                brk
                                  ? 'bg-ink-muted/40 ring-ink-muted/10'
                                  : open
                                    ? 'bg-white ring-brand-purple/15'
                                    : 'bg-brand-pink ring-brand-pink/15'
                              }`}
                            />
                            {i < days[day].sessions.length - 1 && (
                              <span className="mt-1 w-px flex-1 bg-gradient-to-b from-brand-purple/15 to-transparent" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1 pb-1">
                            {who ? (
                              <>
                                <p className="text-[15px] font-extrabold leading-snug text-brand-purple">
                                  {who}
                                </p>
                                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-pink">
                                  {role}
                                </p>
                              </>
                            ) : (
                              <p
                                className={`text-[15px] font-bold leading-snug ${
                                  brk ? 'text-ink-soft' : open ? 'text-ink-muted' : 'text-brand-purple'
                                }`}
                              >
                                {s.title}
                              </p>
                            )}
                            {open && (
                              <Link
                                to="/contact"
                                state={{ subject: `${event.title} - speaking slot` }}
                                className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-brand-violet opacity-0 transition-opacity group-hover/row:opacity-100"
                              >
                                Claim this slot
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                              </Link>
                            )}
                          </div>
                        </li>
                      )
                    })}
                  </ol>
                </div>
              </div>
            )}

            {/* Speakers strip */}
            <div className="mt-14">
              <Reveal>
                <div className="mb-7 flex items-end justify-between gap-4">
                  <div>
                    <span className="eyebrow">On our stages</span>
                    <h2 className="text-2xl font-extrabold text-brand-purple sm:text-3xl">
                      Speakers from the i-DIAS faculty
                    </h2>
                  </div>
                  <Link to="/speakers" className="hidden shrink-0 text-[13px] font-bold uppercase tracking-wider text-brand-purple hover:text-brand-pink sm:block">
                    See all
                  </Link>
                </div>
              </Reveal>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {speakers.map((s, i) => (
                  <Reveal key={s.name} delay={i * 55} variant="zoom">
                    <figure className="group relative overflow-hidden rounded-2xl">
                      <Img src={s.image} alt={s.name} ratio="aspect-square" rounded="rounded-2xl" position="object-top" zoom />
                      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-purpleDeep via-brand-purpleDeep/80 to-transparent p-3.5 pt-10">
                        <p className="truncate text-[13px] font-extrabold text-white">{s.name}</p>
                        {s.role && <p className="truncate text-[10px] uppercase tracking-wide text-brand-pink">{s.role}</p>}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
            {/* Venue & Co-located cards grid */}
            {(event.location || siblings.length > 0) && (
              <div className="mt-14">
                <div className={`grid gap-6 ${event.location && siblings.length > 0 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                  {/* Venue */}
                  {event.location && (
                    <div className="card p-7">
                      <span className="eyebrow">Venue</span>
                      <p className="text-lg font-extrabold text-brand-purple">{event.location}</p>
                      {event.time && (
                        <p className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
                          <Clock />
                          {event.time} {event.timezone && <span className="text-ink-muted">({event.timezone})</span>}
                        </p>
                      )}
                      <a
                        href={`https://www.google.com/maps/search/${encodeURIComponent(event.location)}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="btn-ghost mt-6 w-full !px-4 !text-[11px]"
                      >
                        Open in maps
                      </a>
                    </div>
                  )}

                  {/* Co-located */}
                  {siblings.length > 0 && (
                    <div className="card p-7">
                      <span className="eyebrow">Same venue, same dates</span>
                      <ul className="space-y-4">
                        {siblings.slice(0, 4).map((s) => (
                          <li key={s.slug}>
                            <Link to={`/events/${s.slug}`} className="group flex gap-3.5">
                              <img src={s.image} alt="" loading="lazy" className="h-14 w-20 shrink-0 rounded-xl object-cover" />
                              <span className="min-w-0">
                                <span className="line-clamp-2 text-[13px] font-bold leading-snug text-brand-purple transition-colors group-hover:text-brand-pink">
                                  {s.title}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ---------------- SIDEBAR ---------------- */}
          <aside id="tickets" className="scroll-mt-28 lg:sticky lg:top-28">
            <div className="card overflow-hidden">
              <div className="relative bg-brand-gradient p-7 text-white">
                <div className="noise absolute inset-0" />
                <div className="relative">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/70">
                    Registration
                  </p>
                  <p className="mt-1 font-display text-2xl font-black">
                    Passes & Pricing
                  </p>
                </div>
              </div>

              {event.tickets?.length > 0 ? (
                <>
                  {event.sharedTicketsFrom && (
                    <p className="border-b border-black/5 bg-brand-purple/[0.04] px-6 py-3 text-[11px] leading-relaxed text-ink-soft">
                      Pricing published for the co-located <strong>{event.sharedTicketsFrom}</strong>.
                      Confirm on enquiry.
                    </p>
                  )}
                  <ul className="divide-y divide-black/5">
                    {event.tickets.map((t) => (
                      <li key={t.name} className="flex items-center justify-between gap-4 px-6 py-4">
                        <span className="text-[13px] font-semibold leading-snug text-ink">{t.name}</span>
                        <span className="shrink-0 font-display text-base font-black text-brand-violet">
                          {t.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="px-6 py-7 text-sm leading-relaxed text-ink-soft">
                  Ticket tiers for this congress have not been published yet. Send us an enquiry and
                  we will share pricing, group rates and accommodation add-ons.
                </p>
              )}

              <div className="border-t border-black/5 p-6">
                <Link to="/contact" state={{ subject: event.title }} className="btn-primary w-full">
                  Register interest
                </Link>
                <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-ink-muted">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0 text-brand-pink"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
                  100% refund policy. Virtual attendance available as a backup to in-person.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <SectionTitle eyebrow="Keep exploring" title="Other upcoming congresses" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {content.events
              .filter((e) => e.slug !== event.slug)
              .slice(0, 3)
              .map((e, i) => (
                <Reveal key={e.slug} delay={i * 90}>
                  <EventCard event={e} />
                </Reveal>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
