import { RequestHandler } from "express";
import moment from "moment";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
import { validationResult } from "express-validator";
import {
  findAllAuthors,
  findAuthorById,
  updateAuthorById,
  deleteAuthorById,
  createAuthor,
} from "../services/author-service";

/**
 * Creates a new user.
 * @param data The data of the user to create.
 * @returns Promise<User | null>
 */
export const addAuthor: RequestHandler = async (req, res, next) => {
  const { name, bio, birthdate } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const payload = {
      name: name as string,
      birthdate: moment(birthdate as string).toDate(),
      bio: bio as string,
    };

    const createdAuthor = await createAuthor(payload);
    console.log("Created author yes...", createdAuthor);

    if (!createdAuthor) {
      return next(
        new BaseError(
          "Failed to create author",
          httpStatusCodes.INTERNAL_SERVER
        )
      );
    }

    const { createdAt, updatedAt, ...others } = createdAuthor;

    res.status(httpStatusCodes.CREATED).json({
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

/**
 * Creates a new user.
 * @param data The data of the user to create.
 * @returns Promise<User | null>
 */
export const getAuthors: RequestHandler = async (req, res, next) => {
  try {
    const authors = await findAllAuthors();

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

/**
 * Creates a new user.
 * @param data The data of the user to create.
 * @returns Promise<User | null>
 */
export const getAuthor: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const author = await findAuthorById(Number(id));
    console.log("This are the found author....", author);

    if (!author) {
      return next(
        new BaseError("Author does not exist.", httpStatusCodes.NOT_FOUND)
      );
    }

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

/**
 * Creates a new user.
 * @param data The data of the user to create.
 * @returns Promise<User | null>
 */
export const updateAuthor: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const { name, bio, birthdate } = req.body;

  try {
    const foundAuthor = await findAuthorById(Number(id));
    console.log("This is found author....", foundAuthor);

    const payload = {
      name: name as string,
      birthdate: moment(birthdate as string).toDate(),
      bio: bio as string,
    };

    const updatedAuthor = await updateAuthorById(Number(id), payload);
    console.log("Updated author yes...", updatedAuthor);

    if (!updatedAuthor) {
      return next(
        new BaseError(
          "Failed to update author",
          httpStatusCodes.INTERNAL_SERVER
        )
      );
    }
    const { createdAt, ...others } = updatedAuthor;

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

/**
 * Creates a new user.
 * @param data The data of the user to create.
 * @returns Promise<User | null>
 */
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
