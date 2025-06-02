interface IconProps {
  size?: number
}

export default function ChevronDown({ size = 24 }: IconProps) {
  return (
    <svg
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  )
}
