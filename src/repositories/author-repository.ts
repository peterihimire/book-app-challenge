import { prisma } from "../database/prisma";
import { Author } from "@prisma/client";

/**
 * Fetches all authors.
 * @returns Promise<Author[]>
 */
export const foundAuthors = async (): Promise<Author[]> => {
  return prisma.author.findMany();
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
