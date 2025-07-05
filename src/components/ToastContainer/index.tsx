'use client'

import { AnimatePresence } from 'motion/react'

import { cn } from '@/libs/utils'
import { useToast } from '@/context/Toast'
import Toast from './Toast'

export default function ToastContainer() {
  const { toasts } = useToast()

  return (
    <>
      <div
        className={cn(
          'fixed top-0 left-0 isolate z-20 w-full max-w-[400px] py-4',
          { 'pointer-events-none': toasts.length === 0 }
        )}
        aria-live="polite"
      >
        <div className="flex flex-col gap-3 px-4">
          <AnimatePresence>
            {toasts.map((toast) => {
              return <Toast key={toast.id} {...toast} />
            })}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
