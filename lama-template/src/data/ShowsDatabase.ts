import { Shows } from "../business/entities/Shows";
import { CustomError } from "../business/error/CustomError";
import { BaseDatabase } from "./BaseDatabase";

export class ShowsDatabase extends BaseDatabase{

  private static TABLE_NAME = "shows";

  private static toShowsModel(show: any): Shows {
    return new Shows (
      show.id,
      show.week_day,
      show.start_time,
      show.end_time,
      show.band_id
    )
  }

  public async createShow(
    id: string,
    week_day: string,
    start_time: number,
    end_time: number,
    band_id: string
  ) : Promise<void> {
    try {
      await BaseDatabase.connection(ShowsDatabase.TABLE_NAME)
        .insert({
          id,
          week_day,
          start_time,
          end_time,
          band_id
        })
    } catch (error) {
      throw new CustomError(500, "An unexpected error ocurred");
    }
  }

  public async getShowsByDay(
    week_day: string
  ): Promise<Shows[]> {
    try {
      const result = await BaseDatabase.connection(ShowsDatabase.TABLE_NAME)
        .select("*")
        .where("week_day", `${week_day}`)
      
      return result
    } catch (error) {
      throw new CustomError(500, "An unexpected error ocurred");
    }
  }
}