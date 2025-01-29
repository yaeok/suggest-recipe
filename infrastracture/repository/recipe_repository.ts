import { Recipe } from '@/domain/Recipe'

import { RecipeDTO } from '../data/RecipeDTO'

export interface RecipeRepository {
  findAll(): Promise<RecipeDTO[]>

  create(args: { recipe: Recipe }): Promise<RecipeDTO>

  update(args: { recipe: Recipe }): Promise<void>

  delete(args: { id: string }): Promise<void>

  updateFavorite(args: { id: string; favorite: boolean }): Promise<void>
}
