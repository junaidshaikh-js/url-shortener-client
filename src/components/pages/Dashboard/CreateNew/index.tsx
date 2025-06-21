'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import ShortUrl from '@/components/ShortURL'

interface CreateNewProps {
  customButton?: (props: { onClick: () => void }) => React.ReactNode
}

export default function CreateNew({ customButton }: CreateNewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isNewShortenLinkCreated, setIsNewShortenLinkCreated] = useState(false)
  const router = useRouter()

  const handleClose = () => {
    setIsOpen(false)
    if (isNewShortenLinkCreated) {
      router.refresh()
      window.scrollTo({ top: 0 })
    }
    setIsNewShortenLinkCreated(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  return (
    <>
      {customButton ? (
        customButton({ onClick: handleOpen })
      ) : (
        <Button
          className="w-full max-w-[340px] px-0 font-bold uppercase md:self-start md:py-4"
          onClick={handleOpen}
          variant="primary"
        >
          Create New{' '}
        </Button>
      )}
      <Modal
        className="flex min-h-[400px] w-full flex-col justify-center"
        isOpen={isOpen}
        onClose={handleClose}
      >
        <div className="flex flex-col gap-4">
          <p className="h3 text-center">Create a new short link</p>
          <ShortUrl onSuccess={() => setIsNewShortenLinkCreated(true)} />
        </div>
      </Modal>
    </>
  )
}
