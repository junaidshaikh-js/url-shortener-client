'use client'

import Button from '@/components/Button'
import CreateNew from '../CreateNew'

export default function CreateNewLink() {
  return (
    <CreateNew
      customButton={({ onClick }) => {
        return (
          <Button onClick={onClick} className="px-0 underline">
            Create a new link
          </Button>
        )
      }}
    />
  )
}
