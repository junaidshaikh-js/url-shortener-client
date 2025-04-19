import { JSX } from 'react'

import { cn } from '@/libs/utils'

export default function TextInput({
  className,
  ref,
  ...delegated
}: JSX.IntrinsicElements['input']) {
  return (
    <input
      className={cn('rounded-lg border border-black p-3', className)}
      ref={ref}
      type="text"
      {...delegated}
    />
  )
}
