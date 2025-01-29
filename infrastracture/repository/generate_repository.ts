import { Nutrition } from '@/domain/Nutrition'

import { GenerateOutput } from '../data/gemini/GenerateOutput'

export interface GenerateRepository {
  generateRecipeByContent(args: {
    content: string
    serves: number
  }): Promise<GenerateOutput[]>

  generateRecipeByMaterial(args: {
    materials: string[]
    serves: number
  }): Promise<GenerateOutput[]>

  generateRecipeByDiet(args: {
    diets: Nutrition
    serves: number
  }): Promise<GenerateOutput[]>
}
