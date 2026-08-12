import { useReveal } from '../hooks/useMotion.js'

/**
 * Wraps children in a scroll-triggered reveal.
 * variant: 'up' | 'left' | 'right' | 'zoom'
 * delay: milliseconds, staggered lists read nicely at 60-90ms apart.
 */
export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  as: Tag = 'div',
  className = '',
  ...rest
}) {
  const ref = useReveal()
  const variantCls =
    variant === 'left'
      ? 'reveal-left'
      : variant === 'right'
        ? 'reveal-right'
        : variant === 'zoom'
          ? 'reveal-zoom'
          : ''

  return (
    <Tag
      ref={ref}
      className={`reveal ${variantCls} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
