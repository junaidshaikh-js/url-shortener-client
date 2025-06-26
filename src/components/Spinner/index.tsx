import { cn } from '@/libs/utils'

function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'loader inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-b-transparent',
        className
      )}
      aria-label="loading"
    />
  )
}

export default Spinner
