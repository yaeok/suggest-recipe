// ユーザの認証情報が取得できなかった場合の例外
export class UserNotFoundException extends Error {
  constructor(message?: string) {
    super(message || '認証情報が取得できませんでした')
    this.name = 'UserNotFoundException'
  }
}
