import { prisma } from "../database/prisma";

export const foundUser = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const createUser = async (data: { email: string; password: string }) => {
  return prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
    },
  });
};
