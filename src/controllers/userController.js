import { StatusCodes } from "http-status-codes";
import { JwtProvider } from "../providers/JwtProvider.js";
import ms from "ms";
import { User } from "../models/User.js";
import bcrybt from "bcryptjs";

const ACCESS_TOKEN_SECRET_SIGNATURE = "KBgJwUETt4HeVD05WaXXI9V3JnwCVP";
const REFRESH_TOKEN_SECRET_SIGNATURE = "fcCjhnpeopVn2Hg1jG75MUi62051yL";

const signup = async (req, res) => {
  const { username, email, password, comfirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email is existed" });
    }

    if (comfirmPassword !== password) {
      return res.status(400).json({ message: "Password is not match" });
    }

    const hashPassword = await bcrybt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashPassword,
      username,
    });

    const saved = await newUser.save();
    res.status(201).json({message: "Sign up success",data:saved});
  } catch {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email is not existing" });
    }

    const isMatchPassword = await bcrybt.compare(password, user.password);

    if (!isMatchPassword) {
      return res.status(400).json({ message: "Password is wrong" });
    }

    const userInfo = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const accessToken = await JwtProvider.generateToken(
      userInfo,
      ACCESS_TOKEN_SECRET_SIGNATURE,
      "1h"
    );

    const refreshToken = await JwtProvider.generateToken(
      userInfo,
      REFRESH_TOKEN_SECRET_SIGNATURE,
      "14 days"
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: ms("14 days"),
    });

    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: ms("14 days"),
    });

    res.status(StatusCodes.OK).json({
      message:"Log in success",
      ...userInfo,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.clearCookie("refresh", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(StatusCodes.OK).json({ message: "Logout success" });
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
  signup,
  login,
  logout,
  refreshToken,
};
