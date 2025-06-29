import type { FooterProps } from '@/components/Footer'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

interface LayoutProps {
  children: React.ReactNode
  footerProps?: FooterProps
}

export default function Layout({ children, footerProps }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="pt-24">{children}</main>
      <Footer {...footerProps} />
    </>
  )
}
