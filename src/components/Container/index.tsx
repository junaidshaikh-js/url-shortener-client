import { JSX } from 'react'

import { cn } from '@/libs/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  renderAs?: keyof JSX.IntrinsicElements
}

export default function Container({
  children,
  className,
  renderAs,
}: ContainerProps) {
  const Tag = renderAs ?? 'div'

  return (
    <Tag className={cn('mx-auto max-w-[80rem] px-4 xl:px-0', className)}>
      {children}
    </Tag>
  )
}
