import { Recipe } from '@/domain/Recipe'
import { GenerateRepository } from '@/infrastracture/repository/generate_repository'
import { GeminiRecipeService } from '@/infrastracture/service/firebase/gemini/gemini_recipe_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

interface GenerateRecipeByMaterialModeUseCaseInput extends UseCaseInput {
  materials: string[]
  serves: number
}

interface GenerateRecipeByMaterialModeUseCaseOutput extends UseCaseOutput {
  recipes: Recipe[]
}

export class GenerateRecipeByMaterialModeUseCase
  implements
    UseCase<
      GenerateRecipeByMaterialModeUseCaseInput,
      Promise<GenerateRecipeByMaterialModeUseCaseOutput>
    >
{
  private repository: GenerateRepository

  constructor() {
    this.repository = new GeminiRecipeService()
  }

  async execute(
    input: GenerateRecipeByMaterialModeUseCaseInput
  ): Promise<GenerateRecipeByMaterialModeUseCaseOutput> {
    try {
      const { materials, serves } = input

      const recipeDTO = await this.repository.generateRecipeByMaterial({
        materials,
        serves,
      })

      const recipes = recipeDTO.map((dto) => {
        return new Recipe({
          id: dto.id,
          title: dto.title,
          materials: [],
          process: [],
          favorite: dto.favorite,
          serves: dto.serves,
          nutrition: {
            protein: 0,
            fat: 0,
            carbohydrate: 0,
            calorie: 0,
            salt: 0,
          },
          createdAt: dto.createdAt,
        })
      })

      return { recipes }
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
