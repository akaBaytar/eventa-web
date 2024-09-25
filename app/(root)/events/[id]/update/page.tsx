import { auth } from '@clerk/nextjs/server';

import { getEvent } from '@/actions/event.action';
import EventForm from '@/components/layout/EventForm';

type PropTypes = { params: { id: string } };

const EventUpdatePage = async ({ params: { id } }: PropTypes) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const event = await getEvent(id);

  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-6  md:py-12'>
        <h3 className='wrapper h3-bold text-center sm:text-start'>
          Update Event
        </h3>
      </section>
      <div className='wrapper my-8'>
        <EventForm
          event={event}
          userId={userId}
          eventId={event?.id}
          type='Update'
        />
      </div>
    </>
  );
};

export default EventUpdatePage;
