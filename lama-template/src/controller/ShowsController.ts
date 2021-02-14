import { Request, Response } from "express";
import { ShowsInputDTO } from "../business/entities/Shows";
import { Authenticator } from "../business/services/Authenticator";
import { IdGenerator } from "../business/services/IdGenerator";
import { ShowsBusiness } from "../business/ShowsBusiness";
import { ShowsDatabase } from "../data/ShowsDatabase";

const showsBusiness = new ShowsBusiness(
  new IdGenerator(),
  new ShowsDatabase(),
  new Authenticator()
)

export class ShowsController {
  async createShow(req: Request, res: Response) {
    try {
      const input: ShowsInputDTO = {
        week_day: req.body.weekDay,
        start_time: req.body.startTime,
        end_time: req.body.endTime,
        band_id: req.body.bandId
      }

      const token: string = req.headers.authorization as string

      await showsBusiness.createShow(input, token)

      res.status(200).send({message: "Show criado com sucesso!"})
    } catch (error) {
      res
        .status(error.statusCode || 400)
        .send({ error: error.message });
    }
  }

  async getShowsByDay(req: Request, res: Response) {
    try {
      const week_day = req.params.weekDay
      const token: string = req.headers.authorization as string

      const result = await showsBusiness.getShowsByDay(week_day, token)

      res.status(200).send({result: result})
    } catch (error) {
      res
        .status(error.statusCode || 400)
        .send({ error: error.message });
    }
  }
}