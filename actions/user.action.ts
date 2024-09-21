'use server';

import prisma from '@/database';
import { handleError } from '@/lib/utils';
import { CreateUser, UpdateUser } from '@/types';

export const createUser = async (user: CreateUser) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        clerkId: user.clerkId,
        username: user.username,
        email: user.email,
        photo: user.photo,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    return newUser;
  } catch (error) {
    handleError(error);
  }
};

export const getUser = async (clerkId: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { clerkId } });

    if (!user) throw new Error('User not found.');

    return user;
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async (clerkId: string, user: UpdateUser) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        clerkId,
      },

      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        photo: user.photo,
      },
    });

    if (!updatedUser) throw new Error('User update failed.');

    return updatedUser;
  } catch (error) {
    handleError(error);
  }
};
