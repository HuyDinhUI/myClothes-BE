import express from "express";
import { StatusCodes } from "http-status-codes";
import { userValidation } from "../../validations/userValidation.js";
import { userController } from "../../controllers/userController.js";
const Router = express.Router();

Router.route("/signup").post(userValidation.createNew,userController.signup)

// API login
Router.route("/login").post(userValidation.createNew,userController.login);

// API logout
Router.route("/logout").delete(userController.logout);

//API Resfresh Token
Router.route("/resfresh_token").put(userController.refreshToken);

export const userRoute = Router;
