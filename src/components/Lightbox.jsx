import { useEffect, useCallback, useRef } from 'react'

export default function Lightbox({ images, index, onIndex, onClose }) {
  const open = index !== null && index !== undefined
  const closeRef = useRef(null)

  const next = useCallback(() => onIndex((index + 1) % images.length), [index, images.length, onIndex])
  const prev = useCallback(() => onIndex((index - 1 + images.length) % images.length), [index, images.length, onIndex])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, next, prev, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-purpleDeep/96 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="noise pointer-events-none absolute inset-0" />

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close viewer"
        className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition hover:bg-brand-pink"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); prev() }}
        aria-label="Previous image"
        className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition hover:bg-brand-pink sm:left-6 sm:h-14 sm:w-14"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </button>

      <figure onClick={(e) => e.stopPropagation()} className="relative max-h-[86vh] max-w-[92vw]">
        <img
          src={images[index]}
          alt={`Gallery image ${index + 1} of ${images.length}`}
          className="max-h-[82vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
        />
      </figure>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); next() }}
        aria-label="Next image"
        className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition hover:bg-brand-pink sm:right-6 sm:h-14 sm:w-14"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      </button>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-bold tabular-nums text-white backdrop-blur">
        {index + 1} / {images.length}
      </p>
    </div>
  )
}
