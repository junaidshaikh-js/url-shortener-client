import { useState } from 'react'

import Modal from '@/components/Modal'
import type { AuthModalProps, AuthModalView } from './type'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

export default function AuthModal({ isOpen, setIsOpen }: AuthModalProps) {
  const [view, setView] = useState<AuthModalView>('signIn')

  const updateView = (newView: AuthModalView) => {
    setView(newView)
  }

  const handleOnClose = () => {
    setIsOpen(false)
    setView('signIn')
  }

  const getView = () => {
    switch (view) {
      case 'signIn':
        return <SignInForm updateView={updateView} />
      case 'signUp':
        return <SignUpForm updateView={updateView} />
      default:
        return null
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      {getView()}
    </Modal>
  )
}
