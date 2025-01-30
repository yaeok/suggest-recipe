// システムエラーの場合の例外
export class GenerateLimitException extends Error {
  constructor(message?: string) {
    super(message || '生成回数の上限に達しました。')
    this.name = 'GenerateLimitException'
  }
}
