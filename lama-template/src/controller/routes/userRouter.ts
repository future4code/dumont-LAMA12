import express from "express";
import { UserController } from "../UserController";
import { BandController } from "../BandController"


export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
