'use client'

import copy from 'copy-to-clipboard'

import Button from '@/components/Button'
import { createSuccessToast } from '@/libs/utils'
import { useToast } from '@/context/Toast'

export default function Copy({ shortUrl }: { shortUrl: string }) {
  const { addToast } = useToast()

  function handleCopyClick() {
    copy(shortUrl)
    addToast(createSuccessToast('Link copied to clipboard'))
  }

  return (
    <Button
      className="w-fit min-w-[120px] text-sm font-medium uppercase md:text-base"
      onClick={handleCopyClick}
      variant="secondary"
    >
      Copy
    </Button>
  )
}
