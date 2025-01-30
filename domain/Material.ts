export class Material {
  // id
  id: string
  // 材料名
  name: string
  // 分量
  quantity: string

  constructor(args: { id: string; name: string; quantity: string }) {
    const { id, name, quantity } = args
    this.id = id
    this.name = name
    this.quantity = quantity
  }
}
