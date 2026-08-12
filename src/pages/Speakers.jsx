import { useMemo, useState } from 'react'
import content from '../data/content.json'
import PageHero from '../components/PageHero.jsx'
import SpeakerCard from '../components/SpeakerCard.jsx'
import CTA from '../components/CTA.jsx'
import Reveal from '../components/Reveal.jsx'

const PAGE = 30

export default function Speakers() {
  const all = content.speakers || []
  const [q, setQ] = useState('')
  const [role, setRole] = useState('all')
  const [shown, setShown] = useState(PAGE)

  const roles = useMemo(
    () => ['all', ...Array.from(new Set(all.map((s) => s.role).filter(Boolean))).sort()],
    [all],
  )

  const filtered = all.filter((s) => {
    const okQ = !q || s.name.toLowerCase().includes(q.toLowerCase())
    const okRole = role === 'all' || s.role === role
    return okQ && okRole
  })
  const visible = filtered.slice(0, shown)

  return (
    <>
      <PageHero
        kicker="The faculty"
        title="Our Speakers"
        subtitle={`${all.length} keynote speakers, researchers, coaches and advocates from across the world.`}
        image={all[2]?.image}
      />

      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal>
            <div className="card mb-12 flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-5 top-1/2 -translate-y-1/2 text-ink-muted">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="search"
                  value={q}
                  onChange={(e) => { setQ(e.target.value); setShown(PAGE) }}
                  placeholder="Search speakers by name..."
                  aria-label="Search speakers"
                  className="w-full rounded-full bg-brand-purple/[0.04] py-3.5 pl-14 pr-5 text-sm outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-2 focus:ring-brand-pink/40"
                />
              </div>
              <select
                value={role}
                onChange={(e) => { setRole(e.target.value); setShown(PAGE) }}
                aria-label="Filter by role"
                className="rounded-full bg-brand-purple/[0.04] px-5 py-3.5 text-sm font-medium outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-2 focus:ring-brand-pink/40"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>{r === 'all' ? 'All roles' : r}</option>
                ))}
              </select>
            </div>
          </Reveal>

          <p className="mb-10 text-center text-sm font-semibold text-ink-soft">
            Showing <span className="text-brand-pink">{visible.length}</span> of {filtered.length} speakers
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {visible.map((s, i) => (
              <Reveal key={s.name} delay={(i % 5) * 70} variant="zoom">
                <SpeakerCard speaker={s} />
              </Reveal>
            ))}
          </div>

          {visible.length < filtered.length && (
            <div className="mt-14 text-center">
              <button type="button" onClick={() => setShown((v) => v + PAGE)} className="btn-ghost">
                Load {Math.min(PAGE, filtered.length - visible.length)} more
              </button>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="card p-20 text-center">
              <p className="text-lg font-extrabold text-brand-purple">No speakers match that search.</p>
              <button type="button" onClick={() => { setQ(''); setRole('all') }} className="btn-ghost mt-7">
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  )
}
