import Link from '@/components/Link'

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100dvh-160px)] flex-col items-center justify-center gap-5">
      <h1 className="h3 text-center">
        The page you are looking for doesn&apos;t exist
      </h1>
      <Link href="/" variant="primary" className="font-semibold uppercase">
        Go back to home
      </Link>
    </section>
  )
}
