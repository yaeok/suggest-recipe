import { Recipe } from '@/domain/Recipe'

import RecipeListItem from './RecipeListItem'

type RecipeListProps = {
  recipes: Recipe[]
}

const RecipeList = ({ recipes }: RecipeListProps) => {
  return recipes.map((recipe: Recipe, index: number) => {
    return (
      <div key={recipe.id}>
        <RecipeListItem recipe={recipe} index={index} />
      </div>
    )
  })
}

export default RecipeList
