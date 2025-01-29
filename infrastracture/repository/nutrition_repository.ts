import { Nutrition } from '@/domain/Nutrition'

import { NutritionDTO } from '../data/NutritionDTO'

export interface NutritionRepository {
  findAllByRecipeId(args: { recipeId: string }): Promise<NutritionDTO[]>

  create(args: {
    recipeId: string
    nutrition: Nutrition
  }): Promise<NutritionDTO>

  update(args: { nutrition: Nutrition }): Promise<void>

  delete(args: { nutritionId: string }): Promise<void>
}
