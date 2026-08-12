import Reveal from './Reveal.jsx'

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}) {
  const isCenter = align === 'center'
  return (
    <div className={`mb-14 max-w-3xl ${isCenter ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className={`eyebrow ${isCenter ? 'justify-center' : ''}`}>{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={70}>
        <h2 className={`h-display ${light ? 'text-white' : 'text-brand-purple'}`}>{title}</h2>
      </Reveal>
      <Reveal delay={130}>
        <span
          className={`mt-6 block h-[3px] w-24 rounded-full bg-brand-gradient ${
            isCenter ? 'mx-auto' : ''
          }`}
        />
      </Reveal>
      {subtitle && (
        <Reveal delay={190}>
          <p className={`lede mt-7 ${light ? 'text-white/75' : 'text-ink-soft'}`}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}
