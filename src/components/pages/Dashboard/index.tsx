import Container from '@/components/Container'

import CreateNew from './CreateNew'

export default function Dashboard() {
  return (
    <Container>
      <div className="mt-6 grid min-h-full grid-cols-1 gap-4 md:mt-12 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_400px]">
        <div>
          <h1 className="h2">Your Links</h1>
        </div>
        <div className="fixed bottom-0 flex w-full justify-center bg-white py-4 md:static md:mt-2 md:py-0">
          <CreateNew />
        </div>
      </div>
    </Container>
  )
}
