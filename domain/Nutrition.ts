export class Nutrition {
  // id
  id: string
  // カロリー
  calorie: number
  // タンパク質
  protein: number
  // 脂質
  fat: number
  // 炭水化物
  carbohydrate: number
  // 塩分
  salt: number

  constructor(args: {
    id: string
    calorie: number
    protein: number
    fat: number
    carbohydrate: number
    salt: number
  }) {
    const { id, calorie, protein, fat, carbohydrate, salt } = args
    this.id = id
    this.calorie = calorie
    this.protein = protein
    this.fat = fat
    this.carbohydrate = carbohydrate
    this.salt = salt
  }
}
