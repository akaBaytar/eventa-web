'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { eventDefaultValues } from '@/constants';
import { eventFormSchema } from '@/lib/validator';

import FormDropdown from '../shared/Dropdown';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

type PropTypes = {
  userId: string;
  type: 'Create' | 'Update';
};

const EventForm = ({ userId, type }: PropTypes) => {
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: eventDefaultValues,
  });

  const onSubmit = (values: z.infer<typeof eventFormSchema>) => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6'>
        <div className='flex flex-col md:flex-row gap-6'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input
                    placeholder='Event Title'
                    {...field}
                    className='input-field'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <FormDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

export default EventForm;
