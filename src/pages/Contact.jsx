import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import content from '../data/content.json'
import PageHero from '../components/PageHero.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Reveal from '../components/Reveal.jsx'

function Field({ label, name, type = 'text', required, defaultValue, as, placeholder }) {
  const cls =
    'w-full rounded-2xl bg-brand-purple/[0.04] px-5 py-3.5 text-sm outline-none ring-1 ring-transparent transition-all duration-300 placeholder:text-ink-muted/70 focus:bg-white focus:ring-2 focus:ring-brand-pink/40'
  return (
    <label className="block">
      <span className="mb-2.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-brand-purple">
        {label} {required && <span className="text-brand-pink">*</span>}
      </span>
      {as === 'textarea' ? (
        <textarea name={name} rows="6" required={required} placeholder={placeholder} defaultValue={defaultValue} className={cls} />
      ) : (
        <input type={type} name={name} required={required} placeholder={placeholder} defaultValue={defaultValue} className={cls} />
      )}
    </label>
  )
}

export default function Contact() {
  const c = content.contact || {}
  const { state } = useLocation()
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    // Netlify intercepts the POST in production. Locally, show the success state.
    if (!/netlify\.app$/.test(window.location.hostname) && window.location.hostname !== 'idias.org') {
      e.preventDefault()
      setSent(true)
    }
  }

  const CARDS = [
    {
      title: 'Call or WhatsApp',
      icon: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z',
      lines: c.phone ? [c.phone] : [],
      href: c.phone ? `tel:${c.phone.replace(/[^\d+]/g, '')}` : null,
    },
    {
      title: 'Email',
      icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6',
      lines: c.emails || [],
      hrefFor: (l) => `mailto:${l}`,
    },
    {
      title: 'Location',
      icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
      extra: <circle cx="12" cy="10" r="3" />,
      lines: [c.org, c.address].filter(Boolean),
    },
  ]

  return (
    <>
      <PageHero
        kicker="Say hello"
        title="Contact"
        subtitle="Questions about abstracts, registration, venues or sponsorship? Our team replies personally."
        image={content.gallery?.[24]}
      />

      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="orb -right-40 top-10 h-96 w-96 bg-brand-pink/[0.06]" />
        <div className="container-x relative">
          <SectionTitle eyebrow="Get information" title="Contact information" />
          <div className="grid gap-6 md:grid-cols-3">
            {CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 100}>
                <div className="card group h-full p-9 text-center hover:-translate-y-2">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d={card.icon} />
                      {card.extra}
                    </svg>
                  </div>
                  <h3 className="mb-4 text-lg font-extrabold text-brand-purple">{card.title}</h3>
                  {card.lines.map((l) => {
                    const href = card.hrefFor ? card.hrefFor(l) : card.href
                    return (
                      <p key={l} className="text-sm leading-relaxed text-ink-soft">
                        {href ? (
                          <a href={href} className="transition-colors hover:text-brand-pink">{l}</a>
                        ) : l}
                      </p>
                    )
                  })}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 lg:py-28">
        <div className="container-x max-w-3xl">
          <SectionTitle eyebrow="Have questions?" title="Send a message" />

          {sent ? (
            <Reveal variant="zoom">
              <div className="card p-12 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-white shadow-glow">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h3 className="text-2xl font-extrabold text-brand-purple">Message ready to send</h3>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
                  This is the local preview. Once deployed to Netlify, submissions land in your
                  Netlify Forms inbox and can be forwarded to {c.emails?.[0] || 'your inbox'}.
                </p>
                <button type="button" onClick={() => setSent(false)} className="btn-ghost mt-8">
                  Send another
                </button>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={onSubmit}
                className="card p-8 sm:p-11"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>Do not fill this in: <input name="bot-field" /></label>
                </p>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Your name" name="name" required placeholder="Jane Doe" />
                  <Field label="Email address" name="email" type="email" required placeholder="jane@example.com" />
                  <Field label="Phone" name="phone" type="tel" placeholder="+1 555 000 0000" />
                  <Field label="Conference of interest" name="subject" defaultValue={state?.subject || ''} placeholder="Which congress?" />
                </div>
                <div className="mt-6">
                  <Field label="Message" name="message" as="textarea" required placeholder="Tell us how we can help..." />
                </div>

                <button type="submit" className="btn-primary mt-8 w-full sm:w-auto">
                  Send message
                </button>
                <p className="mt-5 text-xs text-ink-muted">
                  We use your details only to reply to this enquiry.
                </p>
              </form>
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
