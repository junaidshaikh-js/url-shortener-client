'use client'

import { ReactNode } from 'react'

import Button from '@/components/Button'
import Modal from '@/components/Modal'

interface ConfirmationModalProps {
  asyncOperation?: boolean
  cancelLabel?: string
  confirmLabel?: string
  description: ReactNode
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: ReactNode
}

export default function ConfirmationModal({
  asyncOperation,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  description,
  isOpen,
  onClose,
  onConfirm,
  title,
}: ConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold">{title}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-end">
          <Button
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
            disabled={asyncOperation}
            onClick={onClose}
          >
            {cancelLabel}
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-600"
            disabled={asyncOperation}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
