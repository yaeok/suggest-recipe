import { Process } from '@/domain/Process'

import { ProcessDTO } from '../data/ProcessDTO'

export interface ProcessRepository {
  findAllByRecipeId(args: { recipeId: string }): Promise<ProcessDTO[]>

  create(args: {
    recipeId: string
    processes: Process[]
  }): Promise<ProcessDTO[]>

  update(args: { process: Process }): Promise<void>

  delete(args: { processId: string }): Promise<void>
}
