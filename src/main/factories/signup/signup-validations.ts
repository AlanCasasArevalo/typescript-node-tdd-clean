import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { RequireFieldValidation } from '../../../presentation/helpers/validators/require-field-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { CompareFieldValidation } from '../../../presentation/helpers/validators/compare-field-validation'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequireFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}