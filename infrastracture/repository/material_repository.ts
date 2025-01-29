import { Material } from '@/domain/Material'

import { MaterialDTO } from '../data/MaterialDTO'

export interface MaterialRepository {
  findAllByRecipeId(args: { recipeId: string }): Promise<MaterialDTO[]>

  create(args: {
    recipeId: string
    materials: Material[]
  }): Promise<MaterialDTO[]>

  update(args: { material: Material }): Promise<void>

  delete(args: { materialId: string }): Promise<void>
}
