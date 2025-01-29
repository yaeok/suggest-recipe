import { Material } from '@/domain/Material'
import { MaterialDTO } from '@/infrastracture/data/MaterialDTO'
import { MaterialRepository } from '@/infrastracture/repository/material_repository'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@firebase/firestore'

import { db } from '../config'

export class FirestoreMaterialService implements MaterialRepository {
  private path: string = 'materials'

  async findAllByRecipeId(args: { recipeId: string }): Promise<MaterialDTO[]> {
    const { recipeId } = args

    const ref = collection(db, this.path)

    const q = query(ref, where('recipeId', '==', recipeId))

    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return []
    }

    const response = snapshot.docs.map((doc) => {
      return new MaterialDTO({
        id: doc.id,
        recipeId: doc.data().recipeId,
        name: doc.data().name,
        quantity: doc.data().quantity,
      })
    })

    return response
  }

  async create(args: {
    recipeId: string
    materials: Material[]
  }): Promise<MaterialDTO[]> {
    const { recipeId, materials } = args

    const response: MaterialDTO[] = []

    Promise.all(
      materials.map(async (material) => {
        const document = {
          recipeId: recipeId,
          name: material.name,
          quantity: material.quantity,
        }

        const ref = collection(db, this.path)

        const doc = await addDoc(ref, document)

        await updateDoc(doc, { id: doc.id })

        const materialDTO = new MaterialDTO({
          id: doc.id,
          recipeId: recipeId,
          name: material.name,
          quantity: material.quantity,
        })

        response.push(materialDTO)
      })
    )

    return response
  }

  async update(args: { material: Material }): Promise<void> {
    const { material } = args

    const ref = doc(db, this.path, material.id)

    const document = {
      name: material.name,
      quantity: material.quantity,
    }

    await updateDoc(ref, document)
  }

  async delete(args: { materialId: string }): Promise<void> {
    const { materialId } = args

    const ref = doc(db, this.path, materialId)

    await deleteDoc(ref)
  }
}
