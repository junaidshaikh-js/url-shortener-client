'use client'

import { useActionState, useEffect, useRef, useState } from 'react'

import shortenUrl from '@/api/shortenUrl'
import { createSuccessToast } from '@/libs/utils'
import { useToast } from '@/context/Toast'
import Button from '../Button'
import ResponseBox from './ResponseBox'
import TextInput from '../form/TextInput'

interface ShortUrlProps {
  onSuccess?: VoidFunction
}

export default function ShortUrl({ onSuccess }: ShortUrlProps) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [response, setResponse] = useState({
    longUrl: '',
    shortUrl: '',
  })
  const { addToast } = useToast()

  const [state, submitAction, isPending] = useActionState(async () => {
    if (!url)
      return {
        error: 'Please enter a URL',
      }

    try {
      new URL(url)
      const shortenedUrl = await shortenUrl(url)
      if (shortenedUrl.error) {
        return {
          error: shortenedUrl.error,
        }
      }
      onSuccess?.()
      return shortenedUrl
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
      addToast(createSuccessToast('Short URL created'))
    }
  }, [state, addToast])

  return (
    <div className="mx-auto w-full max-w-[600px]">
      <form className="flex flex-col gap-4 md:flex-row" action={submitAction}>
        <div className="grow">
          <TextInput
            className="w-full placeholder:font-medium"
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your really long URL..."
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
