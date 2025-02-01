export type UseCaseInput = object

export type UseCaseOutput = object

export interface UseCase<UseCaseInput, UseCaseOutput> {
  execute(input: UseCaseInput): UseCaseOutput
}
