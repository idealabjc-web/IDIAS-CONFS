/**
 * Infinite logo marquee. The track is duplicated and translated -50%,
 * so the loop is seamless. Pauses on hover.
 */
export default function Marquee({ items = [], renderItem, speed = 42 }) {
  if (!items.length) return null
  const track = [...items, ...items]

  return (
    <div className="group relative overflow-hidden mask-fade-x">
      <div
        className="flex w-max animate-marquee items-center gap-6 group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {track.map((item, i) => (
          <div key={i} className="shrink-0">
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    </div>
  )
}
