import { MongoHelper } from '../helpers/mongo-helper'

describe('ACCOUNT MONGO REPOSITORY', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', () => {
    expect(true).toBeTruthy()
  })
})
