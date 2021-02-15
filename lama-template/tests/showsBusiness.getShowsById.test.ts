import { IdGenerator } from "../src/business/services/IdGenerator";
import { ShowsBusiness } from "../src/business/ShowsBusiness";

const validatorToken = jest.fn((input: any): any => {
  return { id: "id", role: "ADMIN" };
});


describe("Testing createShow Business", () => {
  const idGenerator = { generate: jest.fn(() => "bananinha") } as IdGenerator
  const showsDatabase = {getShowsByDay: jest.fn()} as any;
  const authenticator = {getData: validatorToken} as any
  
  const showsBusiness: ShowsBusiness = new ShowsBusiness(
    idGenerator,
    showsDatabase,
    authenticator
    )
    
    test("Should return Input Error on week day", async () => {
    expect.assertions(2)
    try {

      const week_day: string = "quinta"

      await showsBusiness.getShowsByDay(week_day, validatorToken as any)

    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toEqual("week day must be 'sexta' or 'sábado' or 'domingo'")
    }
  })


})