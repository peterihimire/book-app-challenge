import { RequestHandler, Router } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";

const router = Router();

const apiDocFunction: RequestHandler = (req, res, next) => {
  try {
    res.redirect("https://documenter.getpostman.com/view/12340633/2sA3duGDGB");
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

router.get("", apiDocFunction);

export default router;
