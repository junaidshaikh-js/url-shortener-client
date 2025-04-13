import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'URL Shortener',
  description: 'Short your URLs in a single click',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
