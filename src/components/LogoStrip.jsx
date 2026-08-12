import Marquee from './Marquee.jsx'

function Tile({ src, alt }) {
  return (
    <div className="flex h-28 w-52 items-center justify-center rounded-2xl bg-white p-5 shadow-soft ring-1 ring-black/[0.05] transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="max-h-full max-w-full object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
      />
    </div>
  )
}

export default function LogoStrip({ logos = [], label = 'Partner', marquee = false }) {
  if (!logos.length) return null

  if (marquee && logos.length > 2) {
    return (
      <Marquee
        items={logos}
        speed={36}
        renderItem={(src, i) => <Tile src={src} alt={`${label} ${(i % logos.length) + 1}`} />}
      />
    )
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {logos.map((src, i) => (
        <Tile key={src} src={src} alt={`${label} ${i + 1}`} />
      ))}
    </div>
  )
}
