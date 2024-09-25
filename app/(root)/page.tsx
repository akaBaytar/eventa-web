import Hero from '@/components/layout/Hero';
import SearchContainer from '@/components/container/Search';
import EventCollection from '@/components/layout/Collection';

import { getAllEvents } from '@/actions/event.action';

const HomePage = async () => {
  const events = await getAllEvents({
    query: '',
    category: '',
    page: 1,
    limit: 6,
  });

  return (
    <>
      <Hero />
      <SearchContainer />
      <EventCollection
        data={events?.data ?? []}
        title='No events found.'
        subtitle='Come back later.'
        type='ALL_EVENTS'
        limit={6}
        page={1}
        totalPages={2}
      />
    </>
  );
};

export default HomePage;
