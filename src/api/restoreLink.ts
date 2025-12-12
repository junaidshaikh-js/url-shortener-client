'use server'

import { getToken } from '@/libs/server.utils'

import fetchShortenerApi from './fetchShortenerApi'
import type { ApiActionResponse } from './types'

export default async function restoreLink(
  linkId: string
): Promise<ApiActionResponse> {
  const token = await getToken()
  const headers = token ? { authorization: token } : {}

  const res = await fetchShortenerApi(`/user/links/${linkId}/restore`, {
    method: 'PATCH',
    headers,
  })

  if (res.error) {
    return { error: res.error }
  }

  return { success: true }
}
