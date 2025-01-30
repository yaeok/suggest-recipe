import { Recipe } from '@/domain/Recipe'
import { RecipeDTO } from '@/infrastracture/data/RecipeDTO'
import { RecipeRepository } from '@/infrastracture/repository/recipe_repository'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  updateDoc,
} from '@firebase/firestore'

import { db } from '../config'

export class FirestoreRecipeService implements RecipeRepository {
  /** コレクションパス名 */
  private path: string = 'recipes'

  async findAll(): Promise<RecipeDTO[]> {
    const ref = collection(db, this.path)

    const snapshot = await getDocs(ref)

    if (snapshot.empty) {
      return []
    }

    const response = snapshot.docs.map((doc) => {
      return new RecipeDTO({
        id: doc.id,
        title: doc.data().title,
        favorite: doc.data().favorite,
        serves: doc.data().serves,
        createdAt: doc.data().createdAt,
      })
    })

    return response
  }

  async create(args: { recipe: Recipe }): Promise<RecipeDTO> {
    const { recipe } = args

    const document: DocumentData = {
      title: recipe.title,
      favorite: recipe.favorite,
      serves: recipe.serves,
      createdAt: new Date(),
    }

    const ref = collection(db, this.path)

    const doc = await addDoc(ref, document)

    await updateDoc(doc, { id: doc.id })

    return new RecipeDTO({
      id: doc.id,
      title: recipe.title,
      favorite: recipe.favorite,
      serves: recipe.serves,
      createdAt: new Date(),
    })
  }

  async update(args: { recipe: Recipe }): Promise<void> {
    const { recipe } = args

    const document: DocumentData = {
      title: recipe.title,
      favorite: recipe.favorite,
      serves: recipe.serves,
      updatedAt: new Date(),
    }

    const ref = doc(db, this.path, recipe.id)

    await updateDoc(ref, document)
  }

  async delete(args: { id: string }): Promise<void> {
    const { id } = args
    const ref = doc(db, this.path, id)

    await deleteDoc(ref)
  }

  async updateFavorite(args: { id: string; favorite: boolean }): Promise<void> {
    const { id, favorite } = args
    const ref = doc(db, this.path, id)

    await updateDoc(ref, { favorite, updatedAt: new Date() })
  }
}
