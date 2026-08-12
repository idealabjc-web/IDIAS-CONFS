import { useState } from 'react'
import content from '../data/content.json'
import PageHero from '../components/PageHero.jsx'
import Lightbox from '../components/Lightbox.jsx'
import CTA from '../components/CTA.jsx'
import Reveal from '../components/Reveal.jsx'
import Img from '../components/Img.jsx'

const STEP = 36
// Repeating ratio pattern keeps the mosaic lively without any layout shift
const RATIOS = ['aspect-[4/5]', 'aspect-[4/3]', 'aspect-square', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-square']

export default function Gallery() {
  const images = content.gallery || []
  const [index, setIndex] = useState(null)
  const [shown, setShown] = useState(STEP)
  const visible = images.slice(0, shown)

  return (
    <>
      <PageHero
        kicker="Previous moments"
        title="Past Conference Gallery"
        subtitle={`${images.length} moments from i-DIAS congresses around the world.`}
        image={images[4]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {visible.map((src, i) => (
              <Reveal key={src} delay={(i % 4) * 70} variant="zoom">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Open image ${i + 1} of ${images.length}`}
                  className="group relative block w-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-pink/40 focus-visible:ring-offset-2 rounded-2xl"
                >
                  <Img
                    src={src}
                    alt={`Conference moment ${i + 1}`}
                    ratio={RATIOS[i % RATIOS.length]}
                    rounded="rounded-2xl"
                    zoom
                    className="shadow-soft"
                  />
                  <span className="pointer-events-none absolute inset-0 rounded-2xl bg-brand-purpleDeep/0 transition-colors duration-500 group-hover:bg-brand-purpleDeep/35" />
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-brand-purple shadow-lg">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          {shown < images.length && (
            <div className="mt-14 text-center">
              <button type="button" onClick={() => setShown((v) => v + STEP)} className="btn-ghost">
                Load {Math.min(STEP, images.length - shown)} more
              </button>
            </div>
          )}
        </div>
      </section>

      <Lightbox images={images} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
      <CTA />
    </>
  )
}
