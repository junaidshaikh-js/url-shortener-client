import Delete from './Delete'

interface ActionButtonsProps {
  linkId: string
}

export default function ActionButtons({ linkId }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <Delete linkId={linkId} />
    </div>
  )
}
