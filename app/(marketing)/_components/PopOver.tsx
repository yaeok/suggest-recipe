'use client'

import Avatar from 'boring-avatars'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { User } from '@/domain/User'
import { SignOutUseCase } from '@/usecase/SignOutUseCase/SignOutUseCase'

type PopoverButtonProps = {
  currentUser: User | null
}

export default function PopoverButton({
  currentUser,
}: PopoverButtonProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const popoverRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    const usecase = new SignOutUseCase()
    const response = await usecase.execute()
    if (response.result) {
      alert('ログアウトしました')
    }
  }

  return (
    <div className='relative inline-block' ref={popoverRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='rounded-full shadow-lg hover:shadow-none hover:translate-y-1 duration-300'
      >
        <Avatar
          size='50px'
          name={
            currentUser != null ? currentUser.email : Math.random().toString()
          }
          variant='bauhaus'
        />
      </button>
      {isOpen && (
        <div className='absolute -left-8 top-14 transform -translate-x-1/2 p-6 w-max bg-white border rounded-lg shadow-lg text-sm text-blue-gray-500'>
          <ul className='space-y-6'>
            <li>
              {/* <Link href='/recipes'>
                <span>レシピ一覧</span>
              </Link> */}
            </li>
            <li>
              {currentUser != null ? (
                <button
                  onClick={handleLogout}
                  className='px-6 py-2 text-sm bg-red-500 rounded-full shadow-md text-white font-semibold'
                >
                  ログアウト
                </button>
              ) : (
                <Link
                  href='/sign_in'
                  className='px-6 py-2 text-sm bg-green-500 rounded-full shadow-md text-white font-semibold'
                >
                  ログイン
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
