import { motion } from 'framer-motion'

import Button from '@/components/Button'
import TextInput from '@/components/form/TextInput'
import type { SignUpFormProps } from './type'

export default function SignUpForm({ updateView }: SignUpFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <motion.div>
      <h3 className="mb-8 text-center">Create a new account</h3>
      <form
        className="flex w-[540px] max-w-full flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <TextInput
          className="w-full rounded border border-gray-300 p-2"
          label="Name"
          labelClassName="sr-only"
          placeholder="Name"
          required
          type="text"
        />
        <TextInput
          className="w-full rounded border border-gray-300 p-2"
          label="Email"
          labelClassName="sr-only"
          placeholder="Email"
          required
          type="email"
        />
        <TextInput
          className="w-full rounded border border-gray-300 p-2"
          label="Password"
          labelClassName="sr-only"
          minLength={8}
          placeholder="Password"
          required
          type="password"
        />

        <Button type="submit" variant="primary" className="font-medium">
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
