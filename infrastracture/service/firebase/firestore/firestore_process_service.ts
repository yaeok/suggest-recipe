import { Process } from '@/domain/Process'
import { ProcessDTO } from '@/infrastracture/data/ProcessDTO'
import { ProcessRepository } from '@/infrastracture/repository/process_repository'
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

export class FirestoreProcessService implements ProcessRepository {
  private path: string = 'processes'

  async findAllByRecipeId(args: { recipeId: string }): Promise<ProcessDTO[]> {
    const { recipeId } = args

    const ref = collection(db, this.path)

    const q = query(ref, where('recipeId', '==', recipeId))

    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return []
    }

    const response = snapshot.docs.map((doc) => {
      return new ProcessDTO({
        id: doc.id,
        recipeId: doc.data().recipeId,
        step: doc.data().step,
        description: doc.data().description,
      })
    })

    return response
  }

  async create(args: {
    recipeId: string
    processes: Process[]
  }): Promise<ProcessDTO[]> {
    const { recipeId, processes } = args

    const response: ProcessDTO[] = []

    Promise.all(
      processes.map(async (process) => {
        const document = {
          recipeId: recipeId,
          step: process.step,
          description: process.description,
        }

        const ref = collection(db, this.path)

        const doc = await addDoc(ref, document)

        await updateDoc(doc, { id: doc.id })

        const processDTO = new ProcessDTO({
          id: doc.id,
          recipeId: recipeId,
          step: process.step,
          description: process.description,
        })

        response.push(processDTO)
      })
    )

    return response
  }

  async update(args: { process: Process }): Promise<void> {
    const { process } = args

    const ref = doc(db, this.path, process.id)

    const document = {
      step: process.step,
      description: process.description,
    }

    await updateDoc(ref, document)
  }

  async delete(args: { processId: string }): Promise<void> {
    const { processId } = args

    const ref = doc(db, this.path, processId)

    await deleteDoc(ref)
  }
}
