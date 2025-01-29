export class NutritionDTO {
  id: string
  recipeId: string
  protein: number
  fat: number
  calorie: number
  carbohydrate: number

  constructor(args: {
    id: string
    recipeId: string
    protein: number
    fat: number
    calorie: number
    carbohydrate: number
  }) {
    const { id, recipeId, protein, fat, calorie, carbohydrate } = args
    this.id = id
    this.recipeId = recipeId
    this.protein = protein
    this.fat = fat
    this.calorie = calorie
    this.carbohydrate = carbohydrate
  }
}
