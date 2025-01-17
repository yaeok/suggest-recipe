import {
  createPromptByContent,
  createPromptByIngredients,
} from '@/constants/Prompt'
import {
  GenerateContentResult,
  GoogleGenerativeAI,
} from '@google/generative-ai'

import { geminiAPI } from '../config'

export class GeminiRecipeService {
  private genAI: GoogleGenerativeAI

  constructor() {
    this.genAI = new GoogleGenerativeAI(geminiAPI!)
  }
  async generateRecipeByContent(args: {
    content: string
    serves: number
  }): Promise<GenerateContentResult> {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
    })

    // プロンプトを生成
    const prompt = createPromptByContent(args)

    // レシピを生成
    const response = await model.generateContent(prompt)

    // 結果を返却
    return response
  }

  async generateRecipeByIngredients(args: {
    ingredients: string[]
    serves: number
  }): Promise<GenerateContentResult> {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
    })

    // プロンプトを生成
    const prompt = createPromptByIngredients(args)

    // レシピを生成
    const response = await model.generateContent(prompt)

    // 結果を返却
    return response
  }
}
