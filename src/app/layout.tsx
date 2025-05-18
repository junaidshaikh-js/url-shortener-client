import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Header from '@/components/Header'
import './globals.css'

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
})

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
    <html lang="en" data-theme="light" className={inter.variable}>
      <body>
        <div id="root">
          <Header />
          <main className="pt-20">{children}</main>
        </div>
      </body>
    </html>
  )
}
