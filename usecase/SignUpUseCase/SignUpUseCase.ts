import { User } from '@/domain/User'
import { SystemErrorException } from '@/infrastracture/exception/SystemErrorException'
import { AuthRepository } from '@/infrastracture/repository/auth_repository'
import { UserRepository } from '@/infrastracture/repository/user_repository'
import { AuthenticationService } from '@/infrastracture/service/firebase/auth/authentication_service'
import { FirebaseAuthException } from '@/infrastracture/service/firebase/exception/FirebaseAuthException'
import { FirestoreUserService } from '@/infrastracture/service/firebase/firestore/firestore_user_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

interface SignUpUseCaseInput extends UseCaseInput {
  email: string
  password: string
}

interface SignUpUseCaseOutput extends UseCaseOutput {
  result: boolean
}

export class SignUpUseCase
  implements UseCase<SignUpUseCaseInput, Promise<SignUpUseCaseOutput>>
{
  private authRepository: AuthRepository
  private userRepository: UserRepository

  constructor() {
    this.authRepository = new AuthenticationService()
    this.userRepository = new FirestoreUserService()
  }

  async execute(input: SignUpUseCaseInput): Promise<SignUpUseCaseOutput> {
    try {
      const { email, password } = input

      const uid = await this.authRepository.signUp({ email, password })

      const user = new User({
        id: uid,
        email: email,
        createdAt: new Date(),
      })

      await this.userRepository.create({ user })

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
