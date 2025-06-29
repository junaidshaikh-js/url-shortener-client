import Container from '@/components/Container'
import Layout from '@/components/Layout'

import CreateNew from './CreateNew'
import LinkShowcase from './LinkShowcase'

export default function Dashboard() {
  return (
    <Layout footerProps={{ className: 'mb-20 md:mb-0' }}>
      <Container className="min-h-[calc(100dvh-200px)]">
        <div className="my-6 mb-20 grid min-h-full grid-cols-1 gap-4 md:mt-12 md:mb-6 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_400px]">
          <div className="flex flex-col gap-5">
            <h1 className="h2">Your Links</h1>
            <LinkShowcase />
          </div>
          <div className="fixed right-0 bottom-0 left-0 flex w-full justify-center bg-white py-4 md:static md:mt-2 md:py-0">
            <div className="top-[100px] flex h-fit w-full justify-center md:sticky">
              <CreateNew />
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
