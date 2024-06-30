import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
import dotenv from "dotenv";
import { foundUser } from "../repositories/user-repository";

dotenv.config();

// @route POST api/users/acct_info
// @desc To get user details
// @access Public
export const getUserInfo: RequestHandler = async (req, res, next) => {
  const { user } = req.session;

  try {
    if (!user) {
      return next(
        new BaseError(
          "User is not authenticated.",
          httpStatusCodes.UNAUTHORIZED
        )
      );
    }

    const found_user = await foundUser(user?.email!);

    if (!found_user) {
      return next(
        new BaseError("User does not exist.", httpStatusCodes.NOT_FOUND)
      );
    }

    const { id, password, createdAt, updatedAt, ...others } = found_user;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "User info!",
      data: { ...others },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
