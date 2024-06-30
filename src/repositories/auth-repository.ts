import { prisma } from "../database/prisma";
import { User } from "@prisma/client";

/**
 * Fetches a book by its email.
 * @param email The email of the book to fetch.
 * @returns Promise<User | null>
 */
export const foundUser = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

/**
 * Creates a new user.
 * @param data The data of the user to create.
 * @returns Promise<User | null>
 */
export const registerUser = async (data: {
  email: string;
  password: string;
}): Promise<User | null> => {
  return prisma.user.create({
    data: {
      email: data?.email,
      password: data?.password,
    },
  });
};
