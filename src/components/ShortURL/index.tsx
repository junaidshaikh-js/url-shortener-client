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
  const inputRef = useRef<HTMLInputElement>(null)
  const { addToast } = useToast()

  const [state, submitAction, isPending] = useActionState(async () => {
    if (!url) {
      inputRef.current?.focus()
      return {
        error: 'Please enter a URL',
      }
    }

    try {
      new URL(url)
      const shortenedUrl = await shortenUrl(url)

      if (shortenedUrl.error) {
        inputRef.current?.focus()
        return {
          error: shortenedUrl.error,
        }
      }

      onSuccess?.()
      setUrl('')
      addToast(createSuccessToast('Short URL created'))

      return shortenedUrl
    } catch {
      inputRef.current?.focus()
      return {
        error: 'Invalid URL',
      }
    }
  }, null)

  const error = state?.error
  const response = {
    longUrl: state?.longUrl ?? '',
    shortUrl: state?.shortUrl ?? '',
  }

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
