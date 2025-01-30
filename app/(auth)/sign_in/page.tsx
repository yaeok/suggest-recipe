'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import ErrorMessageModal from '@/components/Modal/ErrorMessageModal'
import { SystemErrorException } from '@/infrastracture/exception/SystemErrorException'
import { FirebaseAuthException } from '@/infrastracture/service/firebase/exception/FirebaseAuthException'
import { SignInUseCase } from '@/usecase/SignInUseCase/SignInUseCase'

type SignInFormType = {
  email: string
  password: string
}

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const router = useRouter()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const openErrorModal = () => setIsOpen(true)
  const closeErrorModal = () => setIsOpen(false)

  const onSubmit = handleSubmit(async (data: SignInFormType) => {
    try {
      const { email, password } = data

      const usecase = new SignInUseCase()

      const response = await usecase.execute({ email, password })

      if (response.result) {
        router.push('/')
      }
    } catch (error) {
      if (error instanceof FirebaseAuthException) {
        setErrorMessage(error.message)
        openErrorModal()
      } else if (error instanceof SystemErrorException) {
        setErrorMessage(error.message)
        openErrorModal()
      }
    }
  })
  return (
    <div className='max-w-screen-sm mx-auto py-16 px-8'>
      <form action='' onSubmit={onSubmit} className='space-y-8'>
        <section className='flex flex-col gap-4'>
          <div className='w-full flex flex-col gap-2'>
            <label htmlFor='email'>メールアドレス</label>
            <input
              type='email'
              {...register('email', {
                required: 'メールアドレスを入力してください',
                maxLength: {
                  value: 255,
                  message: '255文字以内で入力してください',
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'メールアドレスの形式が正しくありません',
                },
              })}
              className='w-full border-2 border-gray-300 rounded-md p-2'
            />
            {errors.email && (
              <span className='pl-2 text-sm text-red-500'>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className='w-full flex flex-col gap-2'>
            <label htmlFor='password'>パスワード</label>
            <input
              type='password'
              {...register('password', {
                required: 'パスワードを入力してください',
                minLength: {
                  value: 8,
                  message: '8文字以上で入力してください',
                },
                maxLength: {
                  value: 255,
                  message: '255文字以内で入力してください',
                },
                pattern: {
                  value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
                  message:
                    '半角英数字をそれぞれ1文字以上含む値を入力してください',
                },
              })}
              className='w-full border-2 border-gray-300 rounded-md p-2'
            />
            {errors.password && (
              <span className='pl-2 text-sm text-red-500'>
                {errors.password.message}
              </span>
            )}
          </div>
        </section>
        <section className='flex justify-center'>
          <button
            className='px-4 py-2 text-white font-semibold bg-green-500 rounded-full shadow-md
            hover:shadow-none hover:bg-green-600 hover:translate-y-1 duration-300'
          >
            ログイン
          </button>
        </section>
        <section className='flex justify-center'>
          <Link
            href='/sign_up'
            className='font-semibold border-b-2 border-black 
            hover:border-blue-500 hover:text-blue-500 duration-200'
          >
            アカウントをお持ちでない方はこちら
          </Link>
        </section>
      </form>
      <ErrorMessageModal
        isOpen={isOpen}
        onClose={closeErrorModal}
        message={errorMessage}
      />
    </div>
  )
}

export default Page
