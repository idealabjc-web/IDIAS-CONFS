import { useCountUp } from '../hooks/useMotion.js'

function Stat({ value, label, suffix = '+', light }) {
  const [ref, n] = useCountUp(value)
  return (
    <div ref={ref} className="text-center">
      <p className={`font-display text-4xl font-black tabular-nums sm:text-5xl ${light ? 'text-white' : 'text-brand-purple'}`}>
        {n}
        <span className="text-brand-pink">{suffix}</span>
      </p>
      <p className={`mt-2 text-[11px] font-bold uppercase leading-tight tracking-[0.16em] ${light ? 'text-white/55' : 'text-ink-muted'}`}>
        {label}
      </p>
    </div>
  )
}

export default function Stats({ items = [], light = false, className = '' }) {
  if (!items.length) return null
  return (
    <div className={`grid gap-8 ${items.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-3'} ${className}`}>
      {items.map((it) => (
        <Stat key={it.label} value={it.value} label={it.label} suffix={it.suffix} light={light} />
      ))}
    </div>
  )
}
