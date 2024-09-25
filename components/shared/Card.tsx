import Link from 'next/link';

import { auth } from '@clerk/nextjs/server';

import { Event } from '@/types';
import { formatDateTime } from '@/lib/utils';

import { FaRegEdit } from 'react-icons/fa';


type PropTypes = {
  event: Event;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: PropTypes) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer.id.toString();

  return (
    <div className='group relative flex flex-col overflow-hidden min-h-[360px] md:min-h-[400px] w-full max-w-[380px] rounded-lg bg-white shadow-md transition-all hover:shadow-lg'>
      <Link
        href={`/events/${event.id}`}
        className='flex-center flex-grow  bg-gray-50 bg-cover bg-center text-gray-500'
        style={{ backgroundImage: `url(${event.imageUrl})` }}
      />
      {isEventCreator && !hidePrice && (
        <div className='absolute right-2 top-2 flex flex-col gap-4 p-3 shadow-sm rounded-lg bg-white transition-all'>
          <Link href={`/events/${event.id}/update`}>
            <FaRegEdit className='w-5 h-5'/>
          </Link>
        </div>
      )}
      <Link
        href={`/events/${event.id}`}
        className='flex flex-col gap-4 p-4 min-h-[200px]'>
        {!hidePrice && (
          <div className='flex gap-2'>
            <span className='p-semibold-14 px-2 py-1 w-min bg-primary rounded-lg text-primary-50'>
              {event.isFree ? 'Free' : `$${event.price}`}
            </span>
            <p className='p-semibold-14 px-2 py-1 w-min bg-primary rounded-lg text-primary-50'>
              {event.category.name}
            </p>
          </div>
        )}
        <p className='p-medium-16 text-gray-500'>
          {formatDateTime(event.startDateTime).dateTime}
        </p>
        <p className='p-medium-16 md:p-medium-20 line-clamp-1'>{event.title}</p>
        <div className='flex-between w-full p-medium-14 md:p-medium-16 '>
          <p className='text-gray-500'>
            {event.organizer.firstName} {event.organizer.lastName}
          </p>
          {hasOrderLink && (
            <Link href={`/orders?eventId=${event.id}`} className='flex gap-2'>
              <p className='text-primary'>Order Details</p>
            </Link>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Card;
