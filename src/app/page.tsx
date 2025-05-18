import * as motion from 'motion/react-client'

import Container from '@/components/Container'
import ShortUrl from '@/components/ShortURL'

export default function Home() {
  return (
    <Container
      renderAs="section"
      className="flex min-h-[calc(100dvh-160px)] items-center"
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
        }}
        className="flex grow flex-col gap-5"
        initial={{ opacity: 0, y: 50 }}
      >
        <h1 className="h3 text-center">Shorten your URLs with ease</h1>
        <ShortUrl />
      </motion.div>
    </Container>
  )
}
