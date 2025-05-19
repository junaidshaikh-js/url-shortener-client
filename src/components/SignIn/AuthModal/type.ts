import type { Dispatch, SetStateAction } from 'react'

export type AuthModalView = 'signIn' | 'signUp'

export interface AuthModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export interface SignInFormProps {
  updateView: (view: AuthModalView) => void
}

export interface SignUpFormProps {
  updateView: (view: AuthModalView) => void
}
