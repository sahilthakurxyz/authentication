import mongoose from "mongoose";
import { string } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      minLength: [3, "Name should be more than 3 characters"],
      maxLength: [25, "Name  should be less than 25 characters "],
    },
    email: {
      type: String,
      required: [true, "Please Enter Email"],
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email Invalid Format to database"],
    },
    password: {
      type: String,
      required: [true, "Enter Password"],
      minLength: [8, "Password should be at least 8 characters"],
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    avatar: {
      public_id: {
        type: string,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  return (this.password = await bcrypt.hash(this.password, 12));
});
UserSchema.methods.generateToken = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
export const User = mongoose.model("User", UserSchema);
