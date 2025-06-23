'use client'

import { motion, HTMLMotionProps } from 'motion/react'

import { cn } from '@/libs/utils'

export type Variant = 'none' | 'primary' | 'secondary'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: Variant
}

export const baseClass =
  'px-4 py-2 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400 transition-colors duration-200 ease-in-out'

export const variantMap = {
  none: '',
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-white',
}

export default function Button({
  children,
  className,
  type = 'button',
  variant = 'none',
  ...delegated
}: ButtonProps) {
  return (
    <motion.button
      className={cn(baseClass, variantMap[variant], className)}
      type={type}
      {...delegated}
    >
      {children}
    </motion.button>
  )
}
