import { RequestHandler } from "express";
import dotenv from "dotenv";
import { verify } from "jsonwebtoken";
import BaseError from "../utils/base-error";
import { httpStatusCodes } from "../utils/http-status-codes";

dotenv.config();

interface JwtPayload {
  id: number;
  email: string;
}

export const verifyToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    verify(token, process.env.JWT_KEY as string, (err, decoded) => {
      if (err) {
        return next(
          new BaseError("Expired or invalid token!", httpStatusCodes.FORBIDDEN)
        );
      }

      req.user = decoded as JwtPayload;
      console.log(req.user);
      next();
    });
  } else {
    return next(
      new BaseError("You are not authenticated!", httpStatusCodes.UNAUTHORIZED)
    );
  }
};

// AUTHENTICATED USER
export const verifyTokenAndAuthorization: RequestHandler = (req, res, next) => {
  verifyToken(req, res, async () => {
    const user = req.user;

    if (!user?.email) {
      return next(
        new BaseError(
          "Not authorised to access resource, invalid or expired token!",
          httpStatusCodes.UNAUTHORIZED
        )
      );
    }

    next();
  });
};

// module.exports = {
//   verifyToken,
//   verifyTokenAndAuthorization,
// };
