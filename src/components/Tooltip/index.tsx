import { motion } from 'motion/react'
import { useState } from 'react'

import { cn } from '@/libs/utils'

interface TooltipProps {
  children: React.ReactNode
  className?: string
  content: string
  onMouseLeave?: () => void
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const positionClass = {
  bottom: 'top-[calc(100%+10px)] left-1/2 -translate-x-1/2',
  left: 'right-[calc(100%+10px)]  top-1/2 -translate-y-1/2',
  right: 'left-[calc(100%+10px)] top-1/2 -translate-y-1/2',
  top: 'bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2',
}

const arrowClass = {
  bottom: '-top-1.5 left-1/2 -translate-x-1/2',
  left: '-right-1.5 top-1/2 -translate-y-1/2',
  right: '-left-1.5 top-1/2 -translate-y-1/2',
  top: '-bottom-1.5 left-1/2 -translate-x-1/2',
}

const animateTooltipConfig = {
  bottom: { initial: { y: -20 }, animate: { y: 0 } },
  left: { initial: { x: 20 }, animate: { x: 0 } },
  right: { initial: { x: -20 }, animate: { x: 0 } },
  top: { initial: { y: 20 }, animate: { y: 0 } },
}

export default function Tooltip({
  children,
  content,
  onMouseLeave,
  position = 'top',
}: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const currentAnimateConfig = animateTooltipConfig[position]

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => {
        setShowTooltip(false)
        onMouseLeave?.()
      }}
    >
      {showTooltip ? (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.6,
            ...currentAnimateConfig.initial,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              damping: 10,
              stiffness: 300,
              type: 'spring',
            },
            ...currentAnimateConfig.animate,
          }}
          className={cn(
            'absolute rounded-lg bg-black p-3 text-white',
            positionClass[position]
          )}
        >
          {content}
          <span
            className={cn(
              'absolute h-3 w-3 rotate-45 bg-black',
              arrowClass[position]
            )}
          />
        </motion.div>
      ) : null}
      {children}
    </div>
  )
}
