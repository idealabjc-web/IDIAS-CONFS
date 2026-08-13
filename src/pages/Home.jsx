import { Link } from 'react-router-dom'
import content from '../data/content.json'
import Hero from '../components/Hero.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import EventCard from '../components/EventCard.jsx'
import SpeakerCard from '../components/SpeakerCard.jsx'
import LogoStrip from '../components/LogoStrip.jsx'
import CTA from '../components/CTA.jsx'
import Reveal from '../components/Reveal.jsx'
import Parallax from '../components/Parallax.jsx'
import Img from '../components/Img.jsx'
import Stats from '../components/Stats.jsx'

const ICONS = {
  Networking: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  'Great Speakers': 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8',
  'New People': 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM20 8v6M23 11h-6',
  'Have Fun': 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01',
}

export default function Home() {
  const events = content.events || []
  const featured = events.slice(0, 6)
  const speakers = (content.speakers || []).slice(0, 10)
  const cities = new Set(events.map((e) => (e.location || '').split(',')[0].trim()).filter(Boolean))

  return (
    <>
      <Hero />

      {/* ---------- Stats ribbon ---------- */}
      <section className="relative z-20 -mt-14">
        <div className="container-x">
          <Reveal variant="zoom">
            <div className="card px-8 py-10 sm:px-14">
              <Stats
                items={[
                  { value: events.length, label: 'Global congresses' },
                  { value: content.speakers?.length || 0, label: 'Speakers on our faculty' },
                  { value: cities.size, label: 'Host cities worldwide' },
                  { value: content.gallery?.length || 0, label: 'Moments captured' },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Why join ---------- */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="orb -left-40 top-20 h-96 w-96 bg-brand-violet/[0.07]" />
        <div className="orb -right-32 bottom-0 h-96 w-96 bg-brand-pink/[0.06]" />

        <div className="container-x relative">
          <SectionTitle
            eyebrow="Why join"
            title="Why you should join the conference"
            subtitle={content.intro}
          />

          <div className="grid gap-8 md:grid-cols-2">
            {(content.features || []).map((f, i) => (
              <Reveal key={f.title} delay={i * 90}>
                <div className="card group flex h-full flex-col justify-between p-8 hover:-translate-y-2">
                  <span className="absolute -right-6 -top-8 font-display text-[7rem] font-black leading-none text-brand-purple/[0.04] transition-colors duration-500 group-hover:text-brand-pink/[0.07]">
                    {i + 1}
                  </span>
                  <div className="relative">
                    <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <path d={ICONS[f.title] || ICONS.Networking} />
                      </svg>
                    </div>
                    <h3 className="mb-3.5 text-xl font-extrabold text-brand-purple">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-soft">{f.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Conferences ---------- */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
            <SectionTitle
              align="left"
              eyebrow="Upcoming"
              title="You would be interested in our conferences"
              subtitle="Summits on leadership, empowerment, mental wellbeing and resilience, hosted in cities around the world."
              className="mb-0"
            />
            <Reveal delay={150}>
              <Link to="/events" className="btn-ghost shrink-0">
                All {events.length} congresses
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((e, i) => (
              <Reveal key={e.slug} delay={(i % 3) * 100}>
                <EventCard event={e} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Speakers ---------- */}
      <section className="relative isolate overflow-hidden bg-brand-purpleDeep py-24 lg:py-32">
        <div className="absolute inset-0 bg-grid-fade bg-grid opacity-40" />
        <div className="noise absolute inset-0" />
        <div className="orb -left-40 top-10 h-[30rem] w-[30rem] animate-floaty bg-brand-violet/25" />
        <div className="orb -right-32 bottom-0 h-[26rem] w-[26rem] animate-floaty bg-brand-pink/20" style={{ animationDelay: '2s' }} />

        <div className="container-x relative">
          <SectionTitle
            eyebrow="Listen to the"
            title="Event speakers"
            light
            subtitle="A global faculty of researchers, founders, coaches and advocates."
          />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {speakers.map((s, i) => (
              <Reveal key={s.name} delay={(i % 5) * 80} variant="zoom">
                <SpeakerCard speaker={s} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-14 text-center">
            <Link to="/speakers" className="btn-outline">
              Meet all {content.speakers?.length || 0} speakers
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Partners marquee ---------- */}
      {(content.ambassadors?.length > 0 || content.partners?.length > 0) && (
        <section className="overflow-hidden bg-cream py-24 lg:py-28">
          <div className="container-x">
            <SectionTitle eyebrow="In association with" title="Our partners & ambassadors" />
          </div>
          <div className="container-wide">
            <LogoStrip
              logos={[...(content.ambassadors || []), ...(content.partners || [])]}
              label="Partner"
              marquee
            />
          </div>
        </section>
      )}

      {/* ---------- Gallery teaser ---------- */}
      {content.gallery?.length > 0 && (
        <section className="py-24 lg:py-32">
          <div className="container-x">
            <SectionTitle
              eyebrow="Previous moments"
              title="Past conference gallery"
              subtitle="Highlights from congresses in Paris, New York, Dubai and beyond."
            />
          </div>

          <div className="container-wide">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {content.gallery.slice(0, 8).map((src, i) => (
                <Reveal key={src} delay={(i % 4) * 80} variant="zoom">
                  <div className={`group ${i % 4 === 1 || i % 4 === 2 ? 'md:mt-10' : ''}`}>
                    <Img src={src} alt={`Conference moment ${i + 1}`} ratio="aspect-[4/5]" zoom className="shadow-soft" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="container-x mt-14 text-center">
            <Reveal>
              <Link to="/gallery" className="btn-ghost">Open the full gallery</Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------- Split: about + parallax collage ---------- */}
      <section className="relative overflow-hidden bg-cream py-24 lg:py-32">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <Reveal variant="left">
            <span className="eyebrow">Why i-DIAS</span>
            <h2 className="h-display text-brand-purple">A platform built by its participants</h2>
            <span className="mt-6 block h-[3px] w-24 rounded-full bg-brand-gradient" />
            <p className="lede mt-8 text-ink-soft">{content.aboutText}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/about-us" className="btn-ghost">More about us</Link>
              <Link to="/speaker-blueprints" className="btn-ghost">Become a speaker</Link>
            </div>
          </Reveal>

          <div className="relative grid grid-cols-2 gap-4 sm:gap-5">
            <Parallax speed={0.09} className="space-y-4 sm:space-y-5">
              {(content.gallery || []).slice(1, 3).map((src, i) => (
                <Reveal key={src} delay={i * 110} variant="zoom">
                  <Img src={src} alt="" ratio="aspect-[3/4]" zoom className="group shadow-soft" />
                </Reveal>
              ))}
            </Parallax>
            <Parallax speed={-0.09} className="space-y-4 pt-10 sm:space-y-5 sm:pt-14">
              {(content.gallery || []).slice(3, 5).map((src, i) => (
                <Reveal key={src} delay={i * 110 + 60} variant="zoom">
                  <Img src={src} alt="" ratio="aspect-[3/4]" zoom className="group shadow-soft" />
                </Reveal>
              ))}
            </Parallax>
            <div className="orb -right-10 top-1/3 h-56 w-56 bg-brand-pink/20" />
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
