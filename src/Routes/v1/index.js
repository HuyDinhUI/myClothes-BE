import express from "express"
import {StatusCodes} from 'http-status-codes'
import {userRouters} from './UserRouters.js'

const router = express.Router()

router.get('/status',(req,res)=>{
    res.status(StatusCodes.OK).json({message: 'APIs V1 are ready to use'})
})

router.use('/users',userRouters)

export const APIs_v1 = router