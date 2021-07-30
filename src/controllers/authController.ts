import { Request, Response, NextFunction } from "express";
import { User } from "../models";
import { IUser } from "../../types";
import bcrypt from "bcryptjs";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body as IUser;

    const user = User.build({
      email,
      password,
      username,
    });

    const data = await user.save();

    res.status(201).json({
      success: true,
      user: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as IUser;
    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(404).json({
        success: false,
        error: "Cannot find user.",
      });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).json({
          success: true,
          jwtToken: "Niceee",
        });
      } else {
        res.status(404).json({
          success: true,
          message: "Invalid credentials.",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const forgotPasswordController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send("Forgot Password Route");
};

export const resetPasswordController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send("Reset Password Route");
};
