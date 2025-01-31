'use client'

import { useRouter } from 'next/navigation'

import { CheckEmailVerificationUseCase } from '@/usecase/CheckEmailVerificationUseCase/CheckEmailVerificationUseCase'
import { ResendEmailVerificationUseCase } from '@/usecase/ResendEmailVerificationUseCase/ResendEmailVerificationUseCase'

import Header from '../_components/Header'

const Page = () => {
  const router = useRouter()

  const handleCheckEmail = async () => {
    try {
      const usecase = new CheckEmailVerificationUseCase()
      const response = await usecase.execute()

      if (response.result) {
        router.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleResendEmail = async () => {
    try {
      const usecase = new ResendEmailVerificationUseCase()
      const response = await usecase.execute()

      if (response.result) {
        alert('確認メールを再送信しました')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='w-full min-h-screen'>
      <Header />
      <div className='max-w-screen-sm mx-auto py-16 px-8'>
        <div className='px-8 md:px-16 py-8 bg-gray-100 rounded-lg shadow-md'>
          <div className='flex flex-col items-center gap-8'>
            <div className='flex flex-col items-center gap-4'>
              <h3>登録したメールに確認メールを送信しました</h3>

              <button
                onClick={handleCheckEmail}
                className='px-8 py-2 text-white font-semibold bg-green-500 rounded-full shadow-md
                hover:shadow-none hover:bg-green-600 hover:translate-y-1 duration-300'
              >
                確認しました
              </button>
            </div>

            <div className='flex flex-col items-center gap-4'>
              <h3>確認メールを再度受け取りたい方はこちらから</h3>
              <button
                onClick={handleResendEmail}
                className='px-8 py-2 text-white font-semibold bg-pink-500 rounded-full shadow-md 
                hover:shadow-none hover:bg-pink-600 hover:translate-y-1 duration-300'
              >
                確認メールを再送信
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
