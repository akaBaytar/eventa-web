import Hero from '@/components/layout/Hero';
import SearchContainer from '@/components/container/Search';
import EventCollection from '@/components/layout/Collection';

import { getAllEvents } from '@/actions/event.action';
import { SearchParams } from '@/types';

const HomePage = async ({ searchParams }: SearchParams) => {
  const page = Number(searchParams.page) || 1;
  const query = (searchParams.query as string) || '';
  const category = (searchParams.category as string) || '';

  const events = await getAllEvents({ page, query, category, limit: 6 });

  return (
    <>
      <Hero />
      <SearchContainer />
      <section className='wrapper flex flex-col gap-6 md:gap-12 mb-8'>
        <EventCollection
          data={events?.data ?? []}
          title='No events found.'
          subtitle='Come back later.'
          type='ALL_EVENTS'
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
};

export default HomePage;
