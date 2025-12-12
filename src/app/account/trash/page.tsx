import Image from 'next/image'

import Container from '@/components/Container'
import getTrashLinks from '@/api/trashLinks'
import Layout from '@/components/Layout'
import Link from '@/components/Link'
import TrashedLink from '@/components/pages/Trash/TrashedLink'

export default async function TrashPage() {
  const { links, error } = await getTrashLinks()
  const hasLinks = Boolean(links && links.length > 0)

  const backToDashboard = (
    <Link
      className="text-primary hover:text-primary/70 inline-flex w-fit items-center gap-2 underline underline-offset-4"
      href="/account/dashboard"
    >
      ← Back to Dashboard
    </Link>
  )

  if (error) {
    return (
      <Layout>
        <Container className="min-h-[80vh] py-10">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="h2">Trash</h1>
              {backToDashboard}
            </div>
            <p className="text-error">Failed to load trashed links.</p>
          </div>
        </Container>
      </Layout>
    )
  }

  if (!hasLinks) {
    return (
      <Layout>
        <Container className="min-h-[80vh]">
          <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 text-center">
            <Image
              alt="Empty trash"
              height={200}
              priority
              src="/assets/empty-trash.png"
              width={200}
            />
            <p className="text-lg text-gray-500">Trash is empty</p>
            {backToDashboard}
          </div>
        </Container>
      </Layout>
    )
  }

  return (
    <Layout>
      <Container className="min-h-[80vh]">
        <div className="flex flex-col items-center py-10">
          <div className="flex w-full max-w-3xl flex-col gap-10">
            <div>
              <h1 className="h2">Trash</h1>
              {backToDashboard}
            </div>
            <div className="flex w-full flex-col gap-4">
              {links?.map((link) => <TrashedLink key={link.id} link={link} />)}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
