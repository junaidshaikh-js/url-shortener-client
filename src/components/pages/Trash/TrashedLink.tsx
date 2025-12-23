'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Button from '@/components/Button'
import deleteLinkPermanently from '@/api/deleteLinkPermanently'
import restoreLink from '@/api/restoreLink'
import ConfirmationModal from '@/components/ConfirmationModal'
import { useToast } from '@/context/Toast'
import { createErrorToast, createSuccessToast } from '@/libs/utils'
import type { Link } from '@/types'

interface TrashedLinkProps {
  link: Link
}

export default function TrashedLink({ link }: TrashedLinkProps) {
  const shortUrl = `${process.env.NEXT_PUBLIC_HOSTNAME}/${link.shortCode}`

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const router = useRouter()
  const { addToast } = useToast()

  async function handleRestore() {
    try {
      const res = await restoreLink(link.id)
      if (res.error) {
        addToast(createErrorToast('Failed to restore link'))
      }
      if (res.success) {
        addToast(createSuccessToast('Link restored'))
      }
    } catch {
      addToast(createErrorToast('Failed to restore link'))
    } finally {
      router.refresh()
    }
  }

  async function handleDelete() {
    setIsDeleting(true)
    try {
      const res = await deleteLinkPermanently(link.id)
      if (res.error) {
        addToast(createErrorToast('Failed to delete link'))
      }
      if (res.success) {
        addToast(createSuccessToast('Link deleted'))
        setIsDeleting(false)
      }
    } catch {
      addToast(createErrorToast('Failed to delete link'))
    } finally {
      setIsConfirmOpen(false)
      router.refresh()
    }
  }

  return (
    <div className="flex flex-col gap-6 rounded-lg bg-gray-50 p-4 md:flex-row md:items-start md:justify-between md:gap-4">
      <div className="flex flex-col gap-2">
        <p className="">{shortUrl}</p>
        <p className="text-sm !wrap-anywhere text-gray-500">{link.longUrl}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={handleRestore} className="text-primary p-0">
          Restore
        </Button>
        <Button
          variant="none"
          onClick={() => setIsConfirmOpen(true)}
          className="text-red-600"
        >
          Delete
        </Button>
      </div>
      <ConfirmationModal
        asyncOperation={isDeleting}
        confirmLabel="Delete forever"
        description="Link will be deleted permanently. This can't be undone."
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete forever?"
      />
    </div>
  )
}
