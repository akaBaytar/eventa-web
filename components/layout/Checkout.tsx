import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import { Event } from '@/types';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { checkoutOrder } from '@/actions/order.action';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ event, userId }: { event: Event; userId: string }) => {
  const { toast } = useToast();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      toast({
        description: 'Order placed! You will receive an email confirmation.',
      });
    }

    if (query.get('canceled')) {
      toast({
        description:
          'Order canceled -- continue to shop around and checkout when you’re ready.',
      });
    }
  }, [toast]);

  const onCheckout = async () => {
    const order = {
      eventId: event.id,
      eventTitle: event.title,
      price: event.price as string,
      isFree: event.isFree,
      buyerId: userId,
      image: event.imageUrl,
      description: event.description as string,
    };

    await checkoutOrder(order);
  };

  return (
    <form action={onCheckout} method='post'>
      <Button type='submit' role='link'>
        {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
      </Button>
    </form>
  );
};

export default Checkout;
