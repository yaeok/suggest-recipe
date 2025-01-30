export class NutritionDTO {
  id: string
  recipeId: string
  protein: number
  fat: number
  calorie: number
  carbohydrate: number
  salt: number

  constructor(args: {
    id: string
    recipeId: string
    protein: number
    fat: number
    calorie: number
    carbohydrate: number
    salt: number
  }) {
    const { id, recipeId, protein, fat, calorie, carbohydrate, salt } = args
    this.id = id
    this.recipeId = recipeId
    this.protein = protein
    this.fat = fat
    this.calorie = calorie
    this.carbohydrate = carbohydrate
    this.salt = salt
  }
}
