import { Material } from '@/domain/Material'
import { Nutrition } from '@/domain/Nutrition'
import { Process } from '@/domain/Process'
import { Recipe } from '@/domain/Recipe'
import { GenerateRepository } from '@/infrastracture/repository/generate_repository'
import { GeminiRecipeService } from '@/infrastracture/service/firebase/gemini/gemini_recipe_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

interface GenerateRecipeByDietModeUseCaseInput extends UseCaseInput {
  nutrition: Nutrition
  serves: number
}

interface GenerateRecipeByDietModeUseCaseOutput extends UseCaseOutput {
  recipes: Recipe[]
}

export class GenerateRecipeByDietModeUseCase
  implements
    UseCase<
      GenerateRecipeByDietModeUseCaseInput,
      Promise<GenerateRecipeByDietModeUseCaseOutput>
    >
{
  private repository: GenerateRepository

  constructor() {
    this.repository = new GeminiRecipeService()
  }

  async execute(
    input: GenerateRecipeByDietModeUseCaseInput
  ): Promise<GenerateRecipeByDietModeUseCaseOutput> {
    try {
      const { nutrition, serves } = input

      const output = await this.repository.generateRecipeByDiet({
        diets: nutrition,
        serves: serves,
      })

      const response: Recipe[] = output.map((recipe) => {
        const nutrition = new Nutrition({ id: '', ...recipe.nutrition })
        const materials = recipe.materials.map((material) => {
          return new Material({
            id: '',
            ...material,
          })
        })
        const processes = recipe.process.map((process) => {
          return new Process({
            id: '',
            ...process,
          })
        })
        return {
          id: '',
          title: recipe.title,
          materials: materials,
          process: processes,
          favorite: false,
          serves: recipe.serves,
          nutrition: nutrition,
          createdAt: new Date(),
        }
      })

      return { recipes: response }
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
