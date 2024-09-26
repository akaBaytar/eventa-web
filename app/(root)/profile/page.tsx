import Link from 'next/link';

import { auth } from '@clerk/nextjs/server';

import { Button } from '@/components/ui/button';
import EventCollection from '@/components/layout/Collection';

import { getRelatedEventsByOrganizer } from '@/actions/event.action';
import { getOrdersByUser } from '@/actions/order.action';

import { Order } from '@/types';

const ProfilePage = async () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const orders = await getOrdersByUser({ userId, page: 1 });

  const tickets = orders.data.map((order: Order) => order.Event || []);

  const organizedEvents = await getRelatedEventsByOrganizer({
    userId,
    page: 1,
  });

  return (
    <>
      <section className='py-6 md:py-12'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-start'>My Tickets</h3>
          <Button asChild size='sm' className='hidden sm:flex'>
            <Link href={'/#events'}>Explore More Events</Link>
          </Button>
        </div>
      </section>
      <section className='wrapper my-8'>
        <EventCollection
          data={tickets ?? []}
          title='No event tickets purchased yet.'
          subtitle='Plenty of exciting events to explore.'
          type='MY_TICKETS'
          limit={6}
          page={1}
          totalPages={2}
          urlParamName='orders'
        />
      </section>
      <section className='py-6 md:py-12'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-start'>
            Events Organized
          </h3>
          <Button asChild size='sm' className='hidden sm:flex'>
            <Link href={'/events/create'}>Create New Event</Link>
          </Button>
        </div>
      </section>
      <section className='wrapper py-8 mb-12'>
        <EventCollection
          data={organizedEvents?.data ?? []}
          title='No events have been created yet.'
          subtitle='Let&pos;s create some events.'
          type='EVENTS_ORGANIZED'
          limit={6}
          page={1}
          totalPages={2}
          urlParamName='events'
        />
      </section>
    </>
  );
};

export default ProfilePage;
