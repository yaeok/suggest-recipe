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

export class FirestoreRecipeService {
  /** コレクションパス名 */
  private path: string = 'recipes'

  async findAll(): Promise<DocumentData[]> {
    const ref = collection(db, this.path)

    const snapshot = await getDocs(ref)

    if (snapshot.empty) {
      return []
    }

    return snapshot.docs.map((doc) => doc.data())
  }

  async create(args: { document: DocumentData }): Promise<string> {
    const { document } = args
    const ref = collection(db, this.path)

    const doc = await addDoc(ref, document)

    await updateDoc(doc, { id: doc.id })

    return doc.id
  }

  async update(args: { document: DocumentData }): Promise<void> {
    const { document } = args
    const ref = doc(db, this.path, document.id)

    await updateDoc(ref, document)
  }

  async delete(args: { id: string }): Promise<void> {
    const { id } = args
    const ref = doc(db, this.path, id)

    await deleteDoc(ref)
  }

  async updateForFavorite(args: {
    id: string
    favorite: boolean
  }): Promise<void> {
    const { id, favorite } = args
    const ref = doc(db, this.path, id)

    await updateDoc(ref, { favorite, updatedAt: new Date() })
  }
}
