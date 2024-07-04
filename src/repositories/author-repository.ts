import { prisma } from "../database/prisma";
import { Author } from "@prisma/client";

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
export const foundAuthors = async (): Promise<Author[]> => {
  return prisma.author.findMany();
};

/**
 * Fetches authors with paginations.
 * @returns Promise<Author[]>
 */
export const foundAuthorsPag = async (
  condition: any,
  limit: number,
  offset: number
): Promise<PaginatedAuthors> => {
  // Fetch the authors with pagination
  const authors = await prisma.author.findMany({
    where: condition,
    skip: offset,
    take: limit,
  });

  // Get the total count of authors matching the condition
  const totalItems = await prisma.author.count({
    where: condition,
  });

  return { count: totalItems, rows: authors };
};

/**
 * Fetches a author by its ID.
 * @param aId The ID of the author to fetch.
 * @returns Promise<Author | null>
 */
export const foundAuthorById = async (aId: number): Promise<Author | null> => {
  return prisma.author.findUnique({
    where: {
      id: aId,
    },
  });
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
  return prisma.author.create({
    data: {
      name: data.name,
      birthdate: data.birthdate,
      bio: data.bio,
    },
  });
};

/**
 * Updates a author by its ID.
 * @param aId The ID of the author to update.
 * @param data Partial data of the author to update.
 * @returns Promise<Author | null>
 */
export const updateAuthorById = async (
  aId: number,
  data: Partial<Author>
): Promise<Author | null> => {
  const foundAuthor = await foundAuthorById(aId);

  // If author is not found, return null
  if (!foundAuthor) {
    return null;
  }

  // Update the author
  const updatedAuthor = await prisma.author.update({
    where: { id: aId },
    data: {
      name: data.name ?? foundAuthor.name,
      birthdate: data.birthdate ?? foundAuthor.birthdate,
      bio: data.bio ?? foundAuthor.bio,
    },
  });

  return updatedAuthor;
};

/**
 * Deletes a author by its ID.
 * @param aId The ID of the author to delete.
 * @returns Promise<Author>
 */
export const deleteAuthorById = async (aId: number): Promise<Author> => {
  const deleteAuthor = await prisma.author.delete({ where: { id: aId } });
  return deleteAuthor;
};
