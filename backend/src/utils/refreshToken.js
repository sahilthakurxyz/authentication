import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../schema/authSchema.js";
import { generateAccessToken, generateRefereshToken } from "./token.js";
export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    // console.log(req.cookies, "cookies");
    if (!refreshToken || refreshToken === undefined)
      return res.status(401).json({
        errorcode: "SESSION_EXPIRED",
        message: "please Login or Signup",
      });
    const hashedToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    const decodedId = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const user = await User.findById(decodedId.userId).select("+refreshToken");
    // console.log(hashedToken, "hashtoken");
    // console.log(user.refreshToken, "database token");
    if (!user || user.refreshToken !== hashedToken) {
      return res.status(401).json({
        errorcode: "SESSION_EXPIRED",
        message: "athentication required",
      });
    }
    const accessToken = generateAccessToken(user?._id);
    const renewRefreshToken = generateRefereshToken(user?._id);
    const rotateRefreshToken = crypto
      .createHash("sha256")
      .update(renewRefreshToken)
      .digest("hex");

    await User.findByIdAndUpdate(user?.id, {
      refreshToken: rotateRefreshToken,
    });
    res
      .status(200)
      .cookie("refreshToken", renewRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      })
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
        path: "/",
      })
      .json({
        success: true,
      });
  } catch (error) {
    res.status(401).json({
      errorcode: "SESSION_EXPIRED",
      message: "login required",
    });
    console.log(error, "error in refresh token");
  }
};
