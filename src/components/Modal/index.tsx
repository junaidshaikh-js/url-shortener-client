import FocusLock from 'react-focus-lock'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { RemoveScroll } from 'react-remove-scroll'

import useKey from '@/hooks/useKey'
import { DOM_MAIN } from '@/constants'

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useKey('Escape', onClose)

  if (!isOpen) return null

  return createPortal(
    <FocusLock returnFocus>
      <RemoveScroll>
        <div className="fixed inset-0 isolate z-10 flex items-center justify-center">
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 mx-4 max-h-[95dvh] max-w-[600px] overflow-auto rounded-lg bg-white p-4"
            initial={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </RemoveScroll>
    </FocusLock>,
    document.getElementById(DOM_MAIN) as HTMLElement
  )
}
