'use client'

import { usePathname } from 'next/navigation'

import SignIn from '../SignIn'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 right-0 left-0 flex min-h-20 justify-end bg-white p-4 shadow-md">
      {/* temporary, will be rendered conditionally based on user auth state in upcoming PR */}
      {pathname === '/' ? <SignIn /> : <span>User</span>}
    </header>
  )
}
