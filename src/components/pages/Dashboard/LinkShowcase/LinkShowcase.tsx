import getLinks from '@/api/links'
import CreateNewLink from './CreateNewLink'
import Link from './Link'

export default async function LinkShowcase() {
  const { links, error } = await getLinks()

  if (error) {
    return (
      <section>
        <h2 className="h3 text-error">Something went wrong!</h2>
      </section>
    )
  }

  if (!links?.length) {
    return (
      <section>
        <p>
          Such a empty! <CreateNewLink />
        </p>
      </section>
    )
  }

  return (
    <section>
      <div className="flex flex-col gap-5">
        {links.map((link) => {
          return <Link key={link.id} link={link} />
        })}
      </div>
    </section>
  )
}
