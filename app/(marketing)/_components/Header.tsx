'use client'

import Link from 'next/link'

import { useAuthContext } from '@/providers/CurrentUserProvider'
import { SignOutUseCase } from '@/usecase/SignOutUseCase/SignOutUseCase'

import PopoverButton from './PopOver'

export default function Header() {
  const currentUser = useAuthContext().currentUser

  return (
    <header className='w-full shadow-md'>
      <div className='max-w-screen-lg mx-auto px-4 py-2 flex justify-between items-center sticky top-0 z-10'>
        <h1 className='text-red-400 text-xl font-semibold'>
          <Link href='/'>レシピジェネレータ</Link>
        </h1>
        <nav>
          <PopoverButton currentUser={currentUser} />
        </nav>
      </div>
    </header>
  )
}
