import express from 'express'
import {dashboardController} from '../../controllers/dashboardController.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const Router = express.Router()

Router.route('/access')
.get(authMiddleware.isAuthozied,dashboardController.access)

export const dashboardRoute = Router