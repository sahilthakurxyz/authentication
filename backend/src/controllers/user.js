import cloudinary from "../config/cloudinary.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { AsyncHandler } from "../middlewares/AsyncHandler.js";
import { User } from "../schema/authSchema.js";
import { CustomError } from "../utils/CustomError.js";
import { sendToken } from "../utils/generateToken.js";
import { generateAccessToken, generateRefereshToken } from "../utils/token.js";

export const loginUser = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || user === null) {
    return next(new CustomError(404, "Invalid credentials"));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched)
    return next(new CustomError(401, "Login not successful"));
  // sendToken(200, user, res);

  const accessToken = generateAccessToken(user?._id);
  const refreshToken = generateRefereshToken(user?._id);
  const generateHashtoken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  user.refreshToken = generateHashtoken;

  await user.save();
  res
    .cookie("refreshToken", refreshToken, {
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
    .status(200)
    .json({
      success: true,
      auth: true,
      message: "login successfully",
    });
});
export const signInUser = AsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new CustomError(400, "Missing required fields"));
  }
  let avatarImgUrl = {
    public_id: "default_id",
    url: "default_url",
  };
  if (req.files && req.files.avatar) {
    const cloud = await cloudinary.uploader.upload(
      req.files.avatar.tempFilePath,
      {
        folder: "users",
        transformation: [
          { width: 600, height: 600, crop: "fill", gravity: "auto" },
          { fetch_format: "auto", quality: "auto" },
        ],
      },
    );
    avatarImgUrl = {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    };
  }
  const alreadyExist = await User.findOne({ email });
  if (alreadyExist) {
    return next(new CustomError(409, "You're doing something wrong"));
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: avatarImgUrl,
  });
  const accessToken = generateAccessToken(user?._id);
  const refreshToken = generateRefereshToken(user?._id);

  user.refreshToken = refreshToken;
  await user.save();
  res
    .cookie("refreshToken", refreshToken, {
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
    .status(200)
    .json({
      success: true,
      auth: true,
      message: "login successfully",
    });
});
export const loadUser = AsyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.user._id }).select("-password");
  // const refreshToken = req.cookies.refreshToken;
  // console.log(refreshToken, "refre");
  // const decodedId = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
  // console.log(decodedId, "decoded id");
  // const hashedToken = crypto
  //   .createHash("sha256")
  //   .update(refreshToken)
  //   .digest("hex");
  // console.log(hashedToken, "hashtoken");
  // const dbToken = await User.findById(decodedId.userId);
  // console.log(dbToken.refreshToken === hashedToken, "db token");
  res.status(200).json({
    success: true,
    user,
    auth: true,
    message: "load user successfully",
  });
});

// logout

export const logoutUser = AsyncHandler(async (req, res) => {
  try {
    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      });
    res.status(200).json({
      success: true,
      auth: false,
      message: "logout successfully",
    });
  } catch (err) {
    console.log(err, "error");
    res.status(500).json({
      success: false,
      message: "logout failed",
    });
  }
});
