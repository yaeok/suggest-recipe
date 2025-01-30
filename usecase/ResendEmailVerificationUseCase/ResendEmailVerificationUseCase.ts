import { AuthRepository } from '@/infrastracture/repository/auth_repository'
import { AuthenticationService } from '@/infrastracture/service/firebase/auth/authentication_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

interface ResendEmailVerificationUseCaseInput extends UseCaseInput {}

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
  private authRepository: AuthRepository

  constructor() {
    this.authRepository = new AuthenticationService()
  }

  async execute(): Promise<ResendEmailVerificationUseCaseOutput> {
    try {
      const response = await this.authRepository.resendEmailVerification()
      return { result: response }
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
