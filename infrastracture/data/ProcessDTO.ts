export class ProcessDTO {
  id: string
  recipeId: string
  step: number
  description: string

  constructor(args: {
    id: string
    recipeId: string
    step: number
    description: string
  }) {
    const { id, recipeId, step, description } = args
    this.id = id
    this.recipeId = recipeId
    this.step = step
    this.description = description
  }
}
