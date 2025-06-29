import Link from '@/components/Link'
import { cn } from '@/libs/utils'

export interface FooterProps {
  className?: string
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        'bg-text-primary text-background flex flex-col items-center gap-4 p-4',
        className
      )}
    >
      <p>Made with ❤️ by Junaid</p>
      <div className="flex gap-4">
        <Link
          className="hover:underline"
          href="https://github.com/junaidshaikh-js"
          target="_blank"
        >
          GitHub
        </Link>
        <Link
          className="hover:underline"
          href="https://www.linkedin.com/in/junaidshaikhjs/"
          target="_blank"
        >
          LinkedIn
        </Link>
      </div>
    </footer>
  )
}
