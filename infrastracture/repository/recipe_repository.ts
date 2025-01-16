import { Recipe } from '@/domain/Recipe'
import { DocumentData } from '@firebase/firestore'

import { FirebaseRecipeService } from '../service/firebase/firestore/firestore_recipe_service'

export class RecipeRepository {
  private service: FirebaseRecipeService

  constructor() {
    this.service = new FirebaseRecipeService()
  }

  async findAll(): Promise<Recipe[]> {
    const response: Recipe[] = []

    const result: DocumentData[] = await this.service.findAll()

    result.forEach((doc: DocumentData) => {
      const recipe: Recipe = new Recipe({
        id: doc.id,
        title: doc.title,
        ingredients: doc.ingredients,
        procedure: doc.procedure,
        favorite: doc.favorite,
        serves: doc.serves,
        createdAt: doc.createdAt,
      })
      response.push(recipe)
    })

    return response
  }

  async generate(): Promise<Recipe[]> {
    const response: Recipe[] = []

    return response
  }

  async create(recipe: Recipe): Promise<Recipe> {
    const response: Recipe = recipe

    return response
  }

  async update(recipe: Recipe): Promise<Recipe> {
    const response: Recipe = recipe

    return response
  }

  async delete(id: string): Promise<void> {
    return
  }

  async updateFavorite(id: string): Promise<void> {}
}
