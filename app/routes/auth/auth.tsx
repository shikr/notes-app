import { AnimatePresence, motion } from 'motion/react'
import { useLocation, useOutlet } from 'react-router'

export default function Auth() {
  const location = useLocation()
  // Use the outlet hook instead of the Outlet component
  // to avoid flickering during animations
  const outlet = useOutlet()

  const isRegister = location.pathname.includes('register')

  return (
    <section className="flex-1 flex items-center justify-center">
      <motion.div
        layout
        className="relative"
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ x: isRegister ? '100%' : '-100%', opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: isRegister ? '-100%' : '100%', opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full p-4 rounded-xl bg-indigo-950/60"
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
