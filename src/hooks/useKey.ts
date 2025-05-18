import { useEffect } from 'react'

export default function useKey(
  code: string,
  callback: (e: KeyboardEvent) => void
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === code) {
        callback(e)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })
}
