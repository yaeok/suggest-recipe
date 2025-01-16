'use client'

import { useRef } from 'react'
import { useForm } from 'react-hook-form'

type GenerateFormType = {
  content: string
  serves: number
}

const Page = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<GenerateFormType>({
    defaultValues: {
      content: '',
      serves: 1,
    },
  })

  const serves = watch('serves')

  const onSubmit = handleSubmit((data: GenerateFormType) => {
    console.log(data)
    reset()
  })
  return (
    <div className='w-full min-h-screen max-w-xl mx-auto py-32'>
      <form
        onSubmit={onSubmit}
        className='w-full flex flex-col items-center gap-4'
      >
        <section className='space-y-2 w-full'>
          <label htmlFor='content'>生成したいレシピの内容</label>
          <textarea
            {...register('content', {
              required: '生成したいレシピの内容を入力してください',
              maxLength: {
                value: 1000,
                message: '1000文字以内で入力してください',
              },
            })}
            className='w-full h-40 max-h-80 border-2 border-gray-300 rounded-md p-2'
          />
          {errors.content && (
            <span className='pl-2 text-red-500'>{errors.content.message}</span>
          )}
        </section>
        <section className='space-y-2 w-full'>
          <label htmlFor='serves'>何人前</label>
          <input
            type='hidden'
            min={1}
            max={5}
            {...register('serves', {
              required: '何人前か選択してください',
              valueAsNumber: true,
              min: {
                value: 1,
                message: '1人前以上を選択してください',
              },
              max: {
                value: 5,
                message: '5人前以下を選択してください',
              },
            })}
          />
          <div className='flex flex-row justify-between w-full'>
            <span>{serves}</span>
          </div>
          {errors.serves && (
            <span className='pl-2 text-red-500'>{errors.serves.message}</span>
          )}
        </section>
        <section>
          <button className='px-4 py-2 text-lg font-semibold bg-red-300 rounded-full'>
            生成する
          </button>
        </section>
      </form>
    </div>
  )
}

export default Page
