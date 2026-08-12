import { useParallax } from '../hooks/useMotion.js'

/**
 * Parallax layer. Put an absolutely-positioned image inside and give the
 * wrapper `overflow-hidden` so the movement is clipped.
 * Use a taller inner element (e.g. -inset-y-24) so no gap appears at the edges.
 */
export default function Parallax({ speed = 0.18, max = 220, className = '', children }) {
  const ref = useParallax(speed, { max })
  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  )
}
