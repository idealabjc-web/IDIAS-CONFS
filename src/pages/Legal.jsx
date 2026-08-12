import content from '../data/content.json'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'

const TITLES = {
  privacy: 'Privacy Policy',
  terms: 'Terms & Conditions',
}

export default function Legal({ kind }) {
  const lines = content[kind] || []

  return (
    <>
      <PageHero kicker="Legal" title={TITLES[kind]} />

      <section className="py-16 lg:py-24">
        <div className="container-x max-w-3xl">
          <Reveal>
            <article className="card space-y-5 p-8 sm:p-12">
              {lines.length === 0 && (
                <p className="text-sm text-ink-soft">This document has not been published yet.</p>
              )}
              {lines.map((l, i) => {
                const isHeading = l.length < 80 && !/[.?!]$/.test(l)
                return isHeading ? (
                  <h2 key={i} className="pt-6 text-xl font-extrabold text-brand-purple first:pt-0">{l}</h2>
                ) : (
                  <p key={i} className="text-[15px] leading-[1.85] text-ink-soft">{l}</p>
                )
              })}
            </article>
          </Reveal>
        </div>
      </section>
    </>
  )
}
