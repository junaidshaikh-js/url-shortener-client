import type { Dispatch, SetStateAction } from 'react'

export type AuthModalView = 'signIn' | 'signUp'

export interface AuthModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export interface SignInFormProps {
  setError: Dispatch<SetStateAction<string>>
  updateView: (view: AuthModalView) => void
}

export interface SignUpFormProps {
  setError: Dispatch<SetStateAction<string>>
  updateView: (view: AuthModalView) => void
}

export type SignUpFormData = {
  email: string
  name: string
  password: string
}

export type SignInFormData = Pick<SignUpFormData, 'email' | 'password'>
