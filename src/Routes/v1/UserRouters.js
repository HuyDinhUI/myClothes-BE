import express from "express"
import {StatusCodes} from 'http-status-codes'
import {userValidation} from '../../validations/userValidation.js'
import {userController} from '../../controllers/userController.js'
const router = express.Router()

router.route('/')
    .get((req,res) => {
        res.status(StatusCodes.OK).json({GET:"Note: API get list user"})
    })
    .post(userValidation.createNew,userController.createNew)

export const userRouters = router