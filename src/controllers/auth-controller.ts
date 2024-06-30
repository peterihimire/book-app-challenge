import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { foundUser, createUser } from "../repositories/user-repository";

dotenv.config();

// @route POST api/auth/register
// @desc Regiser into account
// @access Public
export const register: RequestHandler = async (req, res, next) => {
  const { fullname, email } = req.body;
  const original_password = req.body.password;

  try {
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
    const hashed_password = await bcrypt.hash(original_password, salt);

    const payload = {
      fullname: fullname,
      email: email,
      password: hashed_password,
    };

    const created_user = await createUser(payload);
    const { id, password, ...others } = created_user;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Account created!.",
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

    const { id, password, ...others } = found_user;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "You are logged in",
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
export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(new BaseError("Logout error!", httpStatusCodes.UNAUTHORIZED));
    }

    res.status(200).json({
      status: "success",
      msg: "Logout successful!",
    });
  });
};
