import { useCallback, useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function useRouterWithTransition() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const routeTo = useCallback(
    (url: string) => {
      startTransition(() => {
        router.push(url)
      })
    },
    [router]
  )

  return { isPending, routeTo, refresh: router.refresh } as const
}
