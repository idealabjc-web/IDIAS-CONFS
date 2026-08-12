import { Link } from 'react-router-dom'
import content from '../data/content.json'
import PageHero from '../components/PageHero.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import CTA from '../components/CTA.jsx'
import Reveal from '../components/Reveal.jsx'
import Parallax from '../components/Parallax.jsx'
import Img from '../components/Img.jsx'

const STEPS = [
  {
    n: '01',
    title: 'Submit your abstract',
    text: 'Email your abstract to contact@idias.org with the conference name and dates in the subject line, using the template on the conference page.',
  },
  {
    n: '02',
    title: 'Scientific review',
    text: 'Our scientific committee reviews every submission for originality and fit with the programme. You are notified by email once a decision is made.',
  },
  {
    n: '03',
    title: 'Confirm your slot',
    text: 'Organisers assign your time slot based on topic, session length and the overall agenda, then share the full programme with you.',
  },
  {
    n: '04',
    title: 'Take the stage',
    text: 'Registration includes CE credits, an attendance certificate, ID card, buffet lunch, coffee breaks, Wi-Fi, proceedings and the scientific programme.',
  },
]

export default function SpeakerBlueprints() {
  return (
    <>
      <PageHero
        kicker="For speakers"
        title="Speaker Blueprints"
        subtitle="How to go from an idea to the i-DIAS stage, step by step."
        image={content.speakers?.[5]?.image}
      />

      {/* Steps */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="container-x relative">
          <SectionTitle
            eyebrow="The path"
            title="From abstract to keynote"
            subtitle="Every i-DIAS speaker follows the same clear route. No hidden steps, no guesswork."
          />

          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* connecting line on desktop */}
            <span className="pointer-events-none absolute left-0 right-0 top-[86px] hidden h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent lg:block" />

            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 110}>
                <div className="card group relative h-full p-8 hover:-translate-y-2">
                  <span className="absolute -right-4 -top-8 font-display text-[7rem] font-black leading-none text-brand-purple/[0.04] transition-colors duration-500 group-hover:text-brand-pink/[0.08]">
                    {s.n}
                  </span>
                  <div className="relative">
                    <span className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient font-display text-base font-black text-white shadow-glow transition-transform duration-500 group-hover:scale-110">
                      {s.n}
                    </span>
                    <h3 className="mb-3.5 text-lg font-extrabold text-brand-purple">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-soft">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Funding split */}
      <section className="relative overflow-hidden bg-cream py-20 lg:py-28">
        <div className="orb -left-32 bottom-0 h-96 w-96 bg-brand-violet/[0.08]" />
        <div className="container-x relative grid items-center gap-16 lg:grid-cols-2">
          <Reveal variant="left">
            <span className="eyebrow">Good to know</span>
            <h2 className="h-display text-brand-purple">Funding and support</h2>
            <span className="mt-6 block h-[3px] w-24 rounded-full bg-brand-gradient" />
            <p className="mt-8 text-[15px] leading-[1.85] text-ink-soft">
              As a not-for-profit organisation we cannot fully fund every speaker. We do offer limited
              funding opportunities for selected speakers, and we provide benefits such as
              complimentary registration and discounted accommodation to help offset costs.
            </p>
            <p className="mt-5 text-[15px] leading-[1.85] text-ink-soft">
              We also operate a 100% refund policy. Physical meetings give the best B2B networking,
              and virtual attendance is available as a backup.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/faq" className="btn-ghost">Read the full FAQ</Link>
              <Link to="/contact" className="btn-primary">Submit an abstract</Link>
            </div>
          </Reveal>

          <Parallax speed={0.08}>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {(content.speakers || []).slice(6, 15).map((s, i) => (
                <Reveal key={s.name} delay={i * 55} variant="zoom">
                  <Img
                    src={s.image}
                    alt={s.name}
                    ratio="aspect-square"
                    rounded="rounded-2xl"
                    position="object-top"
                    className="shadow-soft"
                  />
                </Reveal>
              ))}
            </div>
          </Parallax>
        </div>
      </section>

      <CTA />
    </>
  )
}
