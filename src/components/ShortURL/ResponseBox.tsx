import copy from 'copy-to-clipboard'
import { motion } from 'motion/react'
import { useState } from 'react'

import Button from '../Button'
import Copy from '../icons/Copy'
import Tooltip from '../Tooltip'

interface ResponseBoxProps {
  longUrl: string
  shortUrl: string
}

export default function ResponseBox({ shortUrl, longUrl }: ResponseBoxProps) {
  const [isUrlCopied, setIsUrlCopied] = useState(false)

  if (!shortUrl) return null

  function handleCopyClick() {
    if (isUrlCopied) return
    copy(shortUrl)
    setIsUrlCopied(true)
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="border-secondary mt-5 flex items-center justify-between rounded-lg border p-4 shadow-md"
      initial={{ opacity: 0, y: -100 }}
    >
      <div className="flex flex-col gap-2">
        <a
          className="text-primary bg-white hover:underline"
          href={shortUrl}
          target="_blank"
        >
          {shortUrl}
        </a>
        <p className="text-sm font-medium !wrap-anywhere text-gray-500">
          {longUrl}
        </p>
      </div>
      <Tooltip
        className="shrink-0"
        content={isUrlCopied ? 'Copied!' : 'Copy'}
        onMouseLeave={() => setIsUrlCopied(false)}
      >
        <Button onClick={handleCopyClick}>
          <Copy />
          <span className="sr-only">Copy short url to clipboard</span>
        </Button>
      </Tooltip>
    </motion.div>
  )
}
