import { startTransition, useState } from 'react';

import { Input } from '../ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Category } from '@/types';

type PropTypes = {
  value?: string;
  onChangeHandler?: () => void;
};

const FormDropdown = ({ value, onChangeHandler }: PropTypes) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {};

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className='select-field'>
        <SelectValue placeholder='Event Category' />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map(({ id, name }) => (
            <SelectItem
              key={id}
              value={name}
              className='select-item p-regular-14'>
              {name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger className='flex w-full p-medium-14 py-3 ps-4 text-primary hover:bg-primary-50'>
            Create new category
          </AlertDialogTrigger>
          <AlertDialogContent className='bg-white'>
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type='text'
                  placeholder='Category name'
                  className='input-field mt-2'
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}>
                Add Category
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default FormDropdown;
