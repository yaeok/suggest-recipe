import {
  createPromptByContent,
  createPromptByDiet,
  createPromptByMaterial,
} from '@/constants/Prompt'
import { Nutrition } from '@/domain/Recipe'
import { RecipeDTO } from '@/infrastracture/data/RecipeDTO'
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
  }): Promise<RecipeDTO[]> {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
    })

    const result: RecipeDTO[] = []

    // プロンプトを生成
    const prompt = createPromptByContent(args)

    // レシピを生成
    const response: GenerateContentResult = await model.generateContent(prompt)

    const text = response.response.text()

    const json = JSON.parse(text)

    json.recipes.forEach((json: any) => {
      const recipe: RecipeDTO = new RecipeDTO({
        id: '',
        title: json.title,
        favorite: false,
        serves: args.serves,
        createdAt: new Date(),
      })
      result.push(recipe)
    })

    return result
  }

  async generateRecipeByMaterial(args: {
    materials: string[]
    serves: number
  }): Promise<RecipeDTO[]> {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
    })

    const result: RecipeDTO[] = []

    // プロンプトを生成
    const prompt = createPromptByMaterial(args)

    // レシピを生成
    const response: GenerateContentResult = await model.generateContent(prompt)

    const text = response.response.text()

    const json = JSON.parse(text)

    json.recipes.forEach((json: any) => {
      const recipe: RecipeDTO = new RecipeDTO({
        id: '',
        title: json.title,
        favorite: false,
        serves: args.serves,
        createdAt: new Date(),
      })
      result.push(recipe)
    })

    return result
  }

  async generateRecipeByDiet(args: {
    diets: Nutrition
    serves: number
  }): Promise<RecipeDTO[]> {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
    })

    const result: RecipeDTO[] = []

    // プロンプトを生成
    const prompt = createPromptByDiet(args)

    // レシピを生成
    const response: GenerateContentResult = await model.generateContent(prompt)

    const text = response.response.text()

    const json = JSON.parse(text)

    json.recipes.forEach((json: any) => {
      const recipe: RecipeDTO = new RecipeDTO({
        id: '',
        title: json.title,
        favorite: false,
        serves: args.serves,
        createdAt: new Date(),
      })
      result.push(recipe)
    })

    return result
  }
}
