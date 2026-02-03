import { useState } from 'react'

import Button from '@/components/Button'
import TextInput from '@/components/form/TextInput'
import Eye from '@/components/icons/Eye'
import EyeOff from '@/components/icons/EyeOff'

type PasswordInputProps = Omit<
  React.ComponentProps<typeof TextInput>,
  'type' | 'icon'
>

export default function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <TextInput
      {...props}
      type={showPassword ? 'text' : 'password'}
      icon={
        <Button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="flex items-center justify-center p-0 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </Button>
      }
    />
  )
}
