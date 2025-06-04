import { motion } from 'framer-motion'
import { useState } from 'react'
import Cookies from 'js-cookie'

import Button from '@/components/Button'
import fetchShortenerApi from '@/api/fetchShortenerApi'
import TextInput from '@/components/form/TextInput'
import { AUTH_TOKEN } from '@/constants'
import type { SignUpFormData, SignUpFormProps } from './type'

export default function SignUpForm({ updateView, setError }: SignUpFormProps) {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    name: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const updateFormData = (updatedData: Partial<SignUpFormData>) => {
    setFormData({ ...formData, ...updatedData })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetchShortenerApi('/signup', {
        body: formData,
        method: 'POST',
      })
      console.log({ res })
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
        window.location.href = '/account/dashboard'
      }
    } catch {
      setError('An error occurred while signing up. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
          label="Password"
          labelClassName="sr-only"
          minLength={8}
          onChange={(e) => updateFormData({ password: e.target.value })}
          placeholder="Password"
          required
          type="password"
        />
        <Button
          className="font-medium"
          disabled={loading}
          type="submit"
          variant="primary"
        >
          Get Started
        </Button>
        <button
          className="text-secondary mx-auto w-fit hover:underline"
          onClick={() => updateView('signIn')}
          type="button"
        >
          {'Already have an account? Sign In >'}
        </button>
      </form>
    </motion.div>
  )
}
