'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Button from '@/components/Button'
import ConfirmationModal from '@/components/ConfirmationModal'
import deleteTrashLinks from '@/api/deleteTrashLinks'
import { createErrorToast, createSuccessToast } from '@/libs/utils'
import { useToast } from '@/context/Toast'

export default function EmptyTrash() {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const router = useRouter()
  const { addToast } = useToast()

  async function handleDelete() {
    setIsDeleting(true)
    try {
      const res = await deleteTrashLinks()
      if (res.error) {
        addToast(createErrorToast('Failed to empty trash'))
      }
      if (res.success) {
        addToast(createSuccessToast('Trash is empty'))
        router.push('/account/dashboard')
      }
    } catch {
      setIsDeleting(false)
      addToast(createErrorToast('Failed to empty trash'))
    } finally {
      setShowConfirmModal(false)
    }
  }

  return (
    <>
      <Button
        className="text-secondary w-fit p-0"
        onClick={() => setShowConfirmModal(true)}
      >
        Empty trash
      </Button>
      <ConfirmationModal
        asyncOperation={isDeleting}
        confirmLabel="Delete forever"
        description="All items in trash will be deleted forever. This can't be undone."
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        title="Delete forever?"
      />
    </>
  )
}
