import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: '',
  title: 'Dashboard',
}

export default function Dashboard() {
  return (
    <div>
      <h1 className="mt-10 text-center text-3xl font-bold">Dashboard</h1>
    </div>
  )
}
