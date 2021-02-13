import express from "express";
import { BandController } from "../BandController"


export const bandRouter = express.Router();

const bandController = new BandController();

bandRouter.post("/addband", bandController.signupBand);
bandRouter.get("/banddetails",bandController.findBand)