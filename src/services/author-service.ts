import { Author } from "@prisma/client";
import {
  foundAuthors as foundAuthorsRepository,
  foundAuthorsPag as findAuthorsByFilterRepository,
  foundAuthorById as foundAuthorByIdRepository,
  createAuthor as createAuthorRepository,
  updateAuthorById as updateAuthorByIdRepository,
  deleteAuthorById as deleteAuthorByIdRepository,

} from "../repositories/author-repository";

interface PaginatedAuthors {
  count: number;
  rows: {
    id: number;
    name: string;
    birthdate: Date;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

/**
 * Fetches all authors.
 * @returns Promise<Author[]>
 */
export const findAllAuthors = async (): Promise<Author[]> => {
  return foundAuthorsRepository();
};

/**
 * Fetches books by filter with pagination.
 * @param condition The filter conditions.
 * @param limit The number of records to fetch.
 * @param offset The number of records to skip.
 * @returns Promise<PaginatedBooks>
 */
export const findAuthorsByFilter = async (
  condition: any,
  limit: number,
  offset: number
): Promise<PaginatedAuthors> => {
  return findAuthorsByFilterRepository(condition, limit, offset);
};

/**
 * Fetches an author by its ID.
 * @param id The ID of the author to fetch.
 * @returns Promise<Author | null>
 */
export const findAuthorById = async (id: number): Promise<Author | null> => {
  return foundAuthorByIdRepository(id);
};

/**
 * Creates a new author.
 * @param data The data of the author to create.
 * @returns Promise<Author | null>
 */
export const createAuthor = async (data: {
  name: string;
  birthdate: Date;
  bio: string;
}): Promise<Author | null> => {
  return createAuthorRepository(data);
};

/**
 * Updates an author by its ID.
 * @param id The ID of the author to update.
 * @param data Partial data of the author to update.
 * @returns Promise<Author | null>
 */
export const updateAuthorById = async (
  id: number,
  data: Partial<Author>
): Promise<Author | null> => {
  return updateAuthorByIdRepository(id, data);
};

/**
 * Deletes an author by its ID.
 * @param id The ID of the author to delete.
 * @returns Promise<void>
 */
export const deleteAuthorById = async (id: number): Promise<void> => {
  await deleteAuthorByIdRepository(id);
};
