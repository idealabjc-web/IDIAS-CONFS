import { VaporCountdown } from '@/components/ui/countdown-vapor-digits'

export default function Countdown({ target }) {
  if (!target) return null

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/[0.12] via-white/[0.07] to-white/[0.03] p-6 sm:p-7 backdrop-blur-2xl shadow-lift">
      <div className="flex justify-center py-1">
        <VaporCountdown
          targetDate={target}
          className="font-display text-white"
        />
      </div>
    </div>
  )
}
