export class MaterialDTO {
  id: string
  recipeId: string
  name: string
  quantity: string

  constructor(args: {
    id: string
    recipeId: string
    name: string
    quantity: string
  }) {
    const { id, recipeId, name, quantity } = args
    this.id = id
    this.recipeId = recipeId
    this.name = name
    this.quantity = quantity
  }
}
