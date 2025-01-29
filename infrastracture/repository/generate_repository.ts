import { Nutrition } from '@/domain/Recipe'

import { RecipeDTO } from '../data/RecipeDTO'

export interface GenerateRepository {
  generateRecipeByContent(args: {
    content: string
    serves: number
  }): Promise<RecipeDTO[]>

  generateRecipeByMaterial(args: {
    materials: string[]
    serves: number
  }): Promise<RecipeDTO[]>

  generateRecipeByDiet(args: {
    diets: Nutrition
    serves: number
  }): Promise<RecipeDTO[]>
}
