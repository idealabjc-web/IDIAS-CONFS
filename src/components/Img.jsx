import { useState } from 'react'

/**
 * Image with a fixed aspect-ratio frame so nothing ever jumps or stretches.
 * `ratio` is any Tailwind aspect class, e.g. 'aspect-[16/10]', 'aspect-square'.
 */
export default function Img({
  src,
  alt = '',
  ratio = 'aspect-[16/10]',
  className = '',
  imgClassName = '',
  position = 'object-center',
  zoom = false,
  eager = false,
  rounded = 'rounded-3xl',
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`img-frame ${zoom ? 'img-zoom' : ''} ${ratio} ${rounded} ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 overflow-hidden bg-brand-purple/[0.07]">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/45 to-transparent" />
        </div>
      )}
      {src && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`${position} ${imgClassName} transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  )
}
