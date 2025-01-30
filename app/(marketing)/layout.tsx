import Header from '@/components/Header'
import { CurrentUserProvider } from '@/providers/CurrentUserProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <CurrentUserProvider>
      <Header />
      {children}
    </CurrentUserProvider>
  )
}
