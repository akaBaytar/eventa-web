'use server';

import prisma from '@/database';
import { handleError } from '@/lib/utils';

import { CreateEvent } from '@/types';

export const createEvent = async ({ event, userId }: CreateEvent) => {
  try {
    const organizer = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!organizer) throw new Error('Organizer not found.');

    const newEvent = await prisma.event.create({
      data: { ...event, userId, categoryId: event.categoryId },
    });

    return newEvent;
  } catch (error) {
    handleError(error);
  }
};
