import { StatusCodes } from "http-status-codes";

const access = async (req, res) =>{
    try{
        // const user ={username: "huydinh"}
        console.log('req.jwtDecoded:',req.jwtDecoded)
        const userInfo ={
            id:req.jwtDecoded.id,
            username: req.jwtDecoded.username
        }
        res.status(StatusCodes.OK).json(userInfo)
    } catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

export const dashboardController ={
    access
}