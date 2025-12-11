'use client'

import { useRouter } from 'next/navigation'

import Button from '@/components/Button'
import DeleteIcon from '@/components/icons/Delete'
import deleteLink from '@/api/deleteLink'
import { createErrorToast, createSuccessToast } from '@/libs/utils'
import { useToast } from '@/context/Toast'

interface DeleteProps {
  linkId: string
}

export default function Delete({ linkId }: DeleteProps) {
  const { addToast } = useToast()
  const router = useRouter()

  async function handleDelete() {
    try {
      const res = await deleteLink(linkId)
      if (res.error) {
        addToast(createErrorToast('Failed to delete link'))
      }
      if (res.success) {
        addToast(createSuccessToast('Moved to trash'))
      }
    } catch {
      addToast(createErrorToast('Failed to delete link'))
    } finally {
      router.refresh()
    }
  }

  return (
    <Button onClick={handleDelete} title="Move to trash">
      <DeleteIcon size={20} />
    </Button>
  )
}
