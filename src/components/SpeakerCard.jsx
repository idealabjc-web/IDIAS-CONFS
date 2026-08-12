import Img from './Img.jsx'

export default function SpeakerCard({ speaker, compact = false }) {
  return (
    <figure className="group relative overflow-hidden rounded-3xl bg-brand-purpleDark shadow-soft transition-shadow duration-500 hover:shadow-lift">
      <Img
        src={speaker.image}
        alt={speaker.name}
        ratio="aspect-[4/5]"
        rounded="rounded-3xl"
        position="object-top"
        zoom
      />

      {/* gradient veil deepens on hover */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-purpleDeep via-brand-purpleDeep/25 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95" />

      {/* pink wash sweeps in */}
      <span className="pointer-events-none absolute inset-0 translate-y-full bg-gradient-to-t from-brand-pink/55 to-transparent transition-transform duration-700 ease-smooth group-hover:translate-y-0" />

      <figcaption className={`absolute inset-x-0 bottom-0 ${compact ? 'p-4' : 'p-5'}`}>
        <h3 className={`font-extrabold leading-tight text-white ${compact ? 'text-[13px]' : 'text-base'}`}>
          {speaker.name}
        </h3>
        {speaker.role && (
          <p className={`mt-1 font-bold uppercase tracking-[0.14em] text-brand-pink transition-colors duration-300 group-hover:text-white ${compact ? 'text-[9px]' : 'text-[10px]'}`}>
            {speaker.role}
          </p>
        )}
        <span className="mt-3 block h-0.5 w-0 rounded-full bg-white transition-all duration-500 ease-smooth group-hover:w-12" />
      </figcaption>
    </figure>
  )
}
