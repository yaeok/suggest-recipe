'use client'

import Link from 'next/link'

import { useAuthContext } from '@/providers/CurrentUserProvider'
import { SignOutUseCase } from '@/usecase/SignOutUseCase/SignOutUseCase'

type HeaderProps = {
  isAuthPage?: boolean
}

export default function Header({ isAuthPage = false }: HeaderProps) {
  const currentUser = useAuthContext().currentUser
  const handleLogout = async () => {
    const usecase = new SignOutUseCase()
    const response = await usecase.execute()
    if (response.result) {
      alert('ログアウトしました')
    }
  }
  return (
    <header className='w-full shadow-md'>
      <div className='max-w-screen-lg mx-auto px-4 py-4 flex justify-between items-center sticky top-0 z-10'>
        <h1 className='text-red-400 text-xl font-semibold'>
          <Link href='/'>レシピジェネレータ</Link>
        </h1>
        <nav>
          {!isAuthPage && (
            <ul className='flex flex-row items-center gap-4'>
              <li>
                {currentUser != null ? (
                  <button
                    onClick={handleLogout}
                    className='px-4 py-2 text-sm bg-red-500 rounded-full shadow-md text-white font-semibold
                  hover:shadow-none hover:bg-red-600 hover:translate-y-1 duration-300'
                  >
                    ログアウト
                  </button>
                ) : (
                  <Link
                    href='/sign_in'
                    className='px-4 py-2 text-sm bg-green-500 rounded-full shadow-md text-white font-semibold
                  hover:shadow-none hover:bg-green-600 hover:translate-y-1 duration-300'
                  >
                    ログイン
                  </Link>
                )}
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  )
}
