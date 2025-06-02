import { getServerCookie } from '@/libs/server.utils'
import { User } from '@/context/Auth/Client'
import fetchShortenerApi from './fetchShortenerApi'

const getToken = async () => {
  const token = await getServerCookie('auth_token')
  if (!token) return null
  return `Bearer ${token.value}`
}

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
