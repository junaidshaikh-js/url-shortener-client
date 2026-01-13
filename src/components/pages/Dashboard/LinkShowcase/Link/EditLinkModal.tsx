'use client'

import { useEffect, useRef, useState, useTransition } from 'react'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import Spinner from '@/components/Spinner'
import TextInput from '@/components/form/TextInput'
import updateLink from '@/api/updateLink'
import { createSuccessToast, isValidUrl } from '@/libs/utils'
import { Link } from '@/types'
import { useToast } from '@/context/Toast'

interface EditLinkModalProps {
  isOpen: boolean
  link: Link
  onClose: VoidFunction
  onSuccess?: VoidFunction
}

export default function EditLinkModal({
  isOpen,
  link,
  onClose,
  onSuccess,
}: EditLinkModalProps) {
  const [url, setUrl] = useState(link.longUrl)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const { addToast } = useToast()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) {
      setError('Please enter a URL')
      inputRef.current?.focus()
      return
    }

    if (!isValidUrl(url)) {
      setError('Invalid URL')
      inputRef.current?.focus()
      return
    }

    startTransition(async () => {
      const res = await updateLink(link.shortCode, { url })

      if (res.error) {
        setError(res.error)
        inputRef.current?.focus()
        return
      }

      addToast(createSuccessToast('Link updated successfully'))
      onSuccess?.()
      onClose()
    })
  }

  return (
    <Modal
      className="flex w-full flex-col justify-center"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
        <h3 className="h3 text-center">Edit Link</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grow">
            <TextInput
              className="w-full placeholder:font-medium"
              onChange={(e) => {
                setUrl(e.target.value)
                setError('')
              }}
              placeholder="Enter your long URL..."
              ref={inputRef}
              value={url}
              disabled={isPending}
            />
            {error && (
              <p className="mt-2 text-sm font-medium text-red-500">{error}</p>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={onClose}
              type="button"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              className="w-[120px] py-3 font-medium uppercase"
              disabled={isPending}
              type="submit"
              variant="primary"
            >
              {isPending ? <Spinner className="h-5 w-5" /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
