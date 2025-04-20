import express from "express"
import {StatusCodes} from 'http-status-codes'
import {userRoute} from './UserRouters.js'
import {dashboardRoute} from './dashboardRouters.js'
import {productRouter} from './ProductsRouter.js'
import {Auth0Router} from './Auth0Router.js'
import { OauthRouter } from "./OAuthRouter.js"


const Router = express.Router()

Router.get('/status',(req,res)=>{
    res.status(StatusCodes.OK).json({message: 'APIs V1 are ready to use'})
})

Router.use('/users',userRoute)

Router.use('/dashboards',dashboardRoute)

Router.use('/products',productRouter)

Router.use('/auth0',Auth0Router,(req,res)=>{
    return res.json({ message: "This is a protected API. You are authenticated!" })
})

Router.use('/auth',OauthRouter)

export const APIs_v1 = Router