'use client'

import NextLink, { type LinkProps as NextLinkProps } from 'next/link'

import { type Variant, baseClass, variantMap } from '../Button'
import { cn } from '@/libs/utils'

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type OmitNextLinkProps = Omit<AnchorProps, keyof NextLinkProps>

export interface LinkProps extends NextLinkProps, OmitNextLinkProps {
  variant?: Variant
}

export default function Link({
  children,
  className,
  href,
  variant = 'none',
  ...delegated
}: LinkProps) {
  return (
    <NextLink
      href={href}
      className={cn(
        {
          [`${baseClass} ${variantMap[variant]}`]: variant !== 'none',
        },
        className
      )}
      {...delegated}
    >
      {children}
    </NextLink>
  )
}
