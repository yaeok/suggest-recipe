import { AuthRepository } from '@/infrastracture/repository/auth_repository'
import { AuthenticationService } from '@/infrastracture/service/firebase/auth/authentication_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'
import { SystemErrorException } from '@/infrastracture/exception/SystemErrorException'
import { FirebaseAuthException } from '@/infrastracture/service/firebase/exception/FirebaseAuthException'

type ResendEmailVerificationUseCaseInput = UseCaseInput

interface ResendEmailVerificationUseCaseOutput extends UseCaseOutput {
  result: boolean
}

export class ResendEmailVerificationUseCase
  implements
    UseCase<
      ResendEmailVerificationUseCaseInput,
      Promise<ResendEmailVerificationUseCaseOutput>
    >
{
  private className = 'ResendEmailVerificationUseCase'
  private authRepository: AuthRepository

  constructor() {
    this.authRepository = new AuthenticationService()
  }

  async execute(): Promise<ResendEmailVerificationUseCaseOutput> {
    try {
      const response = await this.authRepository.resendEmailVerification()
      return { result: response }
    } catch (error) {
      console.error(`${this.className} error:`, error)
      if (error instanceof FirebaseAuthException) {
        throw new FirebaseAuthException(error.message, error.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }
}
