import { useFieldArray, useForm } from 'react-hook-form'
import { IconContext } from 'react-icons'
import { RiCloseCircleLine } from 'react-icons/ri'

import { Recipe } from '@/domain/Recipe'
import { RecipeRepository } from '@/infrastracture/repository/recipe_repository'

import GenerateButton from './Button/GenerateButton'

type IngredientRecipeFormProps = {
  setRecipes: (recipes: Recipe[]) => void
  setLoading: (loading: boolean) => void
}

type IngredientRecipeFormType = {
  ingredients: { name: string }[]
  serves: number
}

const IngredientRecipeForm = ({
  setRecipes,
  setLoading,
}: IngredientRecipeFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IngredientRecipeFormType>({
    defaultValues: {
      ingredients: [{ name: '' }],
      serves: 1,
    },
  })

  const { fields, append, remove } = useFieldArray<IngredientRecipeFormType>({
    control: control,
    name: 'ingredients',
  })

  const onSubmit = handleSubmit(async (data: IngredientRecipeFormType) => {
    const { ingredients, serves } = data
    setLoading(true)
    const repository = new RecipeRepository()

    const lstIngredients = ingredients.map((ingredient) => ingredient.name)

    const response: Recipe[] = await repository.generateRecipeByIngredients({
      ingredients: lstIngredients,
      serves: serves,
    })

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
          <label htmlFor='content'>使いたい材料を入力してください</label>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className='space-y-2'>
                <div className='flex flex-row gap-2 items-center'>
                  <input
                    {...register(`ingredients.${index}.name`, {
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
                {errors.ingredients && errors.ingredients[index]?.name && (
                  <span className='pl-2 text-red-500 text-xs'>
                    {errors.ingredients[index]?.name.message}
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
          className='px-4 py-2 text-sm font-semibold bg-red-300 rounded-full disabled:opacity-50'
        >
          追加
        </button>
        <section className='space-y-2 w-full'>
          <label htmlFor='serves'>何人前</label>
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

export default IngredientRecipeForm
