import { Link } from 'react-router-dom'
import content from '../data/content.json'
import Reveal from './Reveal.jsx'
import Parallax from './Parallax.jsx'

export default function CTA() {
  const bg = (content.gallery || [])[6] || (content.gallery || [])[0]

  return (
    <section className="relative isolate overflow-hidden bg-brand-purpleDeep">
      {bg && (
        <Parallax speed={0.16} className="absolute inset-x-0 -top-24 bottom-[-24%]">
          <img src={bg} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover opacity-30" />
        </Parallax>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-purpleDeep via-brand-purple/90 to-brand-violet/70" />
      <div className="noise absolute inset-0" />
      <div className="orb left-1/4 top-[-40%] h-[26rem] w-[26rem] animate-floaty bg-brand-pink/25" />

      <div className="container-x relative z-10 flex flex-col items-center gap-10 py-20 text-center lg:flex-row lg:justify-between lg:py-24 lg:text-left">
        <Reveal variant="left" className="max-w-2xl">
          <span className="eyebrow justify-center lg:justify-start">Hurry up</span>
          <h2 className="h-display text-white">Book your seat</h2>
          <p className="lede mt-5 text-white/75">
            Seats at every i-DIAS congress are limited. Register your interest and our team will send
            you the full programme, venue details and registration options.
          </p>
        </Reveal>

        <Reveal variant="right" delay={120} className="flex shrink-0 flex-wrap justify-center gap-4">
          <Link to="/contact" className="btn-white">Register now</Link>
          <Link to="/events" className="btn-outline">See all events</Link>
        </Reveal>
      </div>
    </section>
  )
}
