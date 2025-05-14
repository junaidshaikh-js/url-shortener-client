'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="grid min-h-dvh place-items-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h2>Something went wrong at our end!</h2>
        <button className="cursor-pointer text-xl" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </div>
  )
}
