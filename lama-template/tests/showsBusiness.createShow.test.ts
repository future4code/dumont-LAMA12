import { ShowsInputDTO } from "../src/business/entities/Shows";
import { IdGenerator } from "../src/business/services/IdGenerator";
import { ShowsBusiness } from "../src/business/ShowsBusiness";

const validatorMockTrue = jest.fn((input: any): any => {
  return { isValid: true, errors: [] };
});

const validatorShowByDate = jest.fn(
  (weekDay: string, startTime: number, endTime: number): any => {
    return [{ show: "show" }];
  }
);

const validatorToken = jest.fn((input: any): any => {
  return { id: "id", role: "ADMIN" };
});

describe("Testing createShow Business", () => {
  const idGenerator = { generate: jest.fn(() => "bananinha") } as IdGenerator
  const showsDatabase = {createShow: jest.fn(),
  getShowsByDay: validatorShowByDate} as any;
  const authenticator = {getData: validatorToken} as any

  const showsBusiness: ShowsBusiness = new ShowsBusiness(
    idGenerator,
    showsDatabase,
    authenticator
  )

  test("Should return Input Error on week day", async () => {
    expect.assertions(2)
    try {

      const show: ShowsInputDTO = {
        week_day: "",//week day
        start_time: 8,//email
        end_time: 9,//password
        band_id: "bandid"//role
      }

      await showsBusiness.createShow(show, validatorMockTrue as any)

    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toEqual("week day must be 'sexta' or 'sábado' or 'domingo'")
    }
  })

  test("Should return Input Error on start time", async () => {
    expect.assertions(2)
    try {

      const show: ShowsInputDTO = {
        week_day: "sexta",//week day
        start_time: 4,//email
        end_time: 9,//password
        band_id: "bandid"//role
      }

      await showsBusiness.createShow(show, validatorMockTrue as any)

    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toEqual("start time must be from 8h to 22h")
    }
  })

  test("Should return Input Error on end time", async () => {
    expect.assertions(2)
    try {

      const show: ShowsInputDTO = {
        week_day: "sexta",//week day
        start_time: 8,//email
        end_time: 24,//password
        band_id: "bandid"//role
      }

      await showsBusiness.createShow(show, validatorMockTrue as any)

    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toEqual("end time must be from 9h to 23h")
    }
  })

  test("Should return Input fraction Error on start time", async () => {
    expect.assertions(2)
    try {

      const show: ShowsInputDTO = {
        week_day: "sexta",//week day
        start_time: 8.5,//email
        end_time: 23,//password
        band_id: "bandid"//role
      }

      await showsBusiness.createShow(show, validatorMockTrue as any)

    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toEqual("start time and end time must be a round hour")
    }
  })

  test("Should return Input fraction Error on end time", async () => {
    expect.assertions(2)
    try {

      const show: ShowsInputDTO = {
        week_day: "sexta",//week day
        start_time: 8,//email
        end_time: 22.5,//password
        band_id: "bandid"//role
      }

      await showsBusiness.createShow(show, validatorMockTrue as any)

    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toEqual("start time and end time must be a round hour")
    }
  })

  test("Should return Another Show scheduled", async () => {
    expect.assertions(2)
    try {

      const show: ShowsInputDTO = {
        week_day: "sexta",//week day
        start_time: 8,//email
        end_time: 11,//password
        band_id: "bandid"//role
      }

      await showsBusiness.createShow(show, validatorMockTrue as any)

    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toEqual("Another show on this time")
    }
  })
})