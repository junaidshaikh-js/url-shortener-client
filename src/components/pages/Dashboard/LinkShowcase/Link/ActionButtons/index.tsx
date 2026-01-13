import type { Link } from '@/types'
import Delete from './Delete'
import Edit from './Edit'

interface ActionButtonsProps {
  link: Link
}

export default function ActionButtons({ link }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <Edit link={link} />
      <Delete linkId={link.id} />
    </div>
  )
}
