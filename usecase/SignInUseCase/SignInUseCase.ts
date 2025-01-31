import { SystemErrorException } from '@/infrastracture/exception/SystemErrorException'
import { AuthRepository } from '@/infrastracture/repository/auth_repository'
import { AuthenticationService } from '@/infrastracture/service/firebase/auth/authentication_service'
import { FirebaseAuthException } from '@/infrastracture/service/firebase/exception/FirebaseAuthException'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

interface SignInUseCaseInput extends UseCaseInput {
  email: string
  password: string
}

interface SignInUseCaseOutput extends UseCaseOutput {
  result: boolean
}

export class SignInUseCase
  implements UseCase<SignInUseCaseInput, Promise<SignInUseCaseOutput>>
{
  private repository: AuthRepository

  constructor() {
    this.repository = new AuthenticationService()
  }

  async execute(input: SignInUseCaseInput): Promise<SignInUseCaseOutput> {
    try {
      const { email, password } = input

      await this.repository.signIn({ email, password })

      return { result: true }
    } catch (error: any) {
      if (error instanceof FirebaseAuthException) {
        throw new FirebaseAuthException(error.message, error.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }
}
