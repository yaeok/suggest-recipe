import { Nutrition } from '@/domain/Nutrition'
import { NutritionDTO } from '@/infrastracture/data/NutritionDTO'
import { NutritionRepository } from '@/infrastracture/repository/nutrition_repository'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@firebase/firestore'

import { db } from '../config'

export class FirestoreNutritionService implements NutritionRepository {
  private path: string = 'nutritions'

  async findAllByRecipeId(args: { recipeId: string }): Promise<NutritionDTO[]> {
    const { recipeId } = args

    const ref = collection(db, this.path)

    const q = query(ref, where('recipeId', '==', recipeId))

    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return []
    }

    const response = snapshot.docs.map((doc) => {
      return new NutritionDTO({
        id: doc.id,
        recipeId: doc.data().recipeId,
        protein: doc.data().protein,
        fat: doc.data().protein,
        calorie: doc.data().protein,
        carbohydrate: doc.data().protein,
        salt: doc.data().protein,
      })
    })

    return response
  }

  async create(args: {
    recipeId: string
    nutrition: Nutrition
  }): Promise<NutritionDTO> {
    const { recipeId, nutrition } = args

    const document = {
      recipeId: recipeId,
      protein: nutrition.protein,
      fat: nutrition.fat,
      calorie: nutrition.calorie,
      carbohydrate: nutrition.carbohydrate,
      salt: nutrition.salt,
    }

    const ref = collection(db, this.path)

    const doc = await addDoc(ref, document)

    await updateDoc(doc, { id: doc.id })

    const response = new NutritionDTO({
      id: doc.id,
      recipeId: recipeId,
      protein: nutrition.protein,
      fat: nutrition.fat,
      calorie: nutrition.calorie,
      carbohydrate: nutrition.carbohydrate,
      salt: nutrition.salt,
    })

    return response
  }

  async update(args: { nutrition: Nutrition }): Promise<void> {
    const { nutrition } = args

    const ref = doc(db, this.path, nutrition.id)

    const document = {
      protein: nutrition.protein,
      fat: nutrition.fat,
      calorie: nutrition.calorie,
      carbohydrate: nutrition.carbohydrate,
      salt: nutrition.salt,
    }

    await updateDoc(ref, document)
  }

  async delete(args: { nutritionId: string }): Promise<void> {
    const { nutritionId } = args

    const ref = doc(db, this.path, nutritionId)

    await updateDoc(ref, { isDeleted: true })
  }
}
