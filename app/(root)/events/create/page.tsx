import { auth } from '@clerk/nextjs/server';

import EventForm from '@/components/layout/EventForm';

const EventCreatePage = () => {
  const { userId } = auth();

  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-6  md:py-12'>
        <h3 className='wrapper h3-bold text-center sm:text-start'>
          Create Event
        </h3>
      </section>
      <div className='wrapper my-8'>
        <EventForm userId={userId as string} type='Create' />
      </div>
    </>
  );
};

export default EventCreatePage;
