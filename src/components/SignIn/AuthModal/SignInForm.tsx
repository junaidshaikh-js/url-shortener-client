import { motion } from 'framer-motion'

import Button from '@/components/Button'
import TextInput from '@/components/form/TextInput'
import type { SignInFormProps } from './type'

export default function SignInForm({ updateView }: SignInFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <motion.div>
      <h3 className="mb-8 text-center">Sign In</h3>
      <form
        className="flex w-[540px] max-w-full flex-col gap-6"
        onSubmit={handleSubmit}
      >
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
