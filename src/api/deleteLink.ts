'use server'

import { getToken } from '@/libs/server.utils'

import fetchShortenerApi from './fetchShortenerApi'

interface DeleteResponse {
  error?: string
  success?: boolean
}

export default async function deleteLink(
  linkId: string
): Promise<DeleteResponse> {
  const token = await getToken()
  const headers = token ? { authorization: token } : {}

  const res = await fetchShortenerApi(`/user/links/${linkId}`, {
    method: 'DELETE',
    headers,
  })

  if (res.error) {
    return { error: res.error }
  }

  return { success: true }
}
