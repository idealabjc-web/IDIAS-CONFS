import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import content from '../data/content.json'
import { useScrollY, prefersReducedMotion } from '../hooks/useMotion.js'

export default function Hero() {
  const slides = content.hero || []
  const nextEvent = (content.events || [])[0]
  const [i, setI] = useState(0)
  const y = useScrollY()
  const reduce = prefersReducedMotion()

  const next = useCallback(() => setI((v) => (v + 1) % slides.length), [slides.length])
  const prev = () => setI((v) => (v - 1 + slides.length) % slides.length)

  useEffect(() => {
    if (slides.length < 2) return
    const t = setInterval(next, 6500)
    return () => clearInterval(t)
  }, [next, slides.length])

  // Hero parallax: background drifts slower than the copy
  const bgY = reduce ? 0 : Math.min(y * 0.35, 300)
  const copyY = reduce ? 0 : Math.min(y * 0.12, 120)
  const fade = reduce ? 1 : Math.max(0, 1 - y / 620)

  return (
    <section className="relative isolate overflow-hidden bg-brand-purpleDeep">
      {/* Parallax image stack */}
      <div
        className="absolute inset-x-0 -top-24 bottom-[-15%] will-change-transform"
        style={{ transform: `translate3d(0, ${bgY}px, 0) scale(1.08)` }}
      >
        {slides.map((s, idx) => (
          <img
            key={s}
            src={s}
            alt=""
            aria-hidden="true"
            loading={idx === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-smooth ${
              idx === i ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Colour + depth layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purpleDeep/95 via-brand-purple/80 to-brand-violet/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-purpleDeep via-transparent to-brand-purpleDeep/60" />
      <div className="absolute inset-0 bg-grid-fade bg-grid opacity-[0.55]" />
      <div className="noise absolute inset-0" />
      <div className="orb -left-40 top-[-10%] h-[32rem] w-[32rem] animate-floaty bg-brand-violet/35" />
      <div
        className="orb -right-32 bottom-[-20%] h-[28rem] w-[28rem] animate-floaty bg-brand-pink/25"
        style={{ animationDelay: '2.5s' }}
      />

      {/* Copy */}
      <div
        className="container-x relative z-10 flex min-h-[92svh] flex-col justify-center py-32"
        style={{ transform: `translate3d(0, ${copyY}px, 0)`, opacity: fade }}
      >
        <div className="max-w-4xl">
          <span className="reveal is-in mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.08] px-5 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-white backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulseRing rounded-full bg-brand-pink" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-pink" />
            </span>
            {content.events?.length || 0} Global Conferences
          </span>

          <h1 className="h-hero text-white">
            Where visionary women
            <span className="mt-1 block text-gradient">lead the conversation</span>
          </h1>

          <p className="lede mt-8 max-w-2xl text-white/80">
            i-DIAS brings together speakers, researchers and delegates from every discipline to set
            the agenda, exchange ideas and build networks that outlast the conference.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Link to="/events" className="btn-primary">Browse conferences</Link>
            <Link to="/contact" className="btn-outline">Become a speaker</Link>
          </div>

          {/* Next-up strip */}
          {nextEvent && (
            <div className="mt-16 max-w-xl">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.26em] text-white/45">
                Next on the calendar
              </p>
              <Link
                to={`/events/${nextEvent.slug}`}
                className="glass group flex items-center gap-5 p-4 transition-colors hover:border-brand-pink/50"
              >
                <img
                  src={nextEvent.image}
                  alt=""
                  className="h-16 w-24 shrink-0 rounded-xl object-cover"
                  loading="lazy"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-white">
                    {nextEvent.title}
                  </span>
                  <span className="mt-1 block text-xs text-white/60">
                    {nextEvent.date} &middot; {nextEvent.location}
                  </span>
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-all group-hover:bg-brand-pink group-hover:translate-x-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Slide controls */}
      {slides.length > 1 && (
        <div className="absolute bottom-10 right-6 z-10 hidden items-center gap-3 sm:flex">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-white backdrop-blur-md transition hover:bg-brand-pink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <div className="flex gap-1.5">
            {slides.map((s, idx) => (
              <button
                key={s}
                type="button"
                aria-label={`Slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === i ? 'w-9 bg-brand-pink' : 'w-1.5 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-white backdrop-blur-md transition hover:bg-brand-pink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      )}

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 lg:block">
        <div className="flex h-11 w-7 items-start justify-center rounded-full border-2 border-white/30 p-1.5">
          <span className="h-2 w-1 animate-floaty rounded-full bg-white/70" />
        </div>
      </div>
    </section>
  )
}
