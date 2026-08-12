import { useState } from 'react'
import { Link } from 'react-router-dom'
import content from '../data/content.json'
import PageHero from '../components/PageHero.jsx'
import CTA from '../components/CTA.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Faq() {
  const faq = content.faq || []
  const [open, setOpen] = useState(0)

  return (
    <>
      <PageHero
        kicker="Answers"
        title="Frequently Asked Questions"
        subtitle="Abstracts, registration, fees, venues and refunds - the questions we are asked most often."
        image={content.gallery?.[16]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-x max-w-4xl">
          <div className="space-y-4">
            {faq.map((item, i) => {
              const isOpen = open === i
              return (
                <Reveal key={item.q} delay={i * 45}>
                  <div
                    className={`overflow-hidden rounded-2xl transition-all duration-500 ${
                      isOpen
                        ? 'bg-white shadow-lift ring-1 ring-brand-pink/25'
                        : 'bg-white shadow-soft ring-1 ring-black/[0.06] hover:ring-brand-purple/20'
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center gap-5 px-6 py-5 text-left sm:px-8"
                      >
                        <span className={`font-display text-sm font-black tabular-nums transition-colors ${isOpen ? 'text-brand-pink' : 'text-brand-purple/30'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className={`flex-1 text-[15px] font-extrabold leading-snug transition-colors sm:text-base ${isOpen ? 'text-brand-pink' : 'text-brand-purple'}`}>
                          {item.q}
                        </span>
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                            isOpen ? 'bg-brand-gradient text-white' : 'bg-brand-purple/[0.07] text-brand-purple'
                          }`}
                          style={{ transform: isOpen ? 'rotate(135deg)' : 'rotate(0deg)' }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </span>
                      </button>
                    </h3>
                    <div
                      className="grid transition-all duration-500 ease-smooth"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-7 pl-[68px] text-sm leading-[1.85] text-ink-soft sm:px-8 sm:pl-[76px]">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={120}>
            <div className="relative mt-16 overflow-hidden rounded-3xl bg-brand-gradient p-10 text-center sm:p-14">
              <div className="noise absolute inset-0" />
              <div className="relative">
                <h3 className="text-2xl font-extrabold text-white sm:text-3xl">Still have a question?</h3>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80">
                  Our team answers every enquiry personally. Send us a note and we will come back to
                  you with the programme, venue and registration details.
                </p>
                <Link to="/contact" className="btn-white mt-8">Contact us</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  )
}
