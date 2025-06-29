'use client'

import { use } from 'react'

import { AuthContext } from '@/context/Auth/Client'
import Container from '@/components/Container'
import SignIn from '@/components/SignIn'

import UserMenu from './UserMenu'

export default function Header() {
  const { user } = use(AuthContext)

  return (
    <header className="fixed top-0 right-0 left-0 z-10 min-h-20 bg-white py-4 shadow-md">
      <Container className="flex items-center justify-end">
        {user ? <UserMenu /> : <SignIn />}
      </Container>
    </header>
  )
}
