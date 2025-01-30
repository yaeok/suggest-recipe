// FirebaseAuthのカスタム例外クラス
export class FirebaseAuthException extends Error {
  code: string

  constructor(message: string, code: string) {
    super(message)
    this.code = code
    this.name = 'FirebaseAuthException'
  }
}

/** firebaseのエラー */
type FirebaseError = {
  code: string
  message: string
  name: string
}

// firebaseのエラーかどうかを判定する
export const isFirebaseError = (e: Error): e is FirebaseError => {
  return 'code' in e && 'message' in e
}
