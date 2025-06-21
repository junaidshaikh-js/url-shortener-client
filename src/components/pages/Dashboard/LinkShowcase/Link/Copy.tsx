'use client'

import copy from 'copy-to-clipboard'

import Button from '@/components/Button'

export default function Copy({ shortUrl }: { shortUrl: string }) {
  function handleCopyClick() {
    copy(shortUrl)
  }

  return (
    <Button
      className="w-fit font-medium uppercase"
      onClick={handleCopyClick}
      variant="secondary"
    >
      Copy
    </Button>
  )
}
