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
  // 作成日
  createdAt: Date

  constructor(
    id: string,
    title: string,
    ingredients: InGredient[],
    procedure: Procedure[],
    favorite: boolean,
    serves: number,
    createdAt: Date
  ) {
    this.id = id
    this.title = title
    this.ingredients = ingredients
    this.procedure = procedure
    this.favorite = favorite
    this.serves = serves
    this.createdAt = createdAt
  }
}

export type InGredient = {
  name: string
  amount: string
}

export type Procedure = {
  step: number
  description: string
}
