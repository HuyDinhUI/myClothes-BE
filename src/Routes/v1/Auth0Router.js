import express from 'express'
import Auth0checkJWT from '../../middlewares/auth0Middleware.js'

const Router = express.Router()

Router.route('/').get(Auth0checkJWT)

export const Auth0Router = Router