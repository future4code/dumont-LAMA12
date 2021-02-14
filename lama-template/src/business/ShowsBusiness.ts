import { ShowsDatabase } from "../data/ShowsDatabase";
import { ShowsInputDTO } from "./entities/Shows";
import { CustomError } from "./error/CustomError";
import { Authenticator } from "./services/Authenticator";
import { IdGenerator } from "./services/IdGenerator";

export class ShowsBusiness {
  
  constructor(
    private idGenerator: IdGenerator,
    private showsDatabase: ShowsDatabase,
    private authenticator: Authenticator
  ) { }

  async createShow(show: ShowsInputDTO, token: string) {
    try {
      const userRole = this.authenticator.getData(token).role
      if (!token || userRole !== "ADMIN") {
        throw new CustomError(501, "User unauthorized!")
      }

      if (show.start_time%1 !== 0 || show.end_time%1 !== 0) {
        throw new CustomError(422, "start time and end time must be a round hour")
      }

      if(show.start_time > 22 || show.start_time < 8) {
        throw new CustomError(422, "start time must be from 8h to 22h")
      }

      if(show.end_time > 23 || show.end_time < 9) {
        throw new CustomError(422, "end time must be from 9h to 23h")
      }

      if(show.week_day !== 'sexta' &&
      show.week_day !== 'sábado'&&
      show.week_day !== 'domingo') {
        throw new CustomError(422, "week day must be 'sexta' or 'sábado' or 'domingo'")
      }

      const showsList = await this.showsDatabase.getShowsByDay(show.week_day)

      for (let showOfList of showsList) {
        if (!(showOfList.startTime <= show.start_time) && !(showOfList.endTime >= show.end_time)) {
          throw new CustomError(422, "Another show on this time")
        }
      }

      const id = this.idGenerator.generate()
  
      await this.showsDatabase.createShow(
        id,
        show.week_day,
        show.start_time,
        show.end_time,
        show.band_id
      )
    } catch (error) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async getShowsByDay(week_day: string, token: string) {
    try {
      const userRole = this.authenticator.getData(token).role
      if (!token || !userRole) {
        throw new CustomError(501, "User unauthorized!")
      }

      if(week_day !== 'sexta' &&
      week_day !== 'sábado'&&
      week_day !== 'domingo') {
        throw new CustomError(422, "week day must be 'sexta' or 'sábado' or 'domingo'")
      }

      const result = await this.showsDatabase.getShowsByDay(week_day)

      return result
    } catch (error) {
      throw new CustomError(error.statusCode, error.message)
    }
  }
}