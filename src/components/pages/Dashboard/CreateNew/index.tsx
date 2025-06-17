'use client'

import { useState } from 'react'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import ShortUrl from '@/components/ShortURL'

export default function CreateNew() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        className="w-full max-w-[340px] px-0 font-bold uppercase md:py-4"
        onClick={() => setIsOpen(true)}
        variant="primary"
      >
        Create New{' '}
      </Button>
      <Modal
        className="flex min-h-[400px] w-full flex-col justify-center"
        isOpen={isOpen}
        onClose={handleClose}
      >
        <div className="flex flex-col gap-4">
          <p className="h3 text-center">Create a new short link</p>
          <ShortUrl />
        </div>
      </Modal>
    </>
  )
}
