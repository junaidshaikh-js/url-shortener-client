import { cookies, headers } from 'next/headers'

export async function getServerCookie(name: string) {
  const cookieStore = await cookies()
  return cookieStore.get(name)
}

export async function getPathname() {
  const headerStore = await headers()
  return headerStore.get('x-path')
}
