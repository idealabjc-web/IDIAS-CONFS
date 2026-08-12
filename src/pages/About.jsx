import { Link } from 'react-router-dom'
import content from '../data/content.json'
import PageHero from '../components/PageHero.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import LogoStrip from '../components/LogoStrip.jsx'
import CTA from '../components/CTA.jsx'
import Reveal from '../components/Reveal.jsx'
import Parallax from '../components/Parallax.jsx'
import Img from '../components/Img.jsx'
import Stats from '../components/Stats.jsx'

export default function About() {
  const events = content.events || []
  const cities = new Set(events.map((e) => (e.location || '').split(',')[0].trim()).filter(Boolean))

  return (
    <>
      <PageHero
        kicker="Who we are"
        title="About i-DIAS"
        subtitle="Redefining what a twenty-first-century conference can be."
        image={content.gallery?.[8]}
      />

      {/* Intro + collage */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="orb -left-40 top-20 h-96 w-96 bg-brand-violet/[0.07]" />
        <div className="container-x relative grid items-center gap-16 lg:grid-cols-2">
          <Reveal variant="left">
            <span className="eyebrow">Why i-DIAS</span>
            <h2 className="h-display text-brand-purple">A platform built by its participants</h2>
            <span className="mt-6 block h-[3px] w-24 rounded-full bg-brand-gradient" />
            <p className="lede mt-8 text-ink-soft">{content.aboutText}</p>
            <p className="lede mt-5 text-ink-soft">{content.intro}</p>
          </Reveal>

          <div className="relative grid grid-cols-2 gap-4 sm:gap-5">
            <Parallax speed={0.1} className="space-y-4 sm:space-y-5">
              {(content.gallery || []).slice(10, 12).map((src, i) => (
                <Reveal key={src} delay={i * 110} variant="zoom">
                  <Img src={src} alt="" ratio="aspect-[3/4]" zoom className="group shadow-soft" />
                </Reveal>
              ))}
            </Parallax>
            <Parallax speed={-0.1} className="space-y-4 pt-12 sm:space-y-5">
              {(content.gallery || []).slice(12, 14).map((src, i) => (
                <Reveal key={src} delay={i * 110 + 60} variant="zoom">
                  <Img src={src} alt="" ratio="aspect-[3/4]" zoom className="group shadow-soft" />
                </Reveal>
              ))}
            </Parallax>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="relative isolate overflow-hidden bg-brand-purpleDeep py-20">
        <div className="absolute inset-0 bg-grid-fade bg-grid opacity-40" />
        <div className="noise absolute inset-0" />
        <div className="orb -right-24 top-[-40%] h-96 w-96 animate-floaty bg-brand-pink/20" />
        <div className="container-x relative">
          <Stats
            light
            items={[
              { value: events.length, label: 'Global congresses' },
              { value: content.speakers?.length || 0, label: 'Speakers on our faculty' },
              { value: cities.size, label: 'Host cities worldwide' },
              { value: content.gallery?.length || 0, label: 'Moments captured' },
            ]}
          />
        </div>
      </section>

      {/* What you get */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="container-x">
          <SectionTitle eyebrow="What you get" title="What every i-DIAS congress includes" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(content.features || []).map((f, i) => (
              <Reveal key={f.title} delay={i * 90}>
                <div className="card h-full p-8 hover:-translate-y-1.5">
                  <span className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient font-display text-sm font-black text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mb-3 text-lg font-extrabold text-brand-purple">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-soft">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      {content.partners?.length > 0 && (
        <section className="overflow-hidden py-20 lg:py-28">
          <div className="container-x">
            <SectionTitle eyebrow="With the help of" title="Our partners" />
          </div>
          <div className="container-wide">
            <LogoStrip logos={[...(content.ambassadors || []), ...(content.partners || [])]} marquee />
          </div>
          <div className="container-x mt-14 text-center">
            <Reveal>
              <Link to="/contact" className="btn-ghost">Partner with us</Link>
            </Reveal>
          </div>
        </section>
      )}

      <CTA />
    </>
  )
}
