/** biome-ignore-all lint/a11y/noStaticElementInteractions: Modal requires onClick */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: Modal requires onClick */
import { IconX } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from './button'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  header?: React.ReactNode
  children?: React.ReactNode
}

export function Modal({ isOpen, onClose, header, children }: ModalProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex fixed items-center justify-center inset-0 z-50 bg-black/30 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col p-4 bg-indigo-950 rounded-lg"
          >
            {header !== undefined && (
              <header className="flex items-center gap-2">
                <div className="flex-1">{header}</div>
                <Button onClick={onClose} radius="md" variant="light" isIconOnly>
                  <IconX size={28} />
                </Button>
              </header>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
