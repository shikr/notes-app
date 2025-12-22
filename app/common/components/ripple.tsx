import { AnimatePresence, motion } from 'motion/react'
import type { RippleData } from '../hooks/useRipple'

interface RippleProps {
  ripples: RippleData[]
  clearRipple: (id: number) => void
}

export function Ripple({ ripples, clearRipple }: RippleProps) {
  return (
    <AnimatePresence>
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.35 }}
          animate={{ scale: 2, opacity: 0.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute bg-current rounded-full pointer-events-none"
          style={{
            width: ripple.size,
            height: ripple.size,
            top: ripple.y,
            left: ripple.x
          }}
          onAnimationComplete={() => clearRipple(ripple.id)}
        />
      ))}
    </AnimatePresence>
  )
}
