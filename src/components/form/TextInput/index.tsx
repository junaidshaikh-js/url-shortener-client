import { JSX, ReactNode, useId } from 'react'
import { cn } from '@/libs/utils'

type TextInputProps = JSX.IntrinsicElements['input'] & {
  icon?: ReactNode
  label?: string
  labelClassName?: string
}

export default function TextInput({
  className,
  icon,
  label,
  labelClassName,
  ref,
  type = 'text',
  ...delegated
}: TextInputProps) {
  const id = useId()

  return (
    <div className="relative">
      <input
        className={cn(
          'peer block w-full rounded-lg border border-gray-200 bg-transparent p-3 text-sm focus:ring-0 focus:outline-none',
          {
            'pr-10': icon,
          },
          className
        )}
        id={id}
        ref={ref}
        type={type}
        placeholder=" "
        {...delegated}
      />
      {label ? (
        <label
          className={cn(
            'text-primary absolute top-0 left-3 z-10 origin-[0] -translate-y-1/2 scale-75 bg-white px-1 text-sm duration-300 ease-out',
            'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent',
            'peer-placeholder-shown:text-gray-500',
            'peer-focus:text-primary peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:scale-75 peer-focus:bg-white',
            labelClassName
          )}
          htmlFor={id}
        >
          {label}
        </label>
      ) : null}
      {icon && (
        <div className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
          {icon}
        </div>
      )}
    </div>
  )
}
