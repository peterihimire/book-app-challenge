import { User } from "@prisma/client";
import {
  foundUser as foundUserRepository,
  registerUser as registerUserRepository,
} from "../repositories/auth-repository";

/**
 * Fetches a user by email.
 * @param email The email of the user to fetch.
 * @returns Promise<User | null>
 */
export const findUserByEmail = async (email: string): Promise<User | null> => {
  return foundUserRepository(email);
};

/**
 * Registers a new user.
 * @param data The data of the user to register.
 * @returns Promise<User | null>
 */
export const registerUser = async (data: {
  email: string;
  password: string;
}): Promise<User | null> => {
  return registerUserRepository(data);
};
