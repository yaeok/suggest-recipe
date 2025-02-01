import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import { SystemErrorException } from '@/infrastracture/exception/SystemErrorException'
import { UserNotFoundException } from '@/infrastracture/exception/UserNotFoundException'
import { AuthRepository } from '@/infrastracture/repository/auth_repository'

import { auth } from '../config'
import {
  FirebaseAuthException,
  isFirebaseError,
} from '../exception/FirebaseAuthException'

export class AuthenticationService implements AuthRepository {
  async signIn(args: { email: string; password: string }): Promise<void> {
    try {
      const { email, password } = args

      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      if (isFirebaseError(error)) {
        const result = this.handleFirebaseAuthError(error)
        throw new FirebaseAuthException(result.message, result.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }

  async signUp(args: { email: string; password: string }): Promise<string> {
    try {
      const { email, password } = args

      const user = await createUserWithEmailAndPassword(auth, email, password)

      this.sendEmailVerification()

      return user.user.uid
    } catch (error) {
      if (isFirebaseError(error)) {
        const result = this.handleFirebaseAuthError(error)
        throw new FirebaseAuthException(result.message, result.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }

  async signOut(): Promise<void> {
    try {
      await auth.signOut()
    } catch (error) {
      if (isFirebaseError(error)) {
        const result = this.handleFirebaseAuthError(error)
        throw new FirebaseAuthException(result.message, result.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }
  async sendEmailVerification(): Promise<boolean> {
    try {
      const currentUser = auth.currentUser

      if (!currentUser) {
        throw new UserNotFoundException()
      }
      await sendEmailVerification(currentUser)
      return true
    } catch (error) {
      if (isFirebaseError(error)) {
        const result = this.handleFirebaseAuthError(error)
        throw new FirebaseAuthException(result.message, result.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }

  async sendPasswordResetEmail(args: { email: string }): Promise<boolean> {
    try {
      const { email } = args

      await sendPasswordResetEmail(auth, email)
      return true
    } catch (error) {
      if (isFirebaseError(error)) {
        const result = this.handleFirebaseAuthError(error)
        throw new FirebaseAuthException(result.message, result.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }
  async resendEmailVerification(): Promise<boolean> {
    try {
      const currentUser = auth.currentUser

      if (!currentUser) {
        throw new UserNotFoundException()
      }
      await sendEmailVerification(currentUser)
      return true
    } catch (error) {
      if (isFirebaseError(error)) {
        const result = this.handleFirebaseAuthError(error)
        throw new FirebaseAuthException(result.message, result.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }

  async checkEmailVerification(): Promise<boolean> {
    try {
      const currentUser = auth.currentUser

      if (!currentUser) {
        throw new UserNotFoundException()
      }
      await currentUser.reload()
      return currentUser.emailVerified
    } catch (error) {
      if (isFirebaseError(error)) {
        const result = this.handleFirebaseAuthError(error)
        throw new FirebaseAuthException(result.message, result.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }

  /**
   * Firebaseのエラーハンドリングを行う
   * @param error エラーオブジェクト
   */
  private handleFirebaseAuthError(error): {
    message: string
    code: string
  } {
    let message
    switch (error.code) {
      case 'auth/user-not-found':
        message = '認証情報が見つかりません'
        break
      case 'auth/wrong-password':
        message = 'パスワードが違います'
        break
      case 'auth/user-disabled':
        message = '無効なアカウントです'
        break
      case 'auth/too-many-requests':
        message = 'リクエストが多すぎます。後ほど再試行してください'
        break
      case 'auth/invalid-email':
        message = '無効なメールアドレスです'
        break
      case 'auth/email-already-in-use':
        message = '既に登録されたメールアドレスです'
        break
      default:
        message = 'ログインに失敗しました'
        break
    }
    return {
      message,
      code: error.code,
    }
  }
}
