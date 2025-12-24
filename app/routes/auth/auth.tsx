import { AnimatePresence, motion } from 'motion/react'
import { useLocation, useNavigate, useOutlet, useRouteLoaderData } from 'react-router'
import type { User } from '~/database/schema'

export default function Auth() {
  const { user } = useRouteLoaderData<{ user: User | null }>('routes/app-layout') ?? {
    user: null
  }
  const location = useLocation()
  // Use the outlet hook instead of the Outlet component
  // to avoid flickering during animations
  const outlet = useOutlet()
  const navigate = useNavigate()

  if (user !== null) {
    void navigate('/')
    return null
  }

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
