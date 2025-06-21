'use server'

import type { Link } from '@/types'
import { getToken } from '@/libs/server.utils'
import fetchShortenerApi from './fetchShortenerApi'

interface GetLinksResponse {
  error?: string
  links?: Link[]
}

export default async function getLinks(): Promise<GetLinksResponse> {
  const token = await getToken()
  const headers = token ? { authorization: token } : {}

  const res = await fetchShortenerApi('/user/links', {
    headers,
  })

  if (res.error) {
    return {
      error: res.error,
    }
  }

  return {
    links: res.data,
  }
}
