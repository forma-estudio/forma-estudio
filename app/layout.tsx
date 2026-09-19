import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'FORMA ESTUDIO | Agencia de Diseño Web',
  description: 'Diseño web y experiencia digital para tu marca',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-forma-white text-forma-black">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
