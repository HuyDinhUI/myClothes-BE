import express from 'express'
import {dashboardController} from '../../controllers/dashboardController.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const Router = express.Router()

Router.route('/info')
.get(authMiddleware.isAuthozied,dashboardController.getUserInfo)
Router.route('/update')
.put(authMiddleware.isAuthozied,dashboardController.updateUserInfo)
export const dashboardRoute = Router