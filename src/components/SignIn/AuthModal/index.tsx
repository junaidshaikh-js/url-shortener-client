import type { Dispatch, SetStateAction } from 'react'

import Modal from '@/components/Modal'

interface AuthModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function AuthModal({ isOpen, setIsOpen }: AuthModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <h2>Sign In Coming Soon</h2>
    </Modal>
  )
}
