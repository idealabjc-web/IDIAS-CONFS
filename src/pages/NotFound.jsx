import { Link } from 'react-router-dom'
import content from '../data/content.json'

export default function NotFound() {
  const bg = (content.gallery || [])[30] || (content.gallery || [])[0]

  return (
    <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden bg-brand-purpleDeep">
      {bg && <img src={bg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-20" />}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purpleDeep/95 via-brand-purple/85 to-brand-violet/60" />
      <div className="absolute inset-0 bg-grid-fade bg-grid opacity-40" />
      <div className="noise absolute inset-0" />
      <div className="orb -left-32 top-0 h-96 w-96 animate-floaty bg-brand-pink/20" />

      <div className="container-x relative z-10 py-24 text-center">
        <p className="font-display text-[7rem] font-black leading-none text-white/10 sm:text-[11rem]">404</p>
        <h1 className="-mt-6 text-3xl font-extrabold text-white sm:text-4xl">
          We could not find that page
        </h1>
        <p className="mx-auto mt-5 max-w-md text-white/70">
          The link may be out of date. Try the conference listing or head back to the homepage.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-white">Back home</Link>
          <Link to="/events" className="btn-outline">Browse conferences</Link>
        </div>
      </div>
    </section>
  )
}
