import { redirect } from 'next/navigation'

import { getPathname } from '@/libs/server.utils'
import { getUser } from '@/api/user'
import Client from './Client'

export default async function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = await getPathname()
  const user = await getUser()

  if (!user && pathname !== '/') {
    redirect('/')
  }

  return <Client user={user}>{children}</Client>
}
