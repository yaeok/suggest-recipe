export class Recipe {
  // レシピID
  id: string
  // 料理名
  title: string
  // 材料：分量
  materials: Material[]
  // 作り方
  process: Process[]
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
    materials: Material[]
    process: Process[]
    favorite: boolean
    serves: number
    nutrition: Nutrition
    createdAt: Date
  }) {
    const {
      id,
      title,
      materials,
      process,
      favorite,
      serves,
      nutrition,
      createdAt,
    } = args
    this.id = id
    this.title = title
    this.materials = materials
    this.process = process
    this.favorite = favorite
    this.serves = serves
    this.nutrition = nutrition
    this.createdAt = createdAt
  }
}

export type Material = {
  name: string
  quantity: string
}

export type Process = {
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
