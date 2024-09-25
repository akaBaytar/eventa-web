'use server';

import prisma from '@/database';
import { handleError } from '@/lib/utils';

import { CreateEvent, GetAllEvents } from '@/types';

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

export const getEvent = async (eventId: string) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        category: { select: { id: true, name: true } },
        organizer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            photo: true,
          },
        },
      },
    });

    if (!event) throw new Error('Event not found.');

    return event;
  } catch (error) {
    handleError(error);
  }
};

export const getAllEvents = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllEvents) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip: 0,
      take: limit,
      include: {
        category: { select: { id: true, name: true } },
        organizer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            photo: true,
          },
        },
      },
    });

    const eventsCount: number = await prisma.event.count({});
    const totalPages = Math.ceil(eventsCount / limit);

    return { data: events, count: eventsCount, totalPages };
  } catch (error) {
    handleError(error);
  }
};
