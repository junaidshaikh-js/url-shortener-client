'use client'

import { useActionState, useEffect, useRef, useState } from 'react'

import Button from '../Button'
import TextInput from '../form/TextInput'
import ResponseBox from './ResponseBox'

export default function ShortUrl() {
  const [url, setUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [response, setResponse] = useState({
    longUrl: '',
    shortUrl: '',
  })

  const [state, submitAction, isPending] = useActionState(async () => {
    if (!url)
      return {
        error: 'Please enter a URL',
      }

    try {
      new URL(url)
      // Simulate a network request to shorten the URL
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, 2000)
      })
      return {
        longUrl: url,
        shortUrl: `${process.env.NEXT_PUBLIC_HOSTNAME}/asdf`,
      }
    } catch {
      return {
        error: 'Invalid URL',
      }
    }
  }, null)

  useEffect(() => {
    if (!state) return

    setError(state.error || null)
    if (state.error) {
      inputRef.current?.focus()
    }

    if (state.shortUrl) {
      setResponse({
        longUrl: state.longUrl,
        shortUrl: state.shortUrl,
      })
      setUrl('')
    }
  }, [state])

  return (
    <div className="mx-auto w-full max-w-[600px]">
      <form className="flex flex-col gap-4 md:flex-row" action={submitAction}>
        <div className="grow">
          <TextInput
            className="w-full placeholder:font-medium"
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your really large URL..."
            ref={inputRef}
            value={url}
          />
          {error && (
            <p className="mt-2 text-sm font-medium text-red-500">{error}</p>
          )}
        </div>
        <Button
          className="mx-auto w-[150px] self-start py-3 font-medium uppercase"
          disabled={isPending}
          type="submit"
          variant="primary"
        >
          Shorten
        </Button>
      </form>
      <ResponseBox shortUrl={response.shortUrl} longUrl={response.longUrl} />
    </div>
  )
}
