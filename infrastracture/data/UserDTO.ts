export class UserDTO {
  id: string
  email: string
  createdAt: Date

  constructor(args: { id: string; email: string; createdAt: Date }) {
    const { id, email, createdAt } = args
    this.id = id
    this.email = email
    this.createdAt = createdAt
  }
}
