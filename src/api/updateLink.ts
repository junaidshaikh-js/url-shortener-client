import { getToken } from '@/libs/utils'
import fetchShortenerApi from './fetchShortenerApi'

type UpdateLinkData = {
  url: string
}

export default async function updateLink(
  shortCode: string,
  data: UpdateLinkData
) {
  const token = getToken()
  const headers = token ? { authorization: token } : {}

  const res = await fetchShortenerApi(`/url/${shortCode}`, {
    body: data,
    method: 'PATCH',
    headers,
  })

  if (res.error) {
    return {
      error: res.error,
    }
  }

  return {
    success: true,
    data: res.data,
  }
}
