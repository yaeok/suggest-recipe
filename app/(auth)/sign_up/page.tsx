'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { SignUpUseCase } from '@/usecase/SignUpUseCase/SignUpUseCase'

type SignUpFormType = {
  email: string
  password: string
  confirmPassword: string
}

const Page = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormType>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const router = useRouter()

  const password = watch('password')

  const onSubmit = handleSubmit(async (data: SignUpFormType) => {
    try {
      const { email, password } = data

      const usecase = new SignUpUseCase()

      const response = await usecase.execute({ email, password })

      if (response.result) {
        router.push('/')
      }
    } catch (error: any) {
      console.error(error)
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
          <div>
            <label htmlFor='confirmPassword'>パスワード（確認）</label>
            <input
              type='password'
              {...register('confirmPassword', {
                required: 'パスワードを入力してください',
                validate: (value) =>
                  value === password || 'パスワードが一致しません',
              })}
              className='w-full border-2 border-gray-300 rounded-md p-2'
            />
            {errors.confirmPassword && (
              <span className='pl-2 text-sm text-red-500'>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </section>
        <section className='flex justify-center'>
          <button
            className='px-4 py-2 text-white font-semibold bg-blue-500 rounded-full shadow-md
            hover:shadow-none hover:bg-blue-600 hover:translate-y-1 duration-300'
          >
            新規登録
          </button>
        </section>
        <section className='flex justify-center'>
          <Link
            href='/sign_in'
            className='font-semibold border-b-2 border-black 
            hover:border-blue-500 hover:text-blue-500 duration-200'
          >
            既にアカウントをお持ちの方はこちら
          </Link>
        </section>
      </form>
    </div>
  )
}

export default Page
