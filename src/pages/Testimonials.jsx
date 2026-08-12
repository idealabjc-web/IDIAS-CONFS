import { Link } from 'react-router-dom'
import content from '../data/content.json'
import PageHero from '../components/PageHero.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import SpeakerCard from '../components/SpeakerCard.jsx'
import CTA from '../components/CTA.jsx'
import Reveal from '../components/Reveal.jsx'

/**
 * NOTE FOR THE SITE OWNER
 * ------------------------------------------------------------------
 * The WordPress backup this site was rebuilt from contained a
 * "Speaker Testimonials" heading but no testimonial text, quotes or
 * videos anywhere in the database. Nothing was invented here.
 *
 * To populate this page, add entries to TESTIMONIALS below:
 *   { quote: '...', name: '...', role: '...', image: '/img/...' }
 * The empty state disappears automatically once the array has items.
 */
const TESTIMONIALS = []

export default function Testimonials() {
  const featured = (content.speakers || []).slice(0, 10)

  return (
    <>
      <PageHero
        kicker="In their words"
        title="Speaker Testimonials"
        subtitle="What speakers and delegates say about the i-DIAS experience."
        image={content.gallery?.[20]}
      />

      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="orb -left-32 top-10 h-96 w-96 bg-brand-violet/[0.07]" />
        <div className="container-x relative">
          {TESTIMONIALS.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.name} delay={i * 90}>
                  <figure className="card h-full p-9">
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor" className="mb-6 text-brand-pink/25">
                      <path d="M9.5 5C6.5 6.7 4.5 9.8 4.5 13.3c0 3.2 1.9 5.7 4.6 5.7 2.2 0 3.9-1.7 3.9-3.9 0-2.1-1.5-3.7-3.5-3.7-.4 0-.9.1-1 .1.3-1.8 2-3.9 3.7-5L9.5 5zm9.4 0c-3 1.7-5 4.8-5 8.3 0 3.2 1.9 5.7 4.6 5.7 2.2 0 3.9-1.7 3.9-3.9 0-2.1-1.5-3.7-3.5-3.7-.4 0-.9.1-1 .1.3-1.8 2-3.9 3.7-5L18.9 5z" />
                    </svg>
                    <blockquote className="text-[15px] leading-[1.85] text-ink-soft">{t.quote}</blockquote>
                    <figcaption className="mt-7 flex items-center gap-4 border-t border-black/5 pt-6">
                      {t.image && <img src={t.image} alt={t.name} className="h-12 w-12 rounded-full object-cover object-top" />}
                      <div>
                        <p className="font-extrabold text-brand-purple">{t.name}</p>
                        {t.role && <p className="text-[11px] uppercase tracking-wide text-brand-pink">{t.role}</p>}
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal variant="zoom">
              <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] bg-brand-gradient p-10 text-center sm:p-16">
                <div className="noise absolute inset-0" />
                <div className="relative">
                  <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 text-white backdrop-blur-md">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                    Testimonials are being collected
                  </h2>
                  <p className="mx-auto mt-5 max-w-lg text-sm leading-[1.85] text-white/80">
                    We are gathering written and recorded testimonials from the speakers and
                    delegates who have joined us in Paris, New York, Dubai and beyond. If you have
                    spoken at or attended an i-DIAS congress, we would love to hear from you.
                  </p>
                  <Link to="/contact" state={{ subject: 'Testimonial submission' }} className="btn-white mt-9">
                    Share your experience
                  </Link>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-brand-purpleDeep py-20 lg:py-28">
        <div className="absolute inset-0 bg-grid-fade bg-grid opacity-40" />
        <div className="noise absolute inset-0" />
        <div className="container-x relative">
          <SectionTitle eyebrow="Our community" title="Speakers who have joined us" light />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {featured.map((s, i) => (
              <Reveal key={s.name} delay={(i % 5) * 80} variant="zoom">
                <SpeakerCard speaker={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
