import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { IconContext } from 'react-icons'
import { RiCloseCircleLine } from 'react-icons/ri'

import SignUpModal from '@/components/Modal/SignUpModal'
import { Recipe } from '@/domain/Recipe'
import { useAuthContext } from '@/providers/CurrentUserProvider'
import { GenerateRecipeByMaterialModeUseCase } from '@/usecase/GenerateRecipeByMaterialModeUseCase/GenerateRecipeByMaterialModeUseCase'

import GenerateButton from './Button/GenerateButton'

type MaterialRecipeFormProps = {
  setRecipes: (recipes: Recipe[]) => void
  setLoading: (loading: boolean) => void
}

type MaterialRecipeFormType = {
  materials: { name: string }[]
  serves: number
}

const MaterialRecipeForm = ({
  setRecipes,
  setLoading,
}: MaterialRecipeFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MaterialRecipeFormType>({
    defaultValues: {
      materials: [{ name: '' }],
      serves: 1,
    },
  })

  const { fields, append, remove } = useFieldArray<MaterialRecipeFormType>({
    control: control,
    name: 'materials',
  })

  const [isOpen, setIsOpen] = useState(false)

  const currentUser = useAuthContext().currentUser

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const onSubmit = handleSubmit(async (data: MaterialRecipeFormType) => {
    if (currentUser === null) {
      openModal()
      return
    }
    const { materials, serves } = data
    setLoading(true)
    const usecase = new GenerateRecipeByMaterialModeUseCase()

    const lstMaterials = materials.map((material) => material.name)

    const response = await usecase.execute({
      materials: lstMaterials,
      serves: serves,
    })

    setRecipes(response.recipes)
    setLoading(false)
  })
  return (
    <div>
      <form
        onSubmit={onSubmit}
        className='w-full flex flex-col items-center gap-4'
      >
        <section className='w-full flex flex-col items-center gap-4'>
          <section className='space-y-2 w-full'>
            <label htmlFor='content' className='text-sm'>
              使いたい材料を入力してください
            </label>
            {fields.map((field, index) => {
              return (
                <div key={field.id} className='space-y-2'>
                  <div className='flex flex-row gap-2 items-center'>
                    <input
                      {...register(`materials.${index}.name`, {
                        required: '材料を入力してください',
                      })}
                      className='flex-1 border-2 border-gray-300 rounded-md p-2'
                    />
                    <button
                      type='button'
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                      className='disabled:opacity-50'
                    >
                      <IconContext.Provider value={{ size: '1.5em' }}>
                        <RiCloseCircleLine />
                      </IconContext.Provider>
                    </button>
                  </div>
                  {errors.materials && errors.materials[index]?.name && (
                    <span className='pl-2 text-red-500 text-xs'>
                      {errors.materials[index]?.name.message}
                    </span>
                  )}
                </div>
              )
            })}
          </section>
          <button
            type='button'
            onClick={() =>
              append({
                name: '',
              })
            }
            disabled={fields.length >= 5}
            className='px-4 py-2 text-sm bg-red-300 rounded-full shadow-md
          disabled:opacity-50
          hover:shadow-none hover:bg-red-400 hover:translate-y-1 duration-300'
          >
            追加
          </button>
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
      <SignUpModal isOpen={isOpen} onClose={closeModal} />
    </div>
  )
}

export default MaterialRecipeForm
