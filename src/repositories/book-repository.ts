import { prisma } from "../database/prisma";
import { Book } from "@prisma/client";

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
export const foundBooks = async (): Promise<Book[]> => {
  return prisma.book.findMany();
};

/**
 * Fetches all books.
 * @returns Promise<Book[]>
 */
export const foundBooksPag = async (
  condition: any,
  limit: number,
  offset: number
): Promise<PaginatedBooks> => {
  // Fetch the products with pagination
  const books = await prisma.book.findMany({
    where: condition,
    skip: offset,
    take: limit,
  });

  // Get the total count of books matching the condition
  const totalItems = await prisma.book.count({
    where: condition,
  });

  return { count: totalItems, rows: books };
};

/**
 * Fetches a book by its ID.
 * @param bId The ID of the book to fetch.
 * @returns Promise<Book | null>
 */
export const foundBookById = async (bId: number): Promise<Book | null> => {
  return prisma.book.findUnique({
    where: {
      id: bId,
    },
  });
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
  return prisma.book.create({
    data: {
      title: data.title,
      authorId: data.authorId,
      publishedYear: data.publishedYear,
      genre: data.genre,
      availableCopies: data.availableCopies,
    },
  });
};

/**
 * Updates a book by its ID.
 * @param bId The ID of the book to update.
 * @param data Partial data of the book to update.
 * @returns Promise<Book | null>
 */
export const updateBookById = async (
  bId: number,
  data: Partial<Book>
): Promise<Book | null> => {
  const foundBook = await foundBookById(bId);

  // If book is not found, return null
  if (!foundBook) {
    return null;
  }

  // Update the book
  const updatedBook = await prisma.book.update({
    where: { id: bId },
    data: {
      title: data.title ?? foundBook.title,
      authorId: data.authorId ?? foundBook.authorId,
      publishedYear: data.publishedYear ?? foundBook.publishedYear,
      genre: data.genre ?? foundBook.genre,
      availableCopies: data.availableCopies ?? foundBook.availableCopies,
    },
  });

  return updatedBook;
};

/**
 * Deletes a book by its ID.
 * @param bId The ID of the book to delete.
 * @returns Promise<Book>
 */
export const deleteBookById = async (bId: number): Promise<Book> => {
  const deleteBook = await prisma.book.delete({ where: { id: bId } });
  return deleteBook;
};
