import { collection, DocumentData, getDocs } from '@firebase/firestore'

import { db } from '../config'

export class FirebaseRecipeService {
  async findAll(): Promise<DocumentData[]> {
    const ref = collection(db, 'recipes')

    const snapshot = await getDocs(ref)

    if (snapshot.empty) {
      return []
    }

    return snapshot.docs.map((doc) => doc.data())
  }

  async create(): Promise<void> {}

  async update(): Promise<void> {}

  async delete(): Promise<void> {}
}
