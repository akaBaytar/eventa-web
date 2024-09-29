'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/database';
import { handleError } from '@/lib/utils';

import {
  CreateEvent,
  DeleteEvent,
  GetAllEvents,
  UpdateEvent,
  WhereClause,
} from '@/types';

export const createEvent = async ({ event, userId }: CreateEvent) => {
  try {
    const organizer = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!organizer) throw new Error('Organizer not found.');

    const newEvent = await prisma.event.create({
      data: { ...event, userId, categoryId: event.categoryId },
    });

    revalidatePath('/');

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

export const getRelatedEventsByOrganizer = async ({
  userId,
  eventId,
  page,
  limit = 6,
}: {
  userId: string;
  eventId?: string;
  page: number;
  limit?: number;
}) => {
  try {
    const events = await prisma.event.findMany({
      where: { organizer: { id: userId }, id: { not: eventId } },
      take: limit,
      skip: (page - 1) * limit,
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

    const eventsCount: number = await prisma.event.count({
      where: { organizer: { id: userId } },
    });
    const totalPages = Math.ceil(eventsCount / limit);

    return { data: events, totalPages };
  } catch (error) {
    handleError(error);
  }
};

export const getRelatedEventsByCategory = async ({
  categoryId,
  eventId,
  page,
  limit = 6,
}: {
  categoryId: string;
  eventId: string;
  page: number;
  limit?: number;
}) => {
  try {
    const events = await prisma.event.findMany({
      where: { categoryId, id: { not: eventId } },
      take: limit,
      skip: (page - 1) * limit,
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

    const eventsCount: number = await prisma.event.count({
      where: { categoryId },
    });
    const totalPages = Math.ceil(eventsCount / limit);

    return { data: events, totalPages };
  } catch (error) {
    handleError(error);
  }
};

export const deleteEvent = async ({ eventId, path }: DeleteEvent) => {
  try {
    const event = await prisma.event.delete({ where: { id: eventId } });

    if (event) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};

export const updateEvent = async ({ userId, event, path }: UpdateEvent) => {
  try {
    const updatedEvent = await prisma.event.update({
      where: { id: event.id, userId },
      data: {
        category: {
          connect: {
            id: event.categoryId,
          },
        },
        description: event.description,
        imageUrl: event.imageUrl,
        title: event.title,
        location: event.location,
        endDateTime: event.endDateTime,
        startDateTime: event.startDateTime,
        price: event.price,
        url: event.url,
        isFree: event.isFree,
      },
    });

    revalidatePath(path);

    return updatedEvent;
  } catch (error) {
    handleError(error);
  }
};

export const getAllEvents = async ({
  limit = 6,
  page,
  query,
  category,
}: GetAllEvents) => {
  try {
    const whereClause: WhereClause = {
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          location: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          organizer: {
            username: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
      ],
    };
    if (category) {
      whereClause.category = {
        name: category,
      };
    }

    const events = await prisma.event.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: (page - 1) * limit,
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
