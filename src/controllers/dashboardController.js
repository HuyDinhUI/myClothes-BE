import { StatusCodes } from "http-status-codes";
import { User } from "../models/User.js";

const getUserInfo = async (req, res) =>{
    try{
        const userId = req.jwtDecoded.id

        const user = await User.findById(userId).select('-passwordHash')

        if (!user){
            res.status(404).json({message:"This user is not existing"})
        }

        res.status(200).json(user)
        
    } catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

export const dashboardController ={
    getUserInfo
}