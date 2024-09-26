import { NextResponse } from 'next/server';

import stripe from 'stripe';
import { createOrder } from '@/actions/order.action';

export const POST = async (request: Request) => {
  const body = await request.text();

  const sign = request.headers.get('stripe-signature') as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sign, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err });
  }

  const eventType = event.type;

  if (eventType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = event.data.object;

    const order = {
      stripeId: id,
      eventId: metadata?.eventId || '',
      buyerId: metadata?.buyerId || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
      createdAt: new Date(),
    };

    const newOrder = await createOrder(order);

    return NextResponse.json({ message: 'OK', order: newOrder });
  }

  return new Response('', { status: 200 });
};
