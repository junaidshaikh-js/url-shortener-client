import classNames from 'classnames'
import Cookies from 'js-cookie'
import { twMerge } from 'tailwind-merge'

import type { TaskArg } from '@/context/Toast'
import { AUTH_TOKEN } from '@/constants'

export function cn(...inputs: classNames.ArgumentArray) {
  return twMerge(classNames(...inputs))
}

export function getToken() {
  const token = Cookies.get(AUTH_TOKEN)
  console.log({ token })
  if (!token) return null
  return `Bearer ${token}`
}

export function createSuccessToast(message: string): TaskArg {
  return {
    type: 'success',
    message,
  }
}

export function createErrorToast(message: string): TaskArg {
  return {
    type: 'error',
    message,
  }
}
