import { StatusCodes } from "http-status-codes"
import { JwtProvider } from "../providers/JwtProvider.js"

const isAuthozied = async (req, res, next)=>{
    const accessTokenFromCookie = req.cookies?.accessToken
    console.log('accessTokenFromCookie: ',accessTokenFromCookie)
    if (!accessTokenFromCookie){
        res.status(StatusCodes.UNAUTHORIZED).json({message: 'Unauthorized! Please Login'})
        return
    }

    try{
        const accessTokenDecoded = await JwtProvider.verifyToken(
            accessTokenFromCookie,
            'KBgJwUETt4HeVD05WaXXI9V3JnwCVP'
        )

        req.jwtDecoded = accessTokenDecoded
        next()
    } 
    catch (error){
        console.log('Error from authMidleware: ',error)

        if (error.message?.includes('jwt expired')){
            res.status(StatusCodes.GONE).json({message: 'Need to refresh token'})
            return
        }

        res.status(StatusCodes.UNAUTHORIZED).json({message: 'Unauthorized! Please Login'})
    }

}

export const authMiddleware = {
    isAuthozied
}