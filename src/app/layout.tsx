import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import AuthProvider from '@/context/Auth'
import ToastContainer from '@/components/ToastContainer'
import ToastProvider from '@/context/Toast'
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
      <ToastProvider>
        <AuthProvider>
          <body>
            <div id="root">{children}</div>
            <ToastContainer />
          </body>
        </AuthProvider>
      </ToastProvider>
    </html>
  )
}
