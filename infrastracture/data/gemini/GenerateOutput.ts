export class GenerateOutput {
  // 料理名
  title: string
  // 材料：分量
  materials: GenerateMaterial[]
  // 作り方
  process: GenerateProcess[]
  // 人数
  serves: number
  // 栄養価
  nutrition: GenerateNutrition

  constructor(args: {
    title: string
    materials: GenerateMaterial[]
    process: GenerateProcess[]
    serves: number
    nutrition: GenerateNutrition
  }) {
    const { title, materials, process, serves, nutrition } = args
    this.title = title
    this.materials = materials
    this.process = process
    this.serves = serves
    this.nutrition = nutrition
  }
}

export type GenerateMaterial = {
  name: string
  quantity: string
}

export type GenerateProcess = {
  step: number
  description: string
}

export type GenerateNutrition = {
  calorie: number
  protein: number
  fat: number
  carbohydrate: number
  salt: number
}
