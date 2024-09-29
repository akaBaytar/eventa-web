'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '../ui/button';
import { formUrlQuery } from '@/lib/utils';

type PropTypes = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ urlParamName, page, totalPages }: PropTypes) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (button: string) => {
    const pageValue = button === 'next' ? +page + 1 : +page - 1;

    const newURL = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: pageValue.toString(),
    });

    router.push(newURL, { scroll: false });
  };

  return (
    <div className='flex gap-4 justify-between w-full sm:justify-center'>
      <Button
        variant='outline'
        size='lg'
        className='w-28 shadow-md'
        onClick={() => onClick('prev')}
        disabled={+page <= 1}>
        Previous
      </Button>
      <Button
        variant='outline'
        size='lg'
        className='w-28 shadow-md'
        onClick={() => onClick('next')}
        disabled={+page >= totalPages}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
