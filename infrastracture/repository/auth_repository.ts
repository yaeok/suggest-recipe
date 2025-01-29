export interface AuthRepository {
  signIn(args: { email: string; password: string }): Promise<void>
  signUp(args: { email: string; password: string }): Promise<string>
  signOut(): Promise<void>

  sendEmailVerification(): Promise<boolean>
  sendPasswordResetEmail(args: { email: string }): Promise<boolean>
  resendEmailVerification(): Promise<boolean>

  checkEmailVerification(): Promise<boolean>
}
