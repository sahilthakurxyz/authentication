import express from "express";
import {
  loadUser,
  loginUser,
  logoutUser,
  signInUser,
} from "../controllers/user.js";
import { validate } from "../middlewares/auth.authentication.js";
import { registerSchema } from "../validations/auth.validation.js";
import { isAuthenticated } from "../middlewares/user.authenticated.js";
import { refreshToken } from "../utils/refreshToken.js";

const router = express.Router();
router.route("/login").post(loginUser);
router.route("/register").post(validate(registerSchema), signInUser);
router.route("/loaduser").get(isAuthenticated, loadUser);
router.route("/refresh/token").get(refreshToken);
router.route("/me/logout").get(logoutUser);
export default router;
