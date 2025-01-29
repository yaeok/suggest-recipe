import { Material } from '@/domain/Material'
import { Nutrition } from '@/domain/Nutrition'
import { Process } from '@/domain/Process'
import { Recipe } from '@/domain/Recipe'
import { GenerateOutput } from '@/infrastracture/data/gemini/GenerateOutput'
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

      const output: GenerateOutput[] =
        await this.repository.generateRecipeByMaterial({
          materials,
          serves,
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
