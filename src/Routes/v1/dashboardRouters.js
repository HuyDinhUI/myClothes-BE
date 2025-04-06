import express from 'express'
import {dashboardController} from '../../controllers/dashboardController.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const Router = express.Router()

Router.route('/info')
.get(authMiddleware.isAuthozied,dashboardController.getUserInfo)

export const dashboardRoute = Router