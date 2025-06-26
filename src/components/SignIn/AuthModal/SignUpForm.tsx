import { motion } from 'framer-motion'
import { useState } from 'react'
import Cookies from 'js-cookie'

import Button from '@/components/Button'
import fetchShortenerApi from '@/api/fetchShortenerApi'
import Spinner from '@/components/Spinner'
import TextInput from '@/components/form/TextInput'
import useRouterWithTransition from '@/hooks/useRouterWithTransition'
import { AUTH_TOKEN } from '@/constants'
import type { SignUpFormData, SignUpFormProps } from './type'

export default function SignUpForm({ updateView, setError }: SignUpFormProps) {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    name: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const { isPending, routeTo, refresh } = useRouterWithTransition()

  const updateFormData = (updatedData: Partial<SignUpFormData>) => {
    setFormData({ ...formData, ...updatedData })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetchShortenerApi('/auth/sign-up', {
        body: formData,
        method: 'POST',
      })
      // account already exists
      if (res.status === 403) {
        updateView('signIn')
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
      setError('An error occurred while signing up. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isLoading = loading || isPending

  return (
    <motion.div>
      <h3 className="mb-8 text-center">Create a new account</h3>
      <form
        className="flex w-[540px] max-w-full flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <TextInput
          autoComplete="name"
          className="w-full rounded border border-gray-300 p-2"
          disabled={isLoading}
          label="Name"
          labelClassName="sr-only"
          onChange={(e) => updateFormData({ name: e.target.value })}
          placeholder="Name"
          required
          type="text"
        />
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
          autoComplete="new-password"
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
          Get Started
        </Button>
        <Button
          className="text-secondary mx-auto w-fit p-0 hover:underline"
          disabled={isLoading}
          onClick={() => updateView('signIn')}
          type="button"
        >
          {'Already have an account? Sign In >'}
        </Button>
      </form>
    </motion.div>
  )
}
