import { Book } from "@prisma/client";
import {
  foundBooks as findBooksRepository,
  foundBooksPag as findBooksByFilterRepository,
  foundBookById as findBookByIdRepository,
  createBook as createBookRepository,
  updateBookById as updateBookByIdRepository,
  deleteBookById as deleteBookByIdRepository,
} from "../repositories/book-repository";

interface PaginatedBooks {
  count: number;
  rows: {
    id: number;
    title: string;
    authorId: number;
    publishedYear: string;
    genre: string;
    availableCopies: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

/**
 * Fetches all books.
 * @returns Promise<Book[]>
 */
export const findAllBooks = async (): Promise<Book[]> => {
  return findBooksRepository();
};

/**
 * Fetches books by filter with pagination.
 * @param condition The filter conditions.
 * @param limit The number of records to fetch.
 * @param offset The number of records to skip.
 * @returns Promise<PaginatedBooks>
 */
export const findBooksByFilter = async (
  condition: any,
  limit: number,
  offset: number
): Promise<PaginatedBooks> => {
  return findBooksByFilterRepository(condition, limit, offset);
};

/**
 * Fetches a book by its ID.
 * @param id The ID of the book to fetch.
 * @returns Promise<Book | null>
 */
export const findBookById = async (id: number): Promise<Book | null> => {
  return findBookByIdRepository(id);
};

/**
 * Creates a new book.
 * @param data The data of the book to create.
 * @returns Promise<Book | null>
 */
export const createBook = async (data: {
  title: string;
  authorId: number;
  publishedYear: string;
  genre: string;
  availableCopies: number;
}): Promise<Book | null> => {
  return createBookRepository(data);
};

/**
 * Updates a book by its ID.
 * @param id The ID of the book to update.
 * @param data Partial data of the book to update.
 * @returns Promise<Book | null>
 */
export const updateBookById = async (
  id: number,
  data: Partial<Book>
): Promise<Book | null> => {
  return updateBookByIdRepository(id, data);
};

/**
 * Deletes a book by its ID.
 * @param id The ID of the book to delete.
 * @returns Promise<void>
 */
export const deleteBookById = async (id: number): Promise<void> => {
  await deleteBookByIdRepository(id);
};
