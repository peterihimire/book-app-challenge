import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { sign } from "jsonwebtoken";
import { validationResult } from "express-validator";
import { foundUser, registerUser } from "../repositories/auth-repository";

dotenv.config();

// @route POST api/auth/register
// @desc Regiser into account
// @access Public
export const register: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const found_user = await foundUser(email);

    if (found_user) {
      return next(
        new BaseError(
          "Account already exist, login instead!",
          httpStatusCodes.CONFLICT
        )
      );
    }

    const salt = await bcrypt.genSalt();
    const hashed_password = await bcrypt.hash(password, salt);

    const payload = {
      email: email,
      password: hashed_password,
    };

    const created_user = await registerUser(payload);

    if (!created_user) {
      throw new BaseError(
        "Failed to create user",
        httpStatusCodes.INTERNAL_SERVER
      );
    }
    const { id, password: hashedPassword, ...others } = created_user;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Signup successful!.",
      data: { ...others },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

// @route POST api/auth/login
// @desc Login into account
// @access Public
export const login: RequestHandler = async (req, res, next) => {
  const { email } = req.body;
  const original_password = req.body.password;

  try {
    const found_user = await foundUser(email);

    if (!found_user) {
      return next(
        new BaseError(
          "Error login in check credentials!",
          httpStatusCodes.CONFLICT
        )
      );
    }

    const hashedPassword = await bcrypt.compare(
      original_password,
      found_user.password
    );

    if (!hashedPassword) {
      return next(
        new BaseError(
          "Wrong password or username!",
          httpStatusCodes.UNAUTHORIZED
        )
      );
    }

    // JSON WEB TOKEN
    const JWT_KEY = process.env.JWT_KEY;
    if (!JWT_KEY) {
      throw new Error("JWT_KEY is not defined in the environment variables");
    }

    const token = sign(
      {
        id: found_user.id,
        email: found_user.email,
      },
      JWT_KEY,
      { expiresIn: "1h" }
    );

    // Set the token in an HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // because I'm working on localhost
      maxAge: 3600000,
    });

    const { id, password, ...others } = found_user;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Signin successful",
      data: { ...others },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

// @route POST api/auth/logout
// @desc Logout into account
// @access Private
export const logout: RequestHandler = async (req, res, next) => {
  res
    .clearCookie("token", {
      secure: false,
      sameSite: "lax",
    })
    .status(200)
    .json({
      status: "success",
      msg: "Signout successful.",
    });
};
