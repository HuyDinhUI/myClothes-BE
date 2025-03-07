import { StatusCodes } from "http-status-codes";
import { JwtProvider } from "../providers/JwtProvider.js";
import ms from "ms";

const MOCK_DATABASE = {
  USER: {
    ID: "huydinh-id-12345",
    USERNAME: "huydinh",
    PASSWORD: "huydinh@123",
  },
};

const ACCESS_TOKEN_SECRET_SIGNATURE = "KBgJwUETt4HeVD05WaXXI9V3JnwCVP";
const REFRESH_TOKEN_SECRET_SIGNATURE = "fcCjhnpeopVn2Hg1jG75MUi62051yL";

const login = async (req, res) => {
  try {
    if (
      req.body.username !== MOCK_DATABASE.USER.USERNAME ||
      req.body.password !== MOCK_DATABASE.USER.PASSWORD
    ) {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Your username or password is incorrect" });
      return;
    }

    const userInfo = {
      id:MOCK_DATABASE.USER.ID,
      username:MOCK_DATABASE.USER.USERNAME,
      
    }

    const accessToken = await JwtProvider.generateToken(
      userInfo,
      ACCESS_TOKEN_SECRET_SIGNATURE,
      '1h'
    )

    const refreshToken = await JwtProvider.generateToken(
      userInfo,
      REFRESH_TOKEN_SECRET_SIGNATURE,
      '14 days'
    )

    res.cookie('accessToken',accessToken,{
      httpOnly: true,
      secure: true,
      sameSite:'none',
      maxAge:ms('14 days')
    })

    res.cookie('refresh',refreshToken,{
      httpOnly: true,
      secure: true,
      sameSite:'none',
      maxAge:ms('14 days')
    })

    res.status(StatusCodes.OK).json({
      ...userInfo, accessToken, refreshToken
    })

    
    
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const logout = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({ message: "Logout API success" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const refreshToken = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({ message: "Refresh Token API success" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const userController = {
  login,
  logout,
  refreshToken,
};
