import type { Link } from '@/types'

import ActionButtons from './ActionButtons'
import Copy from './Copy'

interface LinkProps {
  link: Link
}

export default function Link({ link }: LinkProps) {
  const { id, shortCode, longUrl } = link
  const shortUrl = `${process.env.NEXT_PUBLIC_HOSTNAME}/${shortCode}`

  return (
    <div className="flex flex-col gap-6 rounded-lg bg-gray-50 p-4 md:flex-row md:items-start md:justify-between md:gap-4">
      <div className="flex flex-col gap-2">
        <a
          className="text-primary hover:underline"
          href={shortUrl}
          target="_blank"
        >
          {shortUrl}
        </a>
        <p className="text-sm font-medium !wrap-anywhere text-gray-500">
          {longUrl}
        </p>
      </div>
      <div className="flex justify-between gap-5 md:flex-col md:items-end">
        <Copy shortUrl={shortUrl} />
        <ActionButtons linkId={id} />
      </div>
    </div>
  )
}
