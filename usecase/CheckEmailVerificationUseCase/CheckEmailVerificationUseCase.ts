import { AuthRepository } from '@/infrastracture/repository/auth_repository'
import { AuthenticationService } from '@/infrastracture/service/firebase/auth/authentication_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'
import { SystemErrorException } from '@/infrastracture/exception/SystemErrorException'
import { FirebaseAuthException } from '@/infrastracture/service/firebase/exception/FirebaseAuthException'

type CheckEmailVerificationUseCaseInput = UseCaseInput

interface CheckEmailVerificationUseCaseOutput extends UseCaseOutput {
  result: boolean
}

export class CheckEmailVerificationUseCase
  implements
    UseCase<
      CheckEmailVerificationUseCaseInput,
      Promise<CheckEmailVerificationUseCaseOutput>
    >
{
  private className = 'CheckEmailVerificationUseCase'
  private authRepository: AuthRepository

  constructor() {
    this.authRepository = new AuthenticationService()
  }
  async execute(): Promise<CheckEmailVerificationUseCaseOutput> {
    try {
      const response = await this.authRepository.checkEmailVerification()
      return { result: response }
    } catch (error: any) {
      console.error(`${this.className} error:`, error)
      if (error instanceof FirebaseAuthException) {
        throw new FirebaseAuthException(error.message, error.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }
}
