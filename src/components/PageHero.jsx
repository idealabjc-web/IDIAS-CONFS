import { Link } from 'react-router-dom'
import { useScrollY, prefersReducedMotion } from '../hooks/useMotion.js'

export default function PageHero({ title, subtitle, image, kicker, children }) {
  const y = useScrollY()
  const reduce = prefersReducedMotion()
  const bgY = reduce ? 0 : Math.min(y * 0.28, 200)

  return (
    <section className="relative isolate overflow-hidden bg-brand-purpleDeep">
      {image && (
        <div
          className="absolute inset-x-0 -top-16 bottom-[-18%] will-change-transform"
          style={{ transform: `translate3d(0, ${bgY}px, 0) scale(1.1)` }}
        >
          <img src={image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purpleDeep/96 via-brand-purple/86 to-brand-violet/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-purpleDeep via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-fade bg-grid opacity-40" />
      <div className="noise absolute inset-0" />
      <div className="orb -left-32 top-[-30%] h-[26rem] w-[26rem] animate-floaty bg-brand-violet/30" />
      <div className="orb -right-24 bottom-[-40%] h-[24rem] w-[24rem] animate-floaty bg-brand-pink/20" style={{ animationDelay: '3s' }} />

      <div className="container-x relative z-10 py-24 lg:py-32">
        <nav aria-label="Breadcrumb" className="mb-6 text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">
          <Link to="/" className="transition-colors hover:text-brand-pink">Home</Link>
          <span className="mx-2.5">/</span>
          <span className="text-brand-pink">{title}</span>
        </nav>

        {kicker && <span className="eyebrow">{kicker}</span>}

        <h1 className="h-display max-w-4xl text-white">{title}</h1>

        {subtitle && <p className="lede mt-7 max-w-2xl text-white/75">{subtitle}</p>}

        {children && <div className="mt-10">{children}</div>}
      </div>

      {/* Curved bottom edge */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 z-10 h-[52px] w-full fill-white"
      >
        <path d="M0 90h1440V32C1200 74 960 90 720 90S240 74 0 32z" />
      </svg>
    </section>
  )
}
