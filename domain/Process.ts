export class Process {
  // id
  id: string
  // ステップ
  step: number
  // 作業内容
  description: string

  constructor(args: { id: string; step: number; description: string }) {
    const { id, step, description } = args
    this.id = id
    this.step = step
    this.description = description
  }
}
