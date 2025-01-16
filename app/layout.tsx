import type { Metadata } from 'next'
import './globals.css'

import { Shippori_Mincho } from 'next/font/google'

const shippori_mincho = Shippori_Mincho({
  subsets: ['latin'],
  weight: '400',
  variable: '--mincho',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DokuAGT',
  description:
    '駆け出しエンジニアからレベルアップ！何を作ったらいいかわからないを解決します！',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={`${shippori_mincho.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
