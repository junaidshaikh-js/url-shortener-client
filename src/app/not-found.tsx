'use client'

import Image from 'next/image'
import Link from '@/components/Link'
import { usePathname } from 'next/navigation'

export default function NotFound() {
  const pathname = usePathname()

  if (/^\/[a-zA-Z1-9]+$/.test(pathname)) {
    return (
      <div className="mx-auto flex h-screen max-w-4xl flex-col items-center justify-center gap-4 p-8 text-center md:flex-row">
        <div className="flex flex-col items-center gap-5 md:items-start">
          <h1 className="h3 text-center font-semibold md:text-left">
            This link may have been deleted or never existed.
          </h1>
          <Link
            className="w-fit font-semibold uppercase"
            href="/"
            variant="secondary"
          >
            Create your own link today
          </Link>
        </div>
        <Image src="/assets/not-found.jpg" alt="" width={400} height={400} />
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-4 md:flex-row">
      <section className="mx-4 flex flex-col items-center justify-center gap-5 md:items-start">
        <h1 className="h3 text-center md:text-left">
          The page you are looking for doesn&apos;t exist
        </h1>
        <Link href="/" variant="primary" className="font-semibold uppercase">
          Go back to home
        </Link>
      </section>
      <Image src="/assets/not-found.jpg" alt="" width={400} height={400} />
    </div>
  )
}
