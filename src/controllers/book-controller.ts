import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
// import { foundAdmin } from "../repositories/admin-auth-repository";
import {
  foundBookById,
  foundBooks,
  updateBookById,
  deleteBookById,
  createBook,
} from "../repositories/book-repository";

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const addBook: RequestHandler = async (req, res, next) => {
  const { title, authorId, publishedYear, genre, availableCopies } = req.body;

  try {
    const payload = {
      title: title as string,
      publishedYear: publishedYear as string,
      authorId: authorId as number,
      genre: genre as string,
      availableCopies: availableCopies as number,
    };

    const createdBook = await createBook(payload);
    console.log("Created book yes...", createdBook);

    if (!createdBook) {
      throw new BaseError(
        "Failed to create book",
        httpStatusCodes.INTERNAL_SERVER
      );
    }

    const { id, createdAt, updatedAt, ...others } = createdBook;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Book Added!.",
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
export const getBooks: RequestHandler = async (req, res, next) => {
  try {
    const books = await foundBooks();
    console.log("This are the found books....", books);

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Book List!.",
      data: books,
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
export const getBook: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await foundBookById(Number(id));
    console.log("This is the found book....", book);

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Book info!.",
      data: book,
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
export const updateBook: RequestHandler = async (req, res, next) => {
  // const { admin } = req.session;
  const { id } = req.params;
  const { title, authorId, publishedYear, genre, availableCopies } = req.body;

  try {
    const foundBook = await foundBookById(Number(id));
    console.log("This is found book....", foundBook);

    const payload = {
      id: Number(id) as number,
      title: title as string,
      publishedYear: publishedYear as string,
      authorId: authorId as number,
      genre: genre as string,
      availableCopies: availableCopies as number,
    };

    const updatedBook = await updateBookById(Number(id), payload);
    console.log("Updated category yes...", updatedBook);

    if (!updatedBook) {
      throw new BaseError(
        "Failed to update book",
        httpStatusCodes.INTERNAL_SERVER
      );
    }
    const { id:bookId, createdAt, updatedAt, ...others } = updatedBook;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Book updated!.",
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
export const deleteBook: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    await deleteBookById(Number(id));

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Book deleted.",
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
