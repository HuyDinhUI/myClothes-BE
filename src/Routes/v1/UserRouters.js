import express from "express"
import {StatusCodes} from 'http-status-codes'

const router = express.Router()

router.route('/')
    .get((req,res) => {
        res.status(StatusCodes.OK).json({GET:"Note: API get list user"})
    })
    .post((req,res) =>{
        res.status(StatusCodes.CREATED).json({POST:"Note: API create new user"})
    })

export const userRouters = router