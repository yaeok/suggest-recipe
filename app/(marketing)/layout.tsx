import { CurrentUserProvider } from '@/providers/CurrentUserProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <CurrentUserProvider>{children}</CurrentUserProvider>
}
