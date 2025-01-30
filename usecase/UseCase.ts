export interface UseCaseInput {}

export interface UseCaseOutput {}

export interface UseCase<UseCaseInput, UseCaseOutput> {
  execute(input: UseCaseInput): UseCaseOutput
}
