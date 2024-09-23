import Image from 'next/image';

import { getEvent } from '@/actions/event.action';

type PropTypes = {
  params: { id: string };
};

const EventDetailPage = async ({ params: { id } }: PropTypes) => {
  const event = await getEvent(id);

  if (event) {
    return (
      <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
        <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
          <Image
            src={event.imageUrl}
            alt='Event hero image'
            width={1000}
            height={1000}
            className='h-full min-h-[18.75rem] object-cover object-center'
          />
        </div>
      </section>
    );
  }
};

export default EventDetailPage;
