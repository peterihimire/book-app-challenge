import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
import { validationResult } from "express-validator";
import {
  createBook,
  findAllBooks,
  findBooksByFilter,
  findBookById,
  updateBookById,
  deleteBookById,
} from "../services/book-service";

/**
 * Creates a new user.
 * @param data The data of the user to create.
 * @returns Promise<User | null>
 */
export const addBook: RequestHandler = async (req, res, next) => {
  const { title, authorId, publishedYear, genre, availableCopies } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
      return new BaseError(
        "Failed to create book",
        httpStatusCodes.INTERNAL_SERVER
      );
    }

    const { createdAt, updatedAt, ...others } = createdBook;

    res.status(httpStatusCodes.CREATED).json({
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

/**
 * Creates a new user.
 * @param data The data of the user to create.
 * @returns Promise<User | null>
 */
export const getBooks: RequestHandler = async (req, res, next) => {
  try {
    const books = await findAllBooks();

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

/**
 * Creates a new user.
 * @param data The data of the user to create.
 * @returns Promise<User | null>
 */
export const getBooksByFilter: RequestHandler = async (req, res, next) => {
  const { pageNum, pageSize, genre, publishedYear, availableCopies } =
    req.query;

  // Define a function to calculate pagination
  const getPagination = (
    pageNumb: string | undefined,
    sizeNum: string | undefined
  ) => {
    const pageNumber: number = pageNumb ? parseInt(pageNumb, 10) : 0;
    const pageSize: number = sizeNum ? parseInt(sizeNum, 10) : 5;

    const limit: number = pageSize ? +pageSize : 10;
    const offset: number = pageNumber ? pageNumber * (limit ?? 0) : 0;

    return { limit, offset };
  };

  // Construct the condition based on the query parameters
  const where: any = {};
  if (genre) {
    where.genre = { contains: genre as string, mode: "insensitive" };
  }
  if (publishedYear) {
    where.publishedYear = {
      contains: publishedYear as string,
      mode: "insensitive",
    };
  }
  if (availableCopies) {
    const availables = parseInt(availableCopies as string, 10);
    if (!isNaN(availables)) {
      where.availableCopies = availables;
    }
  }

  try {
    const { limit, offset } = getPagination(
      pageNum as string,
      pageSize as string
    );
    const foundBooks = await findBooksByFilter(where, limit, offset);
    const { count: totalItems, rows: books } = foundBooks;
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = Number(pageNum) || 0;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Searched Books!.",
      data: {
        totalItems,
        bookRecords: books,
        totalPages,
        currentPage,
      },
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
export const getBook: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await findBookById(Number(id));

    if (!book) {
      return next(
        new BaseError("Book does not exist.", httpStatusCodes.NOT_FOUND)
      );
    }

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

/**
 * Creates a new user.
 * @param data The data of the user to create.
 * @returns Promise<User | null>
 */
export const updateBook: RequestHandler = async (req, res, next) => {
  // const { admin } = req.session;
  const { id } = req.params;
  const { title, authorId, publishedYear, genre, availableCopies } = req.body;

  try {
    const foundBook = await findBookById(Number(id));
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
      return next(
        new BaseError("Failed to update book", httpStatusCodes.INTERNAL_SERVER)
      );
    }
    const { createdAt, ...others } = updatedBook;

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

/**
 * Creates a new user.
 * @param data The data of the user to create.
 * @returns Promise<User | null>
 */
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
