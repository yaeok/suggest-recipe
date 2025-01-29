import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import { AuthRepository } from '@/infrastracture/repository/auth_repository'

import { auth } from '../config'

export class AuthenticationService implements AuthRepository {
  async signIn(args: { email: string; password: string }): Promise<void> {
    try {
      const { email, password } = args

      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw new Error('Failed to sign in')
    }
  }

  async signUp(args: { email: string; password: string }): Promise<string> {
    try {
      const { email, password } = args

      const user = await createUserWithEmailAndPassword(auth, email, password)

      return user.user.uid
    } catch (error) {
      throw new Error('Failed to sign up')
    }
  }

  async signOut(): Promise<void> {
    try {
      await auth.signOut()
    } catch (error) {
      throw new Error('Failed to sign out')
    }
  }
  async sendEmailVerification(): Promise<boolean> {
    try {
      const currentUser = auth.currentUser

      if (!currentUser) {
        throw new Error('No user signed in')
      }
      await sendEmailVerification(currentUser)
      return true
    } catch (error) {
      throw new Error('Failed to send email verification')
    }
  }

  async sendPasswordResetEmail(args: { email: string }): Promise<boolean> {
    try {
      const { email } = args

      await sendPasswordResetEmail(auth, email)
      return true
    } catch (error) {
      throw new Error('Failed to send password reset email')
    }
  }
  async resendEmailVerification(): Promise<boolean> {
    try {
      const currentUser = auth.currentUser

      if (!currentUser) {
        throw new Error('No user signed in')
      }
      await sendEmailVerification(currentUser)
      return true
    } catch (error) {
      throw new Error('Failed to resend email verification')
    }
  }

  async checkEmailVerification(): Promise<boolean> {
    try {
      const currentUser = auth.currentUser

      if (!currentUser) {
        throw new Error('No user signed in')
      }
      return currentUser.emailVerified
    } catch (error) {
      throw new Error('Failed to check email verification')
    }
  }
}
