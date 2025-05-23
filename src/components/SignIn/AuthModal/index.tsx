import { useState } from 'react'

import Modal from '@/components/Modal'
import type { AuthModalProps, AuthModalView } from './type'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

export default function AuthModal({ isOpen, setIsOpen }: AuthModalProps) {
  const [view, setView] = useState<AuthModalView>('signIn')
  const [error, setError] = useState('')

  const updateView = (newView: AuthModalView) => {
    setView(newView)
    setError('')
  }

  const handleOnClose = () => {
    setIsOpen(false)
    setView('signIn')
  }

  const getView = () => {
    switch (view) {
      case 'signIn':
        return <SignInForm updateView={updateView} setError={setError} />
      case 'signUp':
        return <SignUpForm updateView={updateView} setError={setError} />
      default:
        return null
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <div className="flex flex-col gap-4">
        {getView()}
        {error ? (
          <div className="bg-error rounded-lg p-4">
            <p className="text-center font-semibold text-white">{error}</p>
          </div>
        ) : null}
      </div>
    </Modal>
  )
}
