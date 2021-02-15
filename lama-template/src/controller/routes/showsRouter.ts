import express from "express";
import { ShowsController } from "../ShowsController";
import { userRouter } from "./userRouter";

export const showsRouter = express.Router()

const showsController = new ShowsController()

showsRouter.post("/newShow", showsController.createShow)
showsRouter.get("/:weekDay", showsController.getShowsByDay)