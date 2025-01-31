import { useForm } from 'react-hook-form'

import { Nutrition } from '@/domain/Nutrition'
import { Recipe } from '@/domain/Recipe'
import { GenerateRecipeByDietModeUseCase } from '@/usecase/GenerateRecipeByDietModeUseCase/GenerateRecipeByDietModeUseCase'

import GenerateButton from './Button/GenerateButton'
import { useState } from 'react'
import { useAuthContext } from '@/providers/CurrentUserProvider'
import SignUpModal from '@/components/Modal/SignUpModal'

type DietRecipeFormProps = {
  setRecipes: (recipes: Recipe[]) => void
  setLoading: (loading: boolean) => void
}

type DietRecipeFormType = {
  calorie: number
  protein: number
  fat: number
  carbohydrate: number
  serves: number
}

const DietRecipeForm = ({ setRecipes, setLoading }: DietRecipeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DietRecipeFormType>({
    defaultValues: {
      calorie: 0,
      protein: 0,
      fat: 0,
      carbohydrate: 0,
      serves: 1,
    },
  })

  const [isOpen, setIsOpen] = useState(false)

  const currentUser = useAuthContext()

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const onSubmit = handleSubmit(async (data: DietRecipeFormType) => {
    if (currentUser.currentUser === null || !currentUser.isEmailVerified) {
      openModal()
      return
    }

    const { calorie, protein, fat, carbohydrate, serves } = data
    setLoading(true)

    const usecase = new GenerateRecipeByDietModeUseCase()

    const nutrition = new Nutrition({
      id: '',
      calorie: calorie,
      protein: protein,
      fat: fat,
      carbohydrate: carbohydrate,
      salt: 0,
    })

    const response = await usecase.execute({
      nutrition: nutrition,
      serves: serves,
    })

    setRecipes(response.recipes)
    setLoading(false)
  })
  return (
    <form
      onSubmit={onSubmit}
      className='w-full flex flex-col items-center gap-4'
    >
      <section className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        <section className='space-y-2 w-full'>
          <label htmlFor='calorie' className='text-sm'>
            カロリー
          </label>
          <input
            {...register('calorie', {
              required: 'カロリーを入力してください',
              min: {
                value: 0,
                message: '0以上の値を入力してください',
              },
            })}
            min={0}
            type='number'
            className='w-full h-10 border-2 border-gray-300 rounded-md p-2'
          />
          {errors.calorie && (
            <span className='text-red-500 text-xs'>
              {errors.calorie.message}
            </span>
          )}
        </section>
        <section className='space-y-2 w-full'>
          <label htmlFor='protein' className='text-sm'>
            タンパク質
          </label>
          <input
            {...register('protein', {
              required: 'タンパク質を入力してください',
              min: {
                value: 0,
                message: '0以上の値を入力してください',
              },
            })}
            min={0}
            type='number'
            className='w-full h-10 border-2 border-gray-300 rounded-md p-2'
          />
          {errors.protein && (
            <span className='text-red-500 text-xs'>
              {errors.protein.message}
            </span>
          )}
        </section>
        <section className='space-y-2 w-full'>
          <label htmlFor='fat' className='text-sm'>
            脂質
          </label>
          <input
            {...register('fat', {
              required: '脂質を入力してください',
              min: {
                value: 0,
                message: '0以上の値を入力してください',
              },
            })}
            min={0}
            type='number'
            className='w-full h-10 border-2 border-gray-300 rounded-md p-2'
          />
          {errors.fat && (
            <span className='text-red-500 text-xs'>{errors.fat.message}</span>
          )}
        </section>
        <section className='space-y-2 w-full'>
          <label htmlFor='carbohydrate' className='text-sm'>
            炭水化物
          </label>
          <input
            {...register('carbohydrate', {
              required: '炭水化物を入力してください',
              min: {
                value: 0,
                message: '0以上の値を入力してください',
              },
            })}
            min={0}
            type='number'
            className='w-full h-10 border-2 border-gray-300 rounded-md p-2'
          />
          {errors.carbohydrate && (
            <span className='text-red-500 text-xs'>
              {errors.carbohydrate.message}
            </span>
          )}
        </section>
      </section>
      <section>
        <GenerateButton />
      </section>
      <SignUpModal
        isOpen={isOpen}
        onClose={closeModal}
        isAuth={currentUser.currentUser !== null}
        isEmailVerification={currentUser.isEmailVerified}
      />
    </form>
  )
}

export default DietRecipeForm
