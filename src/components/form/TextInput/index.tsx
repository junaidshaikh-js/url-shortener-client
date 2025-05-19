import { JSX, useId } from 'react'

import { cn } from '@/libs/utils'

type TextInputProps = JSX.IntrinsicElements['input'] & {
  label?: string
  labelClassName?: string
}

export default function TextInput({
  className,
  label,
  labelClassName,
  ref,
  ...delegated
}: TextInputProps) {
  const id = useId()

  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <label
          className={cn('font-medium text-gray-500', labelClassName)}
          htmlFor={id}
        >
          {label}
        </label>
      ) : null}
      <input
        className={cn('rounded-lg border border-black p-3', className)}
        id={id}
        ref={ref}
        type="text"
        {...delegated}
      />
    </div>
  )
}
