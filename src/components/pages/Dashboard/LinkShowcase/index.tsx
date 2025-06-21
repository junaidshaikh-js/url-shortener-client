import { Suspense } from 'react'

import LinkShowcase from './LinkShowcase'

export default function LinkShowcaseWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LinkShowcase />
    </Suspense>
  )
}
