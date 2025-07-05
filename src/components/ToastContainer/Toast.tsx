import { motion } from 'framer-motion'

import { cn } from '@/libs/utils'
import { useToast } from '@/context/Toast'
import Button from '../Button'
import X from '../icons/X'

interface ToastProps {
  id: string
  message: React.ReactNode
  type: 'success' | 'error'
}

const toastVariants = {
  error: 'bg-error text-white',
  success: 'bg-success text-white',
}

export default function Toast({ type, message, id }: ToastProps) {
  const { removeToast } = useToast()

  return (
    <motion.div
      animate={{ opacity: 1, x: '0%' }}
      exit={{ opacity: 0, x: '-100%' }}
      initial={{ opacity: 0, x: '-100%' }}
      key={id}
      transition={{ type: 'spring', damping: 20, stiffness: 250 }}
      className={cn(
        'flex items-center justify-between gap-2 rounded-lg p-2 font-medium',
        toastVariants[type]
      )}
    >
      <span>{message}</span>
      <Button
        aria-label="Close"
        className="p-3"
        onClick={() => removeToast(id)}
      >
        <X size={20} />
      </Button>
    </motion.div>
  )
}
