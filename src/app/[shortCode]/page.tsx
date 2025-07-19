import { notFound, permanentRedirect } from 'next/navigation'

import fetchShortenerApi from '@/api/fetchShortenerApi'

export default async function ShortCode({
  params,
}: {
  params: Promise<{ shortCode: string }>
}) {
  const { shortCode } = await params
  const res = await fetchShortenerApi(`/url/${shortCode}`)

  if (res.status === 404 || res.error) notFound()

  permanentRedirect(res.data.longUrl)
}
