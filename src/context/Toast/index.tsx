'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

type Toast = {
  id: string
  message: React.ReactNode
  type: 'success' | 'error'
}

export type TaskArg = Omit<Toast, 'id'>

interface ToastContextValue {
  addToast: (toast: TaskArg) => void
  removeToast: (id: string) => void
  toasts: Toast[]
}

const ToastContext = createContext<ToastContextValue>({} as ToastContextValue)

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (toast: TaskArg) => {
      if (!toast) return

      const id = crypto.randomUUID()

      setToasts((prev) => {
        const newToasts = [...prev, { ...toast, id }]
        if (newToasts.length > 3) {
          newToasts.shift()
        }
        return newToasts
      })

      setTimeout(() => {
        removeToast(id)
      }, 3000)
    },
    [removeToast]
  )

  const value = useMemo(() => {
    return {
      addToast,
      removeToast,
      toasts,
    }
  }, [toasts, addToast, removeToast])

  return <ToastContext value={value}>{children}</ToastContext>
}

export const useToast = () => useContext(ToastContext)
