import { Link } from 'react-router-dom'
import content from '../data/content.json'
import PageHero from '../components/PageHero.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import CTA from '../components/CTA.jsx'
import Reveal from '../components/Reveal.jsx'
import Img from '../components/Img.jsx'

export default function SpeakerServices() {
  const items = content.speakerServices || []

  return (
    <>
      <PageHero
        kicker="For speakers"
        title="Speaker Services"
        subtitle="Books, publishing support and coaching from the authors and speakers in our network."
        image={content.speakers?.[12]?.image}
      />

      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="orb -right-40 top-32 h-96 w-96 bg-brand-pink/[0.06]" />
        <div className="container-x relative">
          <SectionTitle
            eyebrow="Curated by i-DIAS"
            title="Author spotlights"
            subtitle="Elevate your oratory skills with a curated selection of speaker books - practical insight from people who have stood on our stages."
          />

          <div className="space-y-10 lg:space-y-14">
            {items.map((item, i) => {
              const flip = i % 2 === 1
              return (
                <Reveal key={item.name + i} variant={flip ? 'right' : 'left'}>
                  <article className="card grid items-stretch gap-0 lg:grid-cols-[minmax(0,340px)_1fr]">
                    <div className={`group relative ${flip ? 'lg:order-2' : ''}`}>
                      {item.image ? (
                        <Img
                          src={item.image}
                          alt={item.name}
                          ratio="aspect-[4/3] lg:aspect-auto lg:h-full"
                          rounded="rounded-none"
                          position="object-top"
                          zoom
                          className="h-full"
                        />
                      ) : (
                        <div className="flex h-full min-h-[240px] items-center justify-center bg-brand-gradient p-8 text-center">
                          <span className="font-display text-2xl font-black text-white/90">{item.name}</span>
                        </div>
                      )}
                      <span className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-purpleDeep/40 to-transparent lg:bg-gradient-to-r ${flip ? 'lg:from-transparent lg:to-brand-purpleDeep/15' : 'lg:from-transparent lg:to-brand-purpleDeep/15'}`} />
                    </div>

                    <div className="p-8 lg:p-12">
                      <span className="eyebrow">Speaker &amp; author</span>
                      <h3 className="text-2xl font-extrabold text-brand-purple sm:text-3xl">{item.name}</h3>
                      <span className="mt-5 block h-[3px] w-16 rounded-full bg-brand-gradient" />
                      <p className="mt-7 text-[15px] leading-[1.85] text-ink-soft">{item.text}</p>
                      <Link
                        to="/contact"
                        state={{ subject: `Speaker services - ${item.name}` }}
                        className="btn-ghost mt-9"
                      >
                        Enquire about this speaker
                      </Link>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
