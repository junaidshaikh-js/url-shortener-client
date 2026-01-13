'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Link } from '@/types'
import Button from '@/components/Button'
import EditIcon from '@/components/icons/Edit'
import EditLinkModal from '../EditLinkModal'

interface EditProps {
  link: Link
}

export default function Edit({ link }: EditProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const router = useRouter()

  const handleEditSuccess = () => {
    router.refresh()
  }

  return (
    <>
      <Button
        onClick={() => setIsEditOpen(true)}
        title="Edit link"
        className="p-1"
      >
        <EditIcon size={20} />
      </Button>
      <EditLinkModal
        key={isEditOpen ? 'open' : 'closed'}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        link={link}
        onSuccess={handleEditSuccess}
      />
    </>
  )
}
