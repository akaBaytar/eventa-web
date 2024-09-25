'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/database';
import { handleError } from '@/lib/utils';

import { CreateEvent, DeleteEvent, GetAllEvents, UpdateEvent } from '@/types';

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
