import Search from '../shared/Search';

const SearchContainer = () => {
  return (
    <section id='events' className='wrapper flex flex-col gap-6 md:gap-12 mt-8'>
      <h2 className='h2-bold'>
        Trusted by{' '}
        <span className='text-primary text-nowrap'>Thousands of Events</span>
      </h2>
      <div className='flex flex-col md:flex-row gap-6 w-full'>
        <Search />
        <div>filter form</div>
      </div>
    </section>
  );
};

export default SearchContainer;
