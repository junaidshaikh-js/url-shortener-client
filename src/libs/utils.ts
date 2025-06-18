import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'
import Cookies from 'js-cookie'

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
