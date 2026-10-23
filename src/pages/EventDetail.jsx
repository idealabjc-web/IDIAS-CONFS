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

function matchSpeaker(list, name) {
  if (!name) return null
  const clean = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '')
  const target = clean(name)
  return (list || []).find((sp) => clean(sp.name) === target) || null
}

export default function EventDetail() {
  const { slug } = useParams()
  const event = getEvent(slug)
  const [day, setDay] = useState(0)
  const [zoomed, setZoomed] = useState(null)
  const y = useScrollY()
  const reduce = prefersReducedMotion()

  // Navigating between two events keeps this component mounted, so the
  // selected day has to reset or it can point past the new agenda.
  useEffect(() => { setDay(0); setZoomed(null) }, [slug])

  // Close the agenda lightbox with Escape and lock page scroll while open.
  useEffect(() => {
    if (!zoomed) return undefined
    const onKey = (e) => { if (e.key === 'Escape') setZoomed(null) }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [zoomed])

  if (!event) return <Navigate to="/events" replace />

  const days = groupSessions(event.sessions, event.days)
  const start = startDate(event)
  const from = lowestPrice(event.tickets)
  const siblings = coLocated(event)
  const sessionSpeakerNames = (event.sessions || [])
    .map((s) => sessionSpeaker(s.title))
    .filter(Boolean)
  const eventSpeakers = (content.speakers || []).filter((sp) =>
    sessionSpeakerNames.some((name) => matchSpeaker([sp], name))
  )
  const otherSpeakers = (content.speakers || []).filter(
    (sp) => !eventSpeakers.some((es) => es.name.toLowerCase() === sp.name.toLowerCase())
  )
  const speakers = [...eventSpeakers, ...otherSpeakers].slice(0, 8)
  const bgY = reduce ? 0 : Math.min(y * 0.3, 240)

  const theme =
    event.theme ||
    (event.description || []).find((p) => /^theme\s*:/i.test(p))?.replace(/^theme\s*:\s*/i, '') ||
    null

  const tracks =
    event.tracks ||
    event.topics ||
    (event.description || []).filter(
      (p) =>
        p.length < 80 &&
        !/^theme\s*:/i.test(p) &&
        !/^(the goal|welcome to|our strategy|set against|through keynote|embark on|i-dias|under the theme)/i.test(p)
    )

  const narrative =
    event.about ||
    (event.description || []).filter(
      (p) =>
        !/^theme\s*:/i.test(p) &&
        (p.length >= 80 ||
          /^(the goal|welcome to|our strategy|set against|through keynote|embark on|i-dias)/i.test(p))
    )

  const isVirtual = Boolean(event.isVirtual || event.virtual)
  const chips = [
    event.date && { icon: <Cal />, label: event.date },
    event.location && { icon: <Pin />, label: event.location },
    isVirtual && {
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      ),
      label: 'Virtual Summit (Live Online)',
    },
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
                {event.agendaImages?.length > 0 && (
                  <a href="#agenda" className="btn-outline">View agenda</a>
                )}
                {event.agendaPdf && (
                  <a
                    href={event.agendaPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline inline-flex items-center gap-2"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                    Download Agenda PDF
                  </a>
                )}
                {tracks.length > 0 && (
                  <a href="#sessions" className="btn-outline">
                    Explore sessions
                  </a>
                )}
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

      {/* ---------------- AGENDA POSTERS (virtual events) ---------------- */}
      {event.agendaImages?.length > 0 && (
        <section id="agenda" className="scroll-mt-24 bg-cream pt-20 lg:pt-28">
          <div className="container-x">
            <Reveal>
              <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="eyebrow">Tentative agenda</span>
                  <h2 className="text-2xl font-extrabold text-brand-purple sm:text-3xl">
                    Global Virtual Summit 2026 · 18–20 November
                  </h2>
                </div>
                <p className="text-[13px] font-semibold text-ink-soft">
                  Click an agenda to view it full size.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-2">
              {event.agendaImages.map((a, i) => (
                <Reveal key={a.src} delay={i * 90} variant="zoom">
                  <figure className="card group overflow-hidden p-3 sm:p-4">
                    <button
                      type="button"
                      id={`agenda-image-${i + 1}`}
                      onClick={() => setZoomed(a)}
                      aria-label={`Open ${a.label} agenda full size`}
                      className="relative block w-full overflow-hidden rounded-xl"
                    >
                      <img
                        src={a.src}
                        alt={`Global Virtual Summit 2026 agenda – ${a.label}`}
                        loading="lazy"
                        className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-brand-purpleDeep/0 transition-colors duration-500 group-hover:bg-brand-purpleDeep/35">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[12px] font-bold uppercase tracking-wider text-brand-purple opacity-0 shadow-lg transition-opacity duration-500 group-hover:opacity-100">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                          View full size
                        </span>
                      </span>
                    </button>
                    <figcaption className="flex items-center justify-between gap-3 px-1 pt-4">
                      <span className="inline-flex items-center gap-2 text-[14px] font-extrabold text-brand-purple">
                        <Clock />
                        {a.label}
                      </span>
                      <a
                        href={a.src}
                        download
                        className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-brand-pink hover:text-brand-violet"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                        Download
                      </a>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${zoomed.label} agenda`}
          onClick={() => setZoomed(null)}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-auto bg-brand-purpleDeep/90 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            id="agenda-lightbox-close"
            onClick={() => setZoomed(null)}
            aria-label="Close agenda"
            className="fixed right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-purple shadow-lg transition hover:bg-brand-pink hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
          <img
            src={zoomed.src}
            alt={`Global Virtual Summit 2026 agenda – ${zoomed.label}`}
            onClick={(e) => e.stopPropagation()}
            className="my-auto h-auto w-full max-w-6xl rounded-xl shadow-2xl"
          />
        </div>
      )}

      {/* ---------------- BODY ---------------- */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_390px] lg:items-start">
          {/* main column */}
          <div className="min-w-0">
            {theme && (
              <Reveal>
                <div className="card relative mb-10 overflow-hidden border border-brand-pink/20 bg-gradient-to-br from-brand-purpleDeep via-brand-purple to-[#2A0E44] p-7 sm:p-9 text-white shadow-xl">
                  <div className="noise absolute inset-0 opacity-40 pointer-events-none" />
                  <div className="orb -right-10 -bottom-10 h-44 w-44 bg-brand-pink/25 blur-3xl pointer-events-none" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-pink backdrop-blur-md">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      Summit Theme
                    </div>
                    <blockquote className="mt-3.5 font-display text-xl sm:text-2xl font-black leading-snug tracking-tight text-white/95">
                      {theme.startsWith('“') || theme.startsWith('"') ? theme : `“${theme}”`}
                    </blockquote>
                  </div>
                </div>
              </Reveal>
            )}

            {narrative?.length > 0 ? (
              <Reveal>
                <div className="card p-8 sm:p-11">
                  <span className="eyebrow">About the congress</span>
                  <h2 className="mb-7 text-2xl font-extrabold text-brand-purple sm:text-3xl">
                    What this summit sets out to do
                  </h2>
                  <div className="space-y-5">
                    {narrative.map((p, i) => (
                      <p key={i} className="text-[15px] leading-[1.85] text-ink-soft">{p}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ) : !theme && tracks.length === 0 ? (
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
            ) : null}

            {/* Scientific Sessions & Tracks */}
            {tracks.length > 0 && (
              <div id="sessions" className="mt-14 scroll-mt-28">
                <Reveal>
                  <div className="card p-8 sm:p-11">
                    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <span className="eyebrow">Scope & Scientific Tracks</span>
                        <h2 className="text-2xl font-extrabold text-brand-purple sm:text-3xl">
                          Conference Sessions & Topics
                        </h2>
                      </div>
                      <span className="rounded-full bg-brand-purple/[0.07] px-4 py-1.5 text-xs font-bold text-brand-purple">
                        {tracks.length} sessions
                      </span>
                    </div>

                    <p className="mb-8 text-[15px] leading-relaxed text-ink-soft">
                      The summit welcomes abstracts, research presentations, clinical innovations, and case discussions across the following thematic sessions:
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                      {tracks.map((t, i) => (
                        <div
                          key={i}
                          className="group flex items-center gap-3 rounded-2xl border border-brand-purple/10 bg-white p-3.5 transition-all duration-300 hover:border-brand-pink/50 hover:bg-brand-purple/[0.02] hover:shadow-md"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-brand-purple/[0.06] text-[11px] font-black text-brand-purple group-hover:bg-brand-pink group-hover:text-white transition-colors duration-300">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[13px] font-bold leading-snug text-brand-purple group-hover:text-brand-violet transition-colors">
                            {t}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 rounded-2xl bg-brand-purple/[0.04] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border border-brand-purple/10">
                      <div>
                        <h4 className="text-base font-extrabold text-brand-purple">
                          Interested in presenting in one of these sessions?
                        </h4>
                        <p className="mt-1 text-[13px] text-ink-soft">
                          Submit an abstract or register as a speaker to share your research and insights with global peers.
                        </p>
                      </div>
                      <Link
                        to="/contact"
                        state={{ subject: `${event.title} - Session Proposal` }}
                        className="btn-primary shrink-0 !py-3 !px-6 !text-xs whitespace-nowrap"
                      >
                        Submit abstract
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>
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
                    <div className="flex flex-wrap items-center gap-3">
                      {event.agendaPdf && (
                        <a
                          href={event.agendaPdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-brand-purple/15 bg-white px-4 py-1.5 text-xs font-bold text-brand-purple shadow-sm transition hover:border-brand-pink hover:text-brand-pink"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          Download Tentative Agenda (PDF)
                        </a>
                      )}
                      <span className="rounded-full bg-brand-purple/[0.07] px-4 py-1.5 text-xs font-bold text-brand-purple">
                        {event.sessions.length} sessions
                      </span>
                    </div>
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
                      const spProfile = who ? matchSpeaker(content.speakers, who) : null
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
                              <div className="flex items-center gap-3.5">
                                {spProfile?.image && (
                                  <img
                                    src={spProfile.image}
                                    alt={who}
                                    className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-brand-pink/40 shadow-sm"
                                  />
                                )}
                                <div className="min-w-0">
                                  <p className="text-[15px] font-extrabold leading-snug text-brand-purple">
                                    {who}
                                  </p>
                                  <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-pink">
                                    {role}
                                  </p>
                                </div>
                              </div>
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
