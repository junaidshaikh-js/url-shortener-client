import { permanentRedirect } from 'next/navigation'

import fetchShortenerApi from '@/api/fetchShortenerApi'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await params
  const res = await fetchShortenerApi(`/url/${shortCode}`)

  permanentRedirect(res.error ? '/' : res.data.longUrl)
}
