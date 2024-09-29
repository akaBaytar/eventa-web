'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { FaSearch } from 'react-icons/fa';

import { Input } from '../ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';

const Search = () => {
  const [query, setQuery] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const debounce = setTimeout(() => {
      let newURL;

      if (query) {
        newURL = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: query,
        });
      } else {
        newURL = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query'],
        });
      }

      router.push(newURL, { scroll: false });
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, router, searchParams]);

  return (
    <div className='flex-center min-h-14 w-full px-4 py-2 overflow-hidden rounded-lg bg-gray-50'>
      <FaSearch className='w-5 h-5 text-gray-500' />
      <Input
        type='text'
        placeholder='Search'
        onChange={(e) => setQuery(e.target.value)}
        className='border-0 p-regular-16 bg-gray-50 outline-offset-0 placeholder:text-gray-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none'
      />
    </div>
  );
};

export default Search;
