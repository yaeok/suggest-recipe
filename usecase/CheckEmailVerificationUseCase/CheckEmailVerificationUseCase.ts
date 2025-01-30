import { AuthRepository } from '@/infrastracture/repository/auth_repository'
import { AuthenticationService } from '@/infrastracture/service/firebase/auth/authentication_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

interface CheckEmailVerificationUseCaseInput extends UseCaseInput {}

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
  private authRepository: AuthRepository

  constructor() {
    this.authRepository = new AuthenticationService()
  }
  async execute(): Promise<CheckEmailVerificationUseCaseOutput> {
    try {
      const response = await this.authRepository.checkEmailVerification()
      return { result: response }
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
