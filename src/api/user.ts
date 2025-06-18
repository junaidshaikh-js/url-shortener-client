import { getToken } from '@/libs/server.utils'
import { User } from '@/context/Auth/Client'
import fetchShortenerApi from './fetchShortenerApi'

export async function getUser(): Promise<User | null> {
  const token = await getToken()
  if (!token) return null

  try {
    const res = await fetchShortenerApi('/user/details', {
      headers: {
        authorization: token,
      },
    })

    if (res.error) {
      return null
    }

    return res.data
  } catch {
    console.error('Error fetching user')
    return null
  }
}
