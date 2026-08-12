import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import content from '../data/content.json'
import { useScrollY } from '../hooks/useMotion.js'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Events', to: '/events' },
  { label: 'Speakers', to: '/speakers' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blueprints', to: '/speaker-blueprints' },
  { label: 'Services', to: '/speaker-services' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'About', to: '/about-us' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const y = useScrollY()
  const { pathname } = useLocation()
  const scrolled = y > 24

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Reading progress
  const progress = (() => {
    if (typeof document === 'undefined') return 0
    const h = document.documentElement.scrollHeight - window.innerHeight
    return h > 0 ? Math.min(100, (y / h) * 100) : 0
  })()

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ease-smooth ${
        scrolled
          ? 'bg-white/85 shadow-[0_2px_30px_-12px_rgba(59,29,130,0.35)] backdrop-blur-xl'
          : 'bg-white'
      }`}
    >
      <div className={`container-wide flex items-center justify-between gap-6 transition-all duration-500 ${scrolled ? 'py-2.5' : 'py-4'}`}>
        <Link to="/" className="flex shrink-0 items-center" aria-label="IDIAS home">
          <img
            src={content.logo}
            alt="IDIAS Global Conferences"
            width="200"
            height="56"
            className={`w-auto transition-all duration-500 ${scrolled ? 'h-10 sm:h-11' : 'h-12 sm:h-14'}`}
          />
        </Link>

        <nav className="hidden items-center xl:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) =>
                `group relative px-3.5 py-2 text-[13px] font-bold transition-colors duration-300 ${
                  isActive ? 'text-brand-pink' : 'text-ink hover:text-brand-violet'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {n.label}
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-brand-gradient transition-transform duration-300 ease-smooth ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn-primary hidden !px-6 !py-2.5 !text-[11px] lg:inline-flex">
            Book a seat
          </Link>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-brand-purple/15 text-brand-purple transition-colors hover:bg-brand-purple/5 xl:hidden"
          >
            <span className="relative block h-4 w-5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="absolute left-0 h-[2px] w-full rounded-full bg-current transition-all duration-300 ease-smooth"
                  style={{
                    top: open ? '7px' : `${i * 7}px`,
                    transform: open
                      ? i === 0
                        ? 'rotate(45deg)'
                        : i === 2
                          ? 'rotate(-45deg)'
                          : 'scaleX(0)'
                      : 'none',
                    opacity: open && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </span>
          </button>
        </div>
      </div>

      {/* Reading progress bar */}
      <span
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brand-gradient transition-transform duration-150"
        style={{ transform: `scaleX(${progress / 100})` }}
      />

      {/* Mobile drawer */}
      {open && (
        <div className="animate-slideDown border-t border-black/5 bg-white xl:hidden">
          <nav className="container-x flex max-h-[72vh] flex-col overflow-y-auto py-2">
            {NAV.map((n, i) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between border-b border-black/5 py-3.5 text-sm font-bold transition-colors ${
                    isActive ? 'text-brand-pink' : 'text-ink'
                  }`
                }
                style={{ animationDelay: `${i * 25}ms` }}
              >
                {n.label}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink-muted"><polyline points="9 18 15 12 9 6" /></svg>
              </NavLink>
            ))}
            <Link to="/contact" className="btn-primary my-5">Book a seat</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
