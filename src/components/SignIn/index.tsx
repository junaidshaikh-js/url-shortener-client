'use client'

import { useState } from 'react'

import Button from '../Button'
import AuthModal from './AuthModal'

export default function SignIn() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="secondary"
        className="font-medium"
        onClick={() => setIsOpen(true)}
      >
        Sign In
      </Button>
      <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
