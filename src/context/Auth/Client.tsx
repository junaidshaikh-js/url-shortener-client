'use client'

import { createContext } from 'react'

export type User = {
  email: string
  joinedOn: string
  name: string
}

interface AuthInterface {
  user: User
}

export const AuthContext = createContext<AuthInterface>({} as AuthInterface)

interface ClientProviderProps {
  children: React.ReactNode
  user: User | null
}

export default function Client({ children, user }: ClientProviderProps) {
  if (!user) return children

  return <AuthContext value={{ user }}>{children}</AuthContext>
}
