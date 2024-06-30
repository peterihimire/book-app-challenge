import { RequestHandler } from "express";
import dotenv from "dotenv";
import { verify } from "jsonwebtoken";
import BaseError from "../utils/base-error";
import { httpStatusCodes } from "../utils/http-status-codes";

dotenv.config();

interface JwtPayload {
  id: string;
  email: string;
  password: string;
  // Add other fields that your JWT payload contains
}

export const verifyToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    verify(token, process.env.JWT_KEY as string, (err, decoded) => {
      if (err)
        return res
          .status(httpStatusCodes.FORBIDDEN)
          .json("Expired or invalid token!");
      req.user = decoded as JwtPayload;
      console.log(req.user);
      next();
    });
  } else {
    return res
      .status(httpStatusCodes.UNAUTHORIZED)
      .json("You are not authenticated!");
  }
};

// AUTHENTICATED USER
export const verifyTokenAndAuthorization: RequestHandler = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req?.user?.id === req.params.userId) {
      next();
    } else {
      return next(
        new BaseError(
          "You are not allowed to perform this operation!",
          httpStatusCodes.UNAUTHORIZED
        )
      );
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
};
