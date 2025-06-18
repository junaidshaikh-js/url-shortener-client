import { AUTH_TOKEN } from '@/constants'
import { cookies, headers } from 'next/headers'

export async function getServerCookie(name: string) {
  const cookieStore = await cookies()
  return cookieStore.get(name)
}

export async function getPathname() {
  const headerStore = await headers()
  return headerStore.get('x-path')
}

export const getToken = async () => {
  const token = await getServerCookie(AUTH_TOKEN)
  if (!token) return null
  return `Bearer ${token.value}`
}
