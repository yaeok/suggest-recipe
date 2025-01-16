import { Recipe } from '@/domain/Resipe'

export class RecipeRepository {
  async findAll(): Promise<Recipe[]> {
    const response: Recipe[] = []

    return response
  }

  async generate(): Promise<Recipe[]> {
    const response: Recipe[] = []

    return response
  }

  async create(recipe: Recipe): Promise<Recipe> {
    const response: Recipe = recipe

    return response
  }

  async update(recipe: Recipe): Promise<Recipe> {
    const response: Recipe = recipe

    return response
  }

  async delete(id: string): Promise<void> {
    return
  }
}
