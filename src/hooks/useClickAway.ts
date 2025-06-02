import { useEffect, useRef } from 'react'

export default function useClickAway<E extends HTMLElement>(cb: VoidFunction) {
  const ref = useRef<E | null>(null)
  const cbRef = useRef(cb)

  useEffect(() => {
    cbRef.current = cb
  }, [cb])

  useEffect(() => {
    const handleClick = (e: TouchEvent | MouseEvent) => {
      const clickedElem = e.target as HTMLElement

      if (clickedElem && !ref.current?.contains(clickedElem)) {
        cbRef.current()
      }
    }

    document.body.addEventListener('mousedown', handleClick)
    document.body.addEventListener('touchstart', handleClick, { passive: true })

    return () => {
      document.body.removeEventListener('mousedown', handleClick)
      document.body.removeEventListener('touchstart', handleClick)
    }
  }, [])

  return ref
}
