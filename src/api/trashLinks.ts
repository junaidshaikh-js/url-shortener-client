'use server'

import type { Link } from '@/types'
import { getToken } from '@/libs/server.utils'

import fetchShortenerApi from './fetchShortenerApi'

interface GetTrashLinksResponse {
  error?: string
  links?: Link[]
}

export default async function getTrashLinks(): Promise<GetTrashLinksResponse> {
  const token = await getToken()
  const headers = token ? { authorization: token } : {}

  const res = await fetchShortenerApi('/user/links/trash', {
    headers,
  })

  if (res.error) {
    return { error: res.error }
  }

  return {
    links: res.data,
  }
}
