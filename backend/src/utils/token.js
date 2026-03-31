import jwt from "jsonwebtoken";
import crypto from "crypto";
// Generate Access Token

export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN, { expiresIn: "15m" });
};
// Generate Refresh Token
export const generateRefereshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN, {
    expiresIn: "7d",
  });
};
