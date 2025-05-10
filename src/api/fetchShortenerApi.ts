export default async function fetchShortenerApi(
  path: string,
  method?: 'GET' | 'POST',
  body?: Record<string, unknown>
) {
  console.log(body)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_SHORTENER_API}${path}`,
    {
      method: method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    }
  )
  const json = await res.json()

  if (!json.ok) {
    return {
      error: json.error,
    }
  }

  return json.data
}
