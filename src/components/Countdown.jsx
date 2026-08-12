import { useEffect, useState } from 'react'

function diff(target) {
  const ms = target.getTime() - Date.now()
  if (ms <= 0) return null
  const s = Math.floor(ms / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

export default function Countdown({ target, light = true }) {
  const [t, setT] = useState(() => (target ? diff(target) : null))

  useEffect(() => {
    if (!target) return
    const id = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (!target || !t) return null

  const units = [
    ['Days', t.days],
    ['Hours', t.hours],
    ['Mins', t.minutes],
    ['Secs', t.seconds],
  ]

  return (
    <div className="flex gap-2.5 sm:gap-3.5">
      {units.map(([label, value]) => (
        <div
          key={label}
          className={`flex min-w-[68px] flex-col items-center rounded-2xl px-3 py-3 sm:min-w-[82px] sm:py-4 ${
            light
              ? 'border border-white/15 bg-white/[0.08] backdrop-blur-md'
              : 'bg-brand-purple/[0.06]'
          }`}
        >
          <span
            className={`font-display text-2xl font-black tabular-nums sm:text-3xl ${
              light ? 'text-white' : 'text-brand-purple'
            }`}
          >
            {String(value).padStart(2, '0')}
          </span>
          <span
            className={`mt-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
              light ? 'text-white/55' : 'text-ink-muted'
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
