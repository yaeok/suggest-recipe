import { Material } from '@/domain/Material'
import { Nutrition } from '@/domain/Nutrition'
import { Process } from '@/domain/Process'
import { Recipe } from '@/domain/Recipe'
import { MaterialDTO } from '@/infrastracture/data/MaterialDTO'
import { NutritionDTO } from '@/infrastracture/data/NutritionDTO'
import { ProcessDTO } from '@/infrastracture/data/ProcessDTO'
import { RecipeDTO } from '@/infrastracture/data/RecipeDTO'
import { MaterialRepository } from '@/infrastracture/repository/material_repository'
import { NutritionRepository } from '@/infrastracture/repository/nutrition_repository'
import { ProcessRepository } from '@/infrastracture/repository/process_repository'
import { RecipeRepository } from '@/infrastracture/repository/recipe_repository'
import { FirestoreMaterialService } from '@/infrastracture/service/firebase/firestore/firestore_material_service'
import { FirestoreNutritionService } from '@/infrastracture/service/firebase/firestore/firestore_nutrition_service'
import { FirestoreProcessService } from '@/infrastracture/service/firebase/firestore/firestore_process_service'
import { FirestoreRecipeService } from '@/infrastracture/service/firebase/firestore/firestore_recipe_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

interface CreateRecipeUseCaseInput extends UseCaseInput {
  recipe: Recipe
}

interface CreateRecipeUseCaseOutput extends UseCaseOutput {
  recipe: Recipe
}

export class CreateRecipeUseCase
  implements
    UseCase<CreateRecipeUseCaseInput, Promise<CreateRecipeUseCaseOutput>>
{
  private recipeRepository: RecipeRepository
  private materialRepository: MaterialRepository
  private processRepository: ProcessRepository
  private nutritionRepository: NutritionRepository

  constructor() {
    this.recipeRepository = new FirestoreRecipeService()
    this.materialRepository = new FirestoreMaterialService()
    this.processRepository = new FirestoreProcessService()
    this.nutritionRepository = new FirestoreNutritionService()
  }

  async execute(
    input: CreateRecipeUseCaseInput
  ): Promise<CreateRecipeUseCaseOutput> {
    try {
      const { recipe } = input

      const responseRecipe: RecipeDTO = await this.recipeRepository.create({
        recipe,
      })

      const responseMaterial = await this.materialRepository
        .create({
          recipeId: responseRecipe.id,
          materials: recipe.materials,
        })
        .then((response: MaterialDTO[]) => {
          const materials = response.map((material) => {
            return new Material({
              id: material.id,
              name: material.name,
              quantity: material.quantity,
            })
          })
          return materials
        })

      const responseProcess = await this.processRepository
        .create({
          recipeId: responseRecipe.id,
          processes: recipe.process,
        })
        .then((response: ProcessDTO[]) => {
          const process = response.map((process) => {
            return new Process({
              id: process.id,
              step: process.step,
              description: process.description,
            })
          })
          return process
        })

      const responseNutrition = await this.nutritionRepository
        .create({
          recipeId: responseRecipe.id,
          nutrition: recipe.nutrition,
        })
        .then((response: NutritionDTO) => {
          const nutrition = new Nutrition({
            id: response.id,
            protein: response.protein,
            fat: response.fat,
            calorie: response.calorie,
            carbohydrate: response.carbohydrate,
            salt: response.salt,
          })
          return nutrition
        })

      const response = new Recipe({
        id: responseRecipe.id,
        title: responseRecipe.title,
        materials: responseMaterial,
        process: responseProcess,
        nutrition: responseNutrition,
        favorite: responseRecipe.favorite,
        serves: responseRecipe.serves,
        createdAt: responseRecipe.createdAt,
      })

      return { recipe: response }
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
