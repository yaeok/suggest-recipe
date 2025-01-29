import { useForm } from 'react-hook-form'

import { Recipe } from '@/domain/Recipe'
import { GeminiRecipeService } from '@/infrastracture/service/firebase/gemini/gemini_recipe_service'

import GenerateButton from './Button/GenerateButton'

type ContentRecipeFormProps = {
  setRecipes: (recipes: Recipe[]) => void
  setLoading: (loading: boolean) => void
}

type ContentRecipeFormType = {
  content: string
  serves: number
}

const ContentRecipeForm = ({
  setRecipes,
  setLoading,
}: ContentRecipeFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContentRecipeFormType>({
    defaultValues: {
      content: '',
      serves: 1,
    },
  })

  const onSubmit = handleSubmit(async (data: ContentRecipeFormType) => {
    setLoading(true)
    const service = new GeminiRecipeService()

    const response: Recipe[] = await service.generateRecipeByContent(data)

    setRecipes(response)
    reset()
    setLoading(false)
  })
  return (
    <form
      onSubmit={onSubmit}
      className='w-full flex flex-col items-center gap-4'
    >
      <section className='w-full flex flex-col items-center gap-4'>
        <section className='space-y-2 w-full'>
          <label htmlFor='content' className='text-sm'>
            生成したいレシピの内容
          </label>
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
            <span className='pl-2 text-red-500 text-xs'>
              {errors.content.message}
            </span>
          )}
        </section>
        <section className='space-y-2 w-full'>
          <label htmlFor='serves' className='text-sm'>
            何人前
          </label>
          <input
            type='number'
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
            className='w-full border-2 border-gray-300 rounded-md p-2'
          />
          {errors.serves && (
            <span className='pl-2 text-red-500 text-xs'>
              {errors.serves.message}
            </span>
          )}
        </section>
      </section>
      <section>
        <GenerateButton />
      </section>
    </form>
  )
}

export default ContentRecipeForm
