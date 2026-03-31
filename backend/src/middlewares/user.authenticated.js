import jwt from "jsonwebtoken";
import { User } from "../schema/authSchema.js";
// New Method
export const isAuthenticated = async (req, res, next) => {
  try {
    // local token based
    // const token = req.headers.authorization.split(" ")[1];
    // secure and cookie based
    const token = req.cookies?.accessToken;
    if (!token)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    const decode = await jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = await User.findById(decode.userId);
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
// Old Method

// export const isAuthenticated = async (req, res, next) => {
//   try {
//     const token = req.headers?.authorization.split(" ")[1];
//     // if(!token){
//     //   return res.status(400)
//     // }
//     await jwt.verify(token, process.env.JWT_SECRET);
//     next();
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message:
//         err.name === "TokenExpiredError" ? "token expired" : "Invalid token ",
//     });
//   }
// };
