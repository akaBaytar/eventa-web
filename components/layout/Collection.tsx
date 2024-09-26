/* eslint-disable @typescript-eslint/no-unused-vars */
import Card from '../shared/Card';

import { Collection } from '@/types';

const EventCollection = ({
  data,
  title,
  subtitle,
  type,
  limit,
  totalPages = 0,
  page,
  urlParamName,
}: Collection) => {
  return (
    <>
      {data.length > 0 ? (
        <div className='flex flex-col items-center gap-10'>
          <ul className='grid gap-4 xl:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full'>
            {data.map((event) => {
              const hasOrderLink = type === 'EVENTS_ORGANIZED';
              const hidePrice = type === 'MY_TICKETS';

              return (
                <li key={event.id} className='flex justify-center'>
                  <Card
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className='flex-center flex-col gap-4 py-28 wrapper min-h-[200px] w-full text-center bg-gray-50 rounded-lg'>
          <h3 className='p-bold-20 md:h5-bold'>{title}</h3>
          <p className='p-regular-14'>{subtitle}</p>
        </div>
      )}
    </>
  );
};

export default EventCollection;
