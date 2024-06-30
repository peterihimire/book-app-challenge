import { RequestHandler } from "express";
import moment from "moment";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
// import { foundAdmin } from "../repositories/admin-auth-repository";
import {
  foundAuthorById,
  foundAuthors,
  updateAuthorById,
  deleteAuthorById,
  createAuthor,
} from "../repositories/author-repository";

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const addAuthor: RequestHandler = async (req, res, next) => {
  const { name, bio, birthdate } = req.body;

  try {
    const payload = {
      name: name as string,
      birthdate: moment(birthdate as string).toDate(),
      bio: bio as string,
    };

    const createdAuthor = await createAuthor(payload);
    console.log("Created author yes...", createdAuthor);

    if (!createdAuthor) {
      throw new BaseError(
        "Failed to create author",
        httpStatusCodes.INTERNAL_SERVER
      );
    }

    const { id, createdAt, updatedAt, ...others } = createdAuthor;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Author Added!.",
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
// @access Private
export const getAuthors: RequestHandler = async (req, res, next) => {
  try {
    const authors = await foundAuthors();
    console.log("This are the found authors....", authors);

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Author List!.",
      data: authors,
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
// @access Private
export const getAuthor: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const author = await foundAuthorById(Number(id));
    console.log("This are the found author....", author);

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Author info!.",
      data: author,
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
// @access Private
export const updateAuthor: RequestHandler = async (req, res, next) => {
  // const { admin } = req.session;
  const { id } = req.params;

  const { name, bio, birthdate } = req.body;

  try {
    const foundAuthor = await foundAuthorById(Number(id));
    console.log("This is found author....", foundAuthor);

    const payload = {
      name: name as string,
      birthdate: moment(birthdate as string).toDate(),
      bio: bio as string,
    };

    const updatedAuthor = await updateAuthorById(Number(id), payload);
    console.log("Updated category yes...", updatedAuthor);

    if (!updatedAuthor) {
      throw new BaseError(
        "Failed to update author",
        httpStatusCodes.INTERNAL_SERVER
      );
    }
    const { id: authorId, createdAt, updatedAt, ...others } = updatedAuthor;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Author updated!.",
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
// @access Private
export const deleteAuthor: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    await deleteAuthorById(Number(id));

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Author deleted.",
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};