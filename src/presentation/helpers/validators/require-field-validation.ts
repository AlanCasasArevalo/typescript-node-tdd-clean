import { Validation } from './validation'
import { MissingParamError } from '../../errors'
export class RequireFieldValidation implements Validation {
  private readonly fieldName: string
  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error {
    if (!input) {
      return new MissingParamError(this.fieldName)
    }
  }
}
