import Link from 'next/link';
import Image from 'next/image';

import { FaLocationDot, FaLink } from 'react-icons/fa6';
import { FaCalendarAlt, FaRegClock } from 'react-icons/fa';

import { formatDateTime } from '@/lib/utils';

import EventCollection from '@/components/layout/Collection';
import CheckoutButton from '@/components/shared/CheckoutButton';

import {
  getEvent,
  getRelatedEventsByCategory,
  getRelatedEventsByOrganizer,
} from '@/actions/event.action';

type PropTypes = {
  params: { id: string };
};

const EventDetailPage = async ({ params: { id } }: PropTypes) => {
  const event = await getEvent(id);

  const relatedEventsByCategory = await getRelatedEventsByCategory({
    categoryId: event!.categoryId,
    eventId: event!.id,
    page: 1,
  });

  const relatedEventsByOrganizer = await getRelatedEventsByOrganizer({
    userId: event!.organizer.id,
    eventId: event!.id,
    page: 1,
  });

  if (event) {
    return (
      <>
        <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain py-16'>
          <div className='grid grid-cols-1 lg:grid-cols-2 2xl:max-w-7xl wrapper'>
            <Image
              src={event.imageUrl}
              alt='Event hero image'
              width={1000}
              height={1000}
              className='h-[20rem] sm:h-[40rem] lg:h-full object-cover object-top rounded-lg'
            />
            <div className='flex flex-col gap-8 p-6 md:p-12 w-full'>
              <div className='flex flex-col gap-6'>
                <h2 className='h2-bold'>{event.title}</h2>
                <div className='flex flex-col md:flex-row md:items-center gap-4'>
                  <div className='flex gap-4'>
                    <p className='p-bold-16 text-primary rounded-lg bg-primary/10 px-4 py-2 min-w-fit line-clamp-1'>
                      {event.isFree ? 'Free' : `$${event.price}`}
                    </p>
                    <p className='flex items-center p-bold-16 text-gray-500 rounded-lg bg-gray-500/10 px-4 py-2 min-w-fit line-clamp-1'>
                      {event.category?.name}
                    </p>
                  </div>
                  <p className='p-medium-14 ms-2 mt-2 md:mt-0 min-w-fit line-clamp-1'>
                    Organized by{' '}
                    <span className='text-primary'>
                      {event.organizer.firstName} {event.organizer.lastName}
                    </span>
                  </p>
                </div>
              </div>
              <CheckoutButton event={event}/>
              <div className='flex flex-col gap-8'>
                <div className='flex items-center gap-2 md:gap-4'>
                  <FaCalendarAlt className='w-8 h-8 text-primary' />
                  <div className='flex flex-wrap items-center p-medium-16'>
                    <p>{formatDateTime(event.startDateTime).dateOnly}</p>
                    <p className='ms-2'>
                      {' - '}
                      {formatDateTime(event.endDateTime).dateOnly}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-2 md:gap-4'>
                  <FaRegClock className='w-8 h-8 text-primary' />
                  <div className='flex flex-wrap items-center p-medium-16'>
                    <p>{formatDateTime(event.startDateTime).timeOnly}</p>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2 md:gap-4'>
                <FaLocationDot className='w-8 h-8 text-primary' />
                <p className='p-medium-16'>{event.location}</p>
              </div>
              <div className='flex flex-col gap-2 md:gap-4'>
                <p className='flex items-center gap-2 md:gap-4 text-primary truncate underline p-medium-16'>
                  <FaLink className='w-8 h-8 text-primary' />
                  <Link href={event.url as string} target='_blank'>
                    {event.url}
                  </Link>
                </p>
                <p className='p-bold-20 text-gray-500'>Event Details:</p>
                <p className='p-medium-16'>{event.description}</p>
              </div>
            </div>
          </div>
        </section>
        <section className='wrapper flex flex-col gap-8 md:gap-12 my-8'>
          <h2 className='h2-bold'>Related Events - {event.category.name}</h2>
          <EventCollection
            data={relatedEventsByCategory?.data ?? []}
            title='No events found.'
            subtitle='Come back later.'
            type='ALL_EVENTS'
            limit={6}
            page={1}
            totalPages={2}
          />
        </section>
        <section className='wrapper flex flex-col gap-8 md:gap-12 my-8'>
          <h2 className='h2-bold'>Other events by the organizer</h2>
          <EventCollection
            data={relatedEventsByOrganizer?.data ?? []}
            title='No events found.'
            subtitle='Come back later.'
            type='ALL_EVENTS'
            limit={6}
            page={1}
            totalPages={2}
          />
        </section>
      </>
    );
  }
};

export default EventDetailPage;
