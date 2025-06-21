'use client'

import { use } from 'react'

import { AuthContext } from '@/context/Auth/Client'
import SignIn from '../SignIn'
import UserMenu from './UserMenu'

export default function Header() {
  const { user } = use(AuthContext)

  return (
    <header className="fixed top-0 right-0 left-0 z-10 flex min-h-20 justify-end bg-white p-4 shadow-md">
      {user ? <UserMenu /> : <SignIn />}
    </header>
  )
}
