import { User } from '@/domain/User'
import { UserDTO } from '@/infrastracture/data/UserDTO'
import { UserRepository } from '@/infrastracture/repository/user_repository'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@firebase/firestore'

import { db } from '../config'

export class FirestoreUserService implements UserRepository {
  private path: string = 'users'

  async findById(args: { id: string }): Promise<UserDTO> {
    try {
      const { id } = args

      const ref = collection(db, this.path)

      const q = query(ref, where('id', '==', id))

      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        throw new Error('No user found')
      }

      const user = querySnapshot.docs.map((doc) => {
        return new UserDTO({
          id: doc.id,
          email: doc.data().email,
          createdAt: doc.data().createdAt,
        })
      })[0]

      return user
    } catch (error: any) {
      throw new Error('Failed to find user')
    }
  }

  async create(args: { user: User }): Promise<UserDTO> {
    try {
      const { user } = args

      const ref = doc(db, this.path, user.id)

      const doument = {
        id: user.id,
        email: user.email,
        createdAt: new Date(),
      }

      await setDoc(ref, doument)

      return new UserDTO({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      })
    } catch (error: any) {
      throw new Error('Failed to create user')
    }
  }

  async update(args: { user: User }): Promise<void> {
    try {
      const { user } = args

      const ref = doc(db, this.path, user.id)

      const doument = {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      }

      await updateDoc(ref, doument)
    } catch (error: any) {
      throw new Error('Failed to update user')
    }
  }

  async delete(args: { id: string }) {
    try {
      const { id } = args

      const ref = doc(db, this.path, id)

      await deleteDoc(ref)
    } catch (error: any) {
      throw new Error('Failed to delete user')
    }
  }
}
