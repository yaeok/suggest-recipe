import { InGredient, Nutrition, Procedure, Recipe } from '@/domain/Recipe'
import { DocumentData } from '@firebase/firestore'
import { GenerateContentResult } from '@google/generative-ai'

import { FirestoreRecipeService } from '../service/firebase/firestore/firestore_recipe_service'
import { GeminiRecipeService } from '../service/firebase/gemini/gemini_recipe_service'

export class RecipeRepository {
  private firestoreService: FirestoreRecipeService
  private geminiService: GeminiRecipeService

  constructor() {
    this.firestoreService = new FirestoreRecipeService()
    this.geminiService = new GeminiRecipeService()
  }

  async findAll(): Promise<Recipe[]> {
    const response: Recipe[] = []

    const result: DocumentData[] = await this.firestoreService.findAll()

    result.forEach((doc: DocumentData) => {
      const recipe: Recipe = new Recipe({
        id: doc.id,
        title: doc.title,
        ingredients: doc.ingredients as InGredient[],
        procedure: doc.procedure as Procedure[],
        favorite: doc.favorite,
        serves: doc.serves,
        nutrition: doc.nutrition as Nutrition,
        createdAt: doc.createdAt,
      })
      response.push(recipe)
    })

    return response
  }

  async generateRecipeByContent(args: {
    content: string
    serves: number
  }): Promise<Recipe[]> {
    const response: Recipe[] = []

    const result: GenerateContentResult =
      await this.geminiService.generateRecipeByContent(args)

    const text = result.response.text()

    const json = JSON.parse(text)

    json.recipes.forEach((json: any) => {
      const ingredients: InGredient[] = json.ingredients.map(
        (ingredient: any) => {
          return ingredient as InGredient
        }
      )
      const procedure: Procedure[] = json.procedure.map(
        (procedure: any, index: number) => {
          return {
            step: index + 1,
            description: procedure,
          } as Procedure
        }
      )
      const recipe: Recipe = new Recipe({
        id: '',
        title: json.title,
        ingredients: ingredients,
        procedure: procedure,
        favorite: false,
        serves: args.serves,
        nutrition: json.nutrition as Nutrition,
        createdAt: new Date(),
      })
      response.push(recipe)
    })

    return response
  }

  async generateRecipeByIngredients(args: {
    ingredients: string[]
    serves: number
  }): Promise<Recipe[]> {
    const response: Recipe[] = []

    const result: GenerateContentResult =
      await this.geminiService.generateRecipeByIngredients(args)

    const text = result.response.text()

    const json = JSON.parse(text)

    json.recipes.forEach((json: any) => {
      const ingredients: InGredient[] = json.ingredients.map(
        (ingredient: any) => {
          return ingredient as InGredient
        }
      )
      const procedure: Procedure[] = json.procedure.map(
        (procedure: any, index: number) => {
          return {
            step: index + 1,
            description: procedure,
          } as Procedure
        }
      )
      const recipe: Recipe = new Recipe({
        id: '',
        title: json.title,
        ingredients: ingredients,
        procedure: procedure,
        favorite: false,
        serves: args.serves,
        nutrition: json.nutrition as Nutrition,
        createdAt: new Date(),
      })
      response.push(recipe)
    })

    return response
  }

  async create(args: { recipe: Recipe }): Promise<Recipe> {
    const { recipe } = args

    const document: DocumentData = {
      id: recipe.id,
      title: recipe.title,
      ingredients: recipe.ingredients,
      procedure: recipe.procedure,
      favorite: recipe.favorite,
      serves: recipe.serves,
      nutrition: recipe.nutrition,
      createdAt: recipe.createdAt,
    }

    const id: string = await this.firestoreService.create({ document })

    recipe.id = id

    return recipe
  }

  async update(args: { recipe: Recipe }): Promise<void> {
    const { recipe } = args

    const document: DocumentData = {
      id: recipe.id,
      title: recipe.title,
      ingredients: recipe.ingredients,
      procedure: recipe.procedure,
      createdAt: recipe.createdAt,
      updatedAt: new Date(),
    }
    await this.firestoreService.update({ document })
  }

  async delete(args: { id: string }): Promise<void> {
    const { id } = args

    await this.firestoreService.delete({ id })
  }

  async updateForFavorite(args: { id: string }): Promise<void> {
    const { id } = args

    await this.firestoreService.updateForFavorite({ id, favorite: true })
  }
}
