import { makeSignUpValidation } from './signup-validations'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { RequireFieldValidation } from '../../presentation/helpers/validators/require-field-validation'
import { Validation } from '../../presentation/helpers/validators/validation'

jest.mock('../../presentation/helpers/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call validationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequireFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
