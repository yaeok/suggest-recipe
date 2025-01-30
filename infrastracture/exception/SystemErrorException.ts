// システムエラーの場合の例外
export class SystemErrorException extends Error {
  constructor(message?: string) {
    super(message || 'システムエラーが発生しました。管理者へ連絡してください。')
    this.name = 'SystemErrorException'
  }
}
