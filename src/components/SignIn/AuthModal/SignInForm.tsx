import { motion } from 'framer-motion'
import { useState } from 'react'
import Cookies from 'js-cookie'

import Button from '@/components/Button'
import fetchShortenerApi from '@/api/fetchShortenerApi'
import Spinner from '@/components/Spinner'
import TextInput from '@/components/form/TextInput'
import useRouterWithTransition from '@/hooks/useRouterWithTransition'
import { AUTH_TOKEN } from '@/constants'
import type { SignInFormData, SignInFormProps } from './type'

export default function SignInForm({ updateView, setError }: SignInFormProps) {
  const [formData, setFormDate] = useState<SignInFormData>({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const { isPending, routeTo, refresh } = useRouterWithTransition()

  const updateFormData = (updatedData: Partial<SignInFormData>) => {
    setFormDate({ ...formData, ...updatedData })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetchShortenerApi('/auth/sign-in', {
        body: formData,
        method: 'POST',
      })
      // account does not exist
      if (res.status === 404) {
        updateView('signUp')
        return
      }
      if (res.error) {
        setError(res.error)
        return
      }
      if (res.ok) {
        const { token } = res.data
        Cookies.set(AUTH_TOKEN, token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })
        routeTo('/account/dashboard')
        refresh()
      }
    } catch {
      setError('An error occurred while signing in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isLoading = loading || isPending

  return (
    <motion.div>
      <h3 className="mb-8 text-center">Sign In</h3>
      <form
        className="flex w-[540px] max-w-full flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <TextInput
          autoComplete="email"
          className="w-full rounded border border-gray-300 p-2"
          disabled={isLoading}
          label="Email"
          labelClassName="sr-only"
          onChange={(e) => updateFormData({ email: e.target.value })}
          placeholder="Email"
          required
          type="email"
        />
        <TextInput
          autoComplete="current-password"
          className="w-full rounded border border-gray-300 p-2"
          disabled={isLoading}
          label="Password"
          labelClassName="sr-only"
          minLength={8}
          onChange={(e) => updateFormData({ password: e.target.value })}
          placeholder="Password"
          required
          type="password"
        />
        <Button
          className="flex items-center justify-center gap-2 font-medium"
          disabled={isLoading}
          type="submit"
          variant="primary"
        >
          {isLoading && <Spinner />}
          Sign In
        </Button>
        <Button
          className="text-secondary mx-auto w-fit p-0 hover:underline"
          disabled={isLoading}
          onClick={() => updateView('signUp')}
          type="button"
        >
          {'Create a new account >'}
        </Button>
      </form>
    </motion.div>
  )
}
