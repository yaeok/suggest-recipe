export class RecipeDTO {
  // レシピID
  id: string
  // 料理名
  title: string
  // お気に入り
  favorite: boolean
  // 人数
  serves: number
  // 作成日
  createdAt: Date

  constructor(args: {
    id: string
    title: string
    favorite: boolean
    serves: number
    createdAt: Date
  }) {
    const { id, title, favorite, serves, createdAt } = args
    this.id = id
    this.title = title
    this.favorite = favorite
    this.serves = serves
    this.createdAt = createdAt
  }
}
