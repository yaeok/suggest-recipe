export class Recipe {
  // レシピID
  id: string
  // 料理名
  title: string
  // 材料：分量
  ingredients: InGredient[]
  // 作り方
  procedure: Procedure[]
  // お気に入り
  favorite: boolean
  // 人数
  serves: number
  // 栄養価
  nutrition: Nutrition
  // 作成日
  createdAt: Date

  constructor(args: {
    id: string
    title: string
    ingredients: InGredient[]
    procedure: Procedure[]
    favorite: boolean
    serves: number
    nutrition: Nutrition
    createdAt: Date
  }) {
    const {
      id,
      title,
      ingredients,
      procedure,
      favorite,
      serves,
      nutrition,
      createdAt,
    } = args
    this.id = id
    this.title = title
    this.ingredients = ingredients
    this.procedure = procedure
    this.favorite = favorite
    this.serves = serves
    this.nutrition = nutrition
    this.createdAt = createdAt
  }
}

export type InGredient = {
  name: string
  quantity: string
}

export type Procedure = {
  step: number
  description: string
}

export type Nutrition = {
  calorie: number
  protein: number
  fat: number
  carbohydrate: number
  salt: number
}
