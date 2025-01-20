import { Recipe } from '@/domain/Recipe'

import SaveButton from './Button/SaveButton'

type RecipeListItemProps = {
  recipe: Recipe
  index: number
}

const RecipeListItem = ({ recipe }: RecipeListItemProps, index: number) => {
  return (
    <div key={index} className='w-full max-w-screen-md mx-auto py-16'>
      <div className='w-full bg-red-50 rounded-md p-4 flex flex-col items-center gap-4'>
        <h2 className='p-4 text-2xl font-semibold text-center'>
          {recipe.title}
        </h2>
        <div className='w-full flex flex-row gap-4'>
          <div className='w-1/2 flex flex-col items-center gap-4'>
            <h3 className='text-xl font-semibold'>
              材料<span>({recipe.serves}人前)</span>
            </h3>
            <ul className='w-full space-y-2'>
              {recipe.ingredients.map((ingredient, index) => {
                return (
                  <li key={index}>
                    <span>{ingredient.name}</span>
                    <span>{ingredient.quantity}</span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='w-1/2 flex flex-col items-center gap-4'>
            <h3 className='text-xl font-semibold'>栄養素</h3>

            <ul className='w-full space-y-2'>
              <li>
                カロリー<span>{recipe.nutrition.calorie}kcal</span>
              </li>
              <li>
                たんぱく質<span>{recipe.nutrition.protein}g</span>
              </li>
              <li>
                脂質<span>{recipe.nutrition.fat}g</span>
              </li>
              <li>
                炭水化物<span>{recipe.nutrition.carbohydrate}g</span>
              </li>
              <li>
                塩分<span>{recipe.nutrition.salt}g</span>
              </li>
            </ul>
          </div>
        </div>
        <h3 className='text-xl font-semibold'>作り方</h3>

        <ol className='w-full space-y-2'>
          {recipe.procedure.map((procedure, index) => {
            return (
              <li key={index}>
                <span>{procedure.step}. </span>
                <span>{procedure.description}</span>
              </li>
            )
          })}
        </ol>

        <div className='w-full flex justify-center mt-4'>
          <SaveButton recipe={recipe} />
        </div>
      </div>
    </div>
  )
}

export default RecipeListItem
