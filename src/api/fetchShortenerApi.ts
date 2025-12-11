type Options = {
  body?: Record<string, unknown>
  headers?: Record<string, unknown>
  method?: 'GET' | 'POST' | 'DELETE'
}

const API_URL = process.env.NEXT_PUBLIC_URL_SHORTENER_API!

export default async function fetchShortenerApi(
  path: string,
  options: Options = {}
) {
  const { method, body, headers } = options

  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    method: method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
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
