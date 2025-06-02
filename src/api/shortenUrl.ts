import fetchShortenerApi from './fetchShortenerApi'

export default async function shortenUrl(url: string) {
  const res = await fetchShortenerApi('/url/shorten', {
    body: { url },
    method: 'POST',
  })
  if (res.error) {
    return {
      error: res.error,
    }
  }
  return {
    longUrl: res.data.longUrl,
    shortUrl: `${process.env.NEXT_PUBLIC_HOSTNAME}/${res.data.shortCode}`,
  }
}
