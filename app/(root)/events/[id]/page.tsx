import Link from 'next/link';
import Image from 'next/image';

import { FaLocationDot, FaLink } from 'react-icons/fa6';
import { FaCalendarAlt, FaRegClock } from 'react-icons/fa';

import { formatDateTime } from '@/lib/utils';
import { getEvent } from '@/actions/event.action';

type PropTypes = {
  params: { id: string };
};

const EventDetailPage = async ({ params: { id } }: PropTypes) => {
  const event = await getEvent(id);

  if (event) {
    return (
      <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl wrapper'>
          <Image
            src={event.imageUrl}
            alt='Event hero image'
            width={1000}
            height={1000}
            className='h-full min-h-[18.75rem] object-cover object-center rounded-lg'
          />
          <div className='flex flex-col gap-8 p-6 md:p-12 w-full'>
            <div className='flex flex-col gap-6'>
              <h2 className='h2-bold'>{event.title}</h2>
              <div className='flex flex-col md:flex-row md:items-center gap-4'>
                <div className='flex gap-4'>
                  <p className='p-bold-20 text-primary rounded-lg bg-primary/10 px-4 py-2'>
                    {event.isFree ? 'Free' : `$${event.price}`}
                  </p>
                  <p className='flex items-center p-medium-16 text-gray-500 rounded-lg bg-gray-500/10 px-4 py-2'>
                    {event.category?.name}
                  </p>
                </div>
                <p className='p-medium-18 ms-2 mt-2 md:mt-0'>
                  Organized by{' '}
                  <span className='text-primary'>
                    {event.organizer.firstName} {event.organizer.lastName}
                  </span>
                </p>
              </div>
            </div>
            {/* checkout button later */}
            <div className='flex flex-col gap-8'>
              <div className='flex items-center gap-2 md:gap-4'>
                <FaCalendarAlt className='w-8 h-8 text-primary' />
                <div className='flex flex-wrap items-center p-medium-16 lg:p-regular-20'>
                  <p>{formatDateTime(event.startDateTime).dateOnly}</p>
                  <p className='ms-2'>
                    {' - '}
                    {formatDateTime(event.endDateTime).dateOnly}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2 md:gap-4'>
                <FaRegClock className='w-8 h-8 text-primary' />
                <div className='flex flex-wrap items-center p-medium-16 lg:p-regular-20'>
                  <p>{formatDateTime(event.startDateTime).timeOnly}</p>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-2 md:gap-4'>
              <FaLocationDot className='w-8 h-8 text-primary' />
              <p className='p-medium-16 lg:p-regular-20'>{event.location}</p>
            </div>
            <div className='flex flex-col gap-2 md:gap-4'>
              <p className='p-bold-20 text-gray-500'>Event Details:</p>
              <p className='p-medium-16 lg:p-regular-20'>{event.description}</p>
              <p className='flex items-center gap-2 md:gap-4 mt-4 text-primary truncate underline p-medium-16 lg:p-regular-20'>
                <FaLink className='w-8 h-8 text-primary' />
                <Link href={event.url as string} target='_blank'>
                  {event.url}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default EventDetailPage;
