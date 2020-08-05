import { CompareFieldValidation } from './compare-field-validation'
import { InvalidParamError } from '../../errors'

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation('field', 'fieldToCompare')
}

describe('CompareFieldValidation Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_name',
      fieldToCompare: 'wrong_name'
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should no return if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_name',
      fieldToCompare: 'any_name'
    })
    expect(error).toBeFalsy()
  })
})
