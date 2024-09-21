import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Category } from '@/types';

type PropTypes = {
  value?: string;
  onChangeHandler?: () => void;
};

const FormDropdown = ({ value, onChangeHandler }: PropTypes) => {
  const [category, setCategory] = useState<Category[]>([]);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className='select-field'>
        <SelectValue placeholder='Event Category' />
      </SelectTrigger>
      <SelectContent>
        {category.map(({ id, name }) => (
          <SelectItem key={id} value={name}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FormDropdown;
