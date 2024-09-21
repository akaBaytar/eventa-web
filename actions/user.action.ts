'use server';

import prisma from '@/database';
import { CreateUser } from '@/types';
import { handleError } from '@/lib/utils';

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
