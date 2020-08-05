import { RequireFieldValidation } from './require-field-validation'
import { MissingParamError } from '../../errors'

describe('Required Field Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequireFieldValidation('field')
    const error = sut.validate({
      name: 'any_name'
    })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should no return if validation success', () => {
    const sut = new RequireFieldValidation('field')
    const error = sut.validate({
      field: 'any_name'
    })
    expect(error).toBeFalsy()
  })
})
