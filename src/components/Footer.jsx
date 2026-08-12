import { Link } from 'react-router-dom'
import content from '../data/content.json'
import Reveal from './Reveal.jsx'

const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/', d: 'M15 3h-3a5 5 0 0 0-5 5v3H4v4h3v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1h3z' },
  { label: 'Twitter', href: 'https://twitter.com/', d: 'M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.9 3.7A11.4 11.4 0 0 1 3.8 4.6a4 4 0 0 0 1.2 5.4c-.6 0-1.3-.2-1.8-.5a4 4 0 0 0 3.2 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.1 11.3 11.3 0 0 0 8.1 20c7.5 0 11.5-6.2 11.5-11.5v-.5c.8-.6 1.5-1.3 2-2.1z' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', d: 'M6.9 8H3.6v12h3.3zM5.2 2.9a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM20.4 20h-3.3v-6.2c0-1.6-.6-2.6-1.9-2.6-1 0-1.7.7-1.9 1.4v7.4H10s.1-11 0-12h3.3v1.7a3.3 3.3 0 0 1 3-1.6c2.2 0 4 1.4 4 4.6z' },
  { label: 'Instagram', href: 'https://www.instagram.com/', d: 'M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.9c-.1 3.2-1.6 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-3.2 1.6-4.8 4.9-4.9C8.4 2.2 8.8 2.2 12 2.2zm0 3.1a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4zm0 11a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6zm6.9-11.2a1.6 1.6 0 1 1-3.1 0 1.6 1.6 0 0 1 3.1 0z' },
]

function Col({ title, links }) {
  return (
    <div>
      <h4 className="mb-6 text-sm font-extrabold uppercase tracking-[0.16em] text-white">{title}</h4>
      <ul className="space-y-3 text-sm text-white/60">
        {links.map(([l, to]) => (
          <li key={to}>
            <Link to={to} className="group inline-flex items-center gap-2 transition-colors hover:text-brand-pink">
              <span className="h-px w-0 bg-brand-pink transition-all duration-300 group-hover:w-3" />
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const c = content.contact || {}

  return (
    <footer className="relative isolate overflow-hidden bg-brand-purpleDeep text-white">
      <div className="absolute inset-0 bg-grid-fade bg-grid opacity-40" />
      <div className="noise absolute inset-0" />
      <div className="orb -left-40 top-0 h-[26rem] w-[26rem] animate-floaty bg-brand-violet/25" />
      <div className="orb -right-32 bottom-0 h-[22rem] w-[22rem] animate-floaty bg-brand-pink/15" style={{ animationDelay: '3s' }} />

      {/* newsletter */}
      <div className="relative border-b border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-8 py-14 lg:flex-row">
          <Reveal variant="left">
            <span className="eyebrow">Stay in the loop</span>
            <h3 className="text-2xl font-extrabold sm:text-3xl">Subscribe to our newsletter</h3>
            <p className="mt-3 max-w-md text-sm text-white/60">
              Programme announcements, calls for abstracts and early-bird registration windows.
            </p>
          </Reveal>
          <Reveal variant="right" delay={100} className="w-full max-w-md">
            <form
              name="newsletter"
              method="POST"
              data-netlify="true"
              className="flex gap-3"
              onSubmit={(e) => {
                if (!/netlify\.app$/.test(window.location.hostname)) e.preventDefault()
              }}
            >
              <input type="hidden" name="form-name" value="newsletter" />
              <input
                type="email"
                name="email"
                required
                aria-label="Email address"
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/[0.07] px-6 py-3.5 text-sm text-white outline-none backdrop-blur-md transition placeholder:text-white/40 focus:border-brand-pink"
              />
              <button type="submit" className="btn-primary shrink-0 !px-7">Join</button>
            </form>
          </Reveal>
        </div>
      </div>

      {/* main */}
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-flex rounded-2xl bg-white p-3.5">
            <img src={content.logo} alt="IDIAS" width="180" height="48" className="h-12 w-auto" />
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
            i-DIAS Global Conferences brings together speakers, researchers and leaders from around
            the world to exchange ideas and build lasting professional networks.
          </p>
          <div className="mt-7 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-brand-gradient"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d={s.d} /></svg>
              </a>
            ))}
          </div>
        </div>

        <Col
          title="Explore"
          links={[
            ['Events', '/events'],
            ['Speakers', '/speakers'],
            ['Gallery', '/gallery'],
            ['About Us', '/about-us'],
            ['Testimonials', '/testimonials'],
          ]}
        />
        <Col
          title="Information"
          links={[
            ['Contact Us', '/contact'],
            ['Speaker Blueprints', '/speaker-blueprints'],
            ['Speaker Services', '/speaker-services'],
            ['FAQ', '/faq'],
            ['Privacy Policy', '/privacy-policy'],
            ['Terms & Conditions', '/terms-and-conditions'],
          ]}
        />

        <div>
          <h4 className="mb-6 text-sm font-extrabold uppercase tracking-[0.16em] text-white">Reach us</h4>
          <address className="space-y-4 text-sm not-italic text-white/60">
            {c.org && <p className="font-bold text-white">{c.org}</p>}
            {c.address && <p className="leading-relaxed">{c.address}</p>}
            {c.phone && (
              <p><a href={`tel:${c.phone.replace(/[^\d+]/g, '')}`} className="transition-colors hover:text-brand-pink">{c.phone}</a></p>
            )}
            {(c.emails || []).map((e) => (
              <p key={e}><a href={`mailto:${e}`} className="transition-colors hover:text-brand-pink">{e}</a></p>
            ))}
          </address>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-7 text-xs text-white/45 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} IDIAS. All rights reserved.</p>
          <p>Global conferences on leadership, empowerment and wellbeing.</p>
        </div>
      </div>
    </footer>
  )
}
