import { AuthRepository } from '@/infrastracture/repository/auth_repository'
import { AuthenticationService } from '@/infrastracture/service/firebase/auth/authentication_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

interface SignOutUseCaseInput extends UseCaseInput {}

interface SignOutUseCaseOutput extends UseCaseOutput {
  result: boolean
}

export class SignOutUseCase
  implements UseCase<SignOutUseCaseInput, Promise<SignOutUseCaseOutput>>
{
  private repository: AuthRepository

  constructor() {
    this.repository = new AuthenticationService()
  }
  async execute(): Promise<SignOutUseCaseOutput> {
    try {
      await this.repository.signOut()

      return { result: true }
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
