import {
  createPromptByContent,
  createPromptByDiet,
  createPromptByMaterial,
} from '@/constants/Prompt'
import { Nutrition } from '@/domain/Nutrition'
import {
  GenerateMaterial,
  GenerateNutrition,
  GenerateOutput,
  GenerateProcess,
} from '@/infrastracture/data/gemini/GenerateOutput'
import { GenerateRepository } from '@/infrastracture/repository/generate_repository'
import {
  GenerateContentResult,
  GoogleGenerativeAI,
} from '@google/generative-ai'

import { geminiAPI } from '../config'

export class GeminiRecipeService implements GenerateRepository {
  private genAI: GoogleGenerativeAI

  constructor() {
    this.genAI = new GoogleGenerativeAI(geminiAPI!)
  }
  async generateRecipeByContent(args: {
    content: string
    serves: number
  }): Promise<GenerateOutput[]> {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
    })

    // 結果を格納する配列
    const result: GenerateOutput[] = []

    // プロンプトを生成
    const prompt = createPromptByContent(args)

    // レシピを生成
    const response: GenerateContentResult = await model.generateContent(prompt)

    const text = response.response.text()

    const json = JSON.parse(text)

    json.recipes.forEach((json: any) => {
      const materials = json.materials.map((material: any) => {
        return {
          name: material.name,
          quantity: material.quantity,
        } as GenerateMaterial
      })

      const process = json.process.map((process: any, index: number) => {
        return {
          step: index + 1,
          description: process,
        } as GenerateProcess
      })

      const nutrition = {
        calorie: json.nutrition.calorie,
        protein: json.nutrition.protein,
        fat: json.nutrition.fat,
        carbohydrate: json.nutrition.carbohydrate,
        salt: json.nutrition.salt,
      } as GenerateNutrition

      const recipe: GenerateOutput = new GenerateOutput({
        title: json.title,
        materials: materials,
        process: process,
        serves: args.serves,
        nutrition: nutrition,
      })

      result.push(recipe)
    })

    return result
  }

  async generateRecipeByMaterial(args: {
    materials: string[]
    serves: number
  }): Promise<GenerateOutput[]> {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
    })

    // 結果を格納する配列
    const result: GenerateOutput[] = []

    // プロンプトを生成
    const prompt = createPromptByMaterial(args)

    // レシピを生成
    const response: GenerateContentResult = await model.generateContent(prompt)

    const text = response.response.text()

    const json = JSON.parse(text)

    json.recipes.forEach((json: any) => {
      const materials = json.materials.map((material: any) => {
        return {
          name: material.name,
          quantity: material.quantity,
        } as GenerateMaterial
      })

      const process = json.process.map((process: any, index: number) => {
        return {
          step: index + 1,
          description: process,
        } as GenerateProcess
      })

      const nutrition = {
        calorie: json.nutrition.calorie,
        protein: json.nutrition.protein,
        fat: json.nutrition.fat,
        carbohydrate: json.nutrition.carbohydrate,
        salt: json.nutrition.salt,
      } as GenerateNutrition

      const recipe: GenerateOutput = new GenerateOutput({
        title: json.title,
        materials: materials,
        process: process,
        serves: args.serves,
        nutrition: nutrition,
      })

      result.push(recipe)
    })

    return result
  }

  async generateRecipeByDiet(args: {
    diets: Nutrition
    serves: number
  }): Promise<GenerateOutput[]> {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
    })

    // 結果を格納する配列
    const result: GenerateOutput[] = []

    // プロンプトを生成
    const prompt = createPromptByDiet(args)

    // レシピを生成
    const response: GenerateContentResult = await model.generateContent(prompt)

    const text = response.response.text()

    const json = JSON.parse(text)

    json.recipes.forEach((json: any) => {
      const materials = json.materials.map((material: any) => {
        return {
          name: material.name,
          quantity: material.quantity,
        } as GenerateMaterial
      })

      const process = json.process.map((process: any, index: number) => {
        return {
          step: index + 1,
          description: process,
        } as GenerateProcess
      })

      const nutrition = {
        calorie: json.nutrition.calorie,
        protein: json.nutrition.protein,
        fat: json.nutrition.fat,
        carbohydrate: json.nutrition.carbohydrate,
        salt: json.nutrition.salt,
      } as GenerateNutrition

      const recipe: GenerateOutput = new GenerateOutput({
        title: json.title,
        materials: materials,
        process: process,
        serves: args.serves,
        nutrition: nutrition,
      })

      result.push(recipe)
    })

    return result
  }
}
