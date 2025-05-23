export default async function fetchShortenerApi(
  path: string,
  method?: 'GET' | 'POST',
  body?: Record<string, unknown>
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_SHORTENER_API}${path}`,
    {
      credentials: 'include',
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
      status: res.status,
      error: json.error,
    }
  }

  return {
    ok: res.ok,
    data: json.data,
  }
}
