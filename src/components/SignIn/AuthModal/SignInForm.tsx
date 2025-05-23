import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Button from '@/components/Button'
import fetchShortenerApi from '@/api/fetchShortenerApi'
import TextInput from '@/components/form/TextInput'
import type { SignInFormData, SignInFormProps } from './type'

export default function SignInForm({ updateView, setError }: SignInFormProps) {
  const [formData, setFormDate] = useState<SignInFormData>({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const updateFormData = (updatedData: Partial<SignInFormData>) => {
    setFormDate({ ...formData, ...updatedData })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetchShortenerApi('/signin', 'POST', formData)
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
        router.push('/account/dashboard')
      }
    } catch {
      setError('An error occurred while signing in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
          disabled={loading}
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
          Sign In
        </Button>
        <button
          className="text-secondary mx-auto w-fit hover:underline"
          onClick={() => updateView('signUp')}
          type="button"
        >
          {'Create a new account >'}
        </button>
      </form>
    </motion.div>
  )
}
