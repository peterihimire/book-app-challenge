const { verify } = require("jsonwebtoken");
const httpStatusCodes = require("./http-status-codes");
const HttpError = require("./http-error");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    verify(token, process.env.JWT_KEY, (err, user) => {
      if (err)
        return res
          .status(httpStatusCodes.FORBIDDEN)
          .json("Expired or invalid token!");
      req.user = user;
      console.log(req.user);
      next();
    });
  } else {
    return res
      .status(httpStatusCodes.UNAUTHORIZED)
      .json("You are not authenticated!");
  }
};

// ADMINS AND AUTHENTICATED USER
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      next();
    } else {
      return next(
        new HttpError(
          "You are not allowed to perform this operation!",
          httpStatusCodes.UNAUTHORIZED
        )
      );
    }
  });
};

// ONLY ADMINS
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(
        new HttpError(
          "Only Admins are allowed to perform this operation!",
          httpStatusCodes.UNAUTHORIZED
        )
      );
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
