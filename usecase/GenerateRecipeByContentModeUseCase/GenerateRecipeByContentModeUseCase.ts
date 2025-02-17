import { Material } from '@/domain/Material'
import { Nutrition } from '@/domain/Nutrition'
import { Process } from '@/domain/Process'
import { Recipe } from '@/domain/Recipe'
import { GenerateRepository } from '@/infrastracture/repository/generate_repository'
import { GeminiRecipeService } from '@/infrastracture/service/firebase/gemini/gemini_recipe_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'
import { SystemErrorException } from '@/infrastracture/exception/SystemErrorException'

interface GenerateRecipeByContentModeUseCaseInput extends UseCaseInput {
  content: string
  serves: number
}

interface GenerateRecipeByContentModeUseCaseOutput extends UseCaseOutput {
  recipes: Recipe[]
}

export class GenerateRecipeByContentModeUseCase
  implements
    UseCase<
      GenerateRecipeByContentModeUseCaseInput,
      Promise<GenerateRecipeByContentModeUseCaseOutput>
    >
{
  private className = 'GenerateRecipeByContentModeUseCase'
  private repository: GenerateRepository

  constructor() {
    this.repository = new GeminiRecipeService()
  }

  async execute(
    input: GenerateRecipeByContentModeUseCaseInput
  ): Promise<GenerateRecipeByContentModeUseCaseOutput> {
    try {
      const { content, serves } = input

      const output = await this.repository.generateRecipeByContent({
        content,
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
      console.error(`${this.className} error:`, error)
      throw new SystemErrorException('レシピの生成に失敗しました')
    }
  }
}
