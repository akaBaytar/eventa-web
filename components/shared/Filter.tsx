'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { getAllCategories } from '@/actions/category.action';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Category } from '@/types';

const Filter = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      if (categoryList) setCategories(categoryList as Category[]);
    };

    getCategories();
  }, []);

  const onSelectCategories = (category: string) => {
    let newURL;

    if (category && category !== 'All') {
      newURL = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: category,
      });
    } else {
      newURL = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['category'],
      });
    }

    router.push(newURL, { scroll: false });
  };

  return (
    <Select onValueChange={(value: string) => onSelectCategories(value)}>
      <SelectTrigger className='select-field'>
        <SelectValue placeholder='Category' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='All' className='select-item p-regular-14'>
          All
        </SelectItem>
        {categories.map(({ id, name }) => (
          <SelectItem
            key={id}
            value={name}
            className='select-item p-regular-14'>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Filter;
