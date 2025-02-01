import { AuthRepository } from '@/infrastracture/repository/auth_repository'
import { AuthenticationService } from '@/infrastracture/service/firebase/auth/authentication_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'
import { FirebaseAuthException } from '@/infrastracture/service/firebase/exception/FirebaseAuthException'
import { SystemErrorException } from '@/infrastracture/exception/SystemErrorException'

type SignOutUseCaseInput = UseCaseInput

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
    } catch (error) {
      if (error instanceof FirebaseAuthException) {
        throw new FirebaseAuthException(error.message, error.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }
}
