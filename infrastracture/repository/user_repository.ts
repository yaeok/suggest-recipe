import { User } from '@/domain/User'

import { UserDTO } from '../data/UserDTO'

export interface UserRepository {
  findById(args: { id: string }): Promise<UserDTO>
  create(args: { user: User }): Promise<UserDTO>
  update(args: { user: User }): Promise<void>
  delete(args: { id: string }): Promise<void>
}
