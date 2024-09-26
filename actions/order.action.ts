'use server';

import { redirect } from 'next/navigation';

import Stripe from 'stripe';

import prisma from '@/database';
import { handleError } from '@/lib/utils';
import { Checkout, CreateOrder } from '@/types';

export const checkoutOrder = async (order: Checkout) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = order.isFree ? 0 : +order.price * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
              images: order.image ? [order.image] : [],
              description: order.description,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: CreateOrder) => {
  try {
    const newOrder = await prisma.order.create({
      data: {
        ...order,
        buyerId: order.buyerId,
        eventId: order.eventId,
      },
    });

    return newOrder;
  } catch (error) {
    handleError(error);
  }
};

export const getOrdersByUser = async ({
  userId,
  limit = 6,
  page,
}: {
  userId: string;
  limit?: number;
  page: number;
}) => {
  const orders = await prisma.order.findMany({
    where: {
      buyerId: userId,
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      Event: {
        include: {
          category: true,
          organizer: true,
        },
      },
    },
  });

  const orderCount: number = await prisma.order.count({
    where: { buyerId: userId },
  });

  const totalPages = Math.ceil(orderCount / limit);

  return { data: orders, totalPages };
};
