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

  async create(args: { recipe: Recipe }): Promise<Recipe> {
    const { recipe } = args

    const document: DocumentData = {
      id: recipe.id,
      title: recipe.title,
      ingredients: recipe.ingredients,
      procedure: recipe.procedure,
      favorite: recipe.favorite,
      serves: recipe.serves,
      createdAt: recipe.createdAt,
    }

    const id: string = await this.service.create({ document })

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
      favorite: recipe.favorite,
      serves: recipe.serves,
      createdAt: recipe.createdAt,
      updatedAt: new Date(),
    }
    await this.service.update({ document })
  }

  async delete(args: { id: string }): Promise<void> {
    const { id } = args

    await this.service.delete({ id })
  }

  async updateForFavorite(args: { id: string }): Promise<void> {
    const { id } = args

    await this.service.updateForFavorite({ id, favorite: true })
  }
}
