'use client';

import { useState } from 'react';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FaLocationDot } from 'react-icons/fa6';
import { FaRegCalendarAlt } from 'react-icons/fa';

import { eventDefaultValues } from '@/constants';
import { eventFormSchema } from '@/lib/validator';

import FileUploader from './FileUploader';
import FormDropdown from '../shared/Dropdown';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

type PropTypes = {
  userId: string;
  type: 'Create' | 'Update';
};

const EventForm = ({ userId, type }: PropTypes) => {
  const [files, setFiles] = useState<File[]>([]);

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
        <div className='flex flex-col md:flex-row gap-6'>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl className='h-60'>
                  <Textarea
                    placeholder='Description'
                    {...field}
                    className='textarea'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl className='h-60'>
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col md:flex-row gap-6'>
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex-center h-[54px] w-full px-4 py-2 overflow-hidden rounded-lg bg-grey-50'>
                    <FaLocationDot className='w-6 h-6 text-gray-500' />
                    <Input
                      placeholder='Event Location'
                      {...field}
                      className='input-field'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col md:flex-row gap-6'>
          <FormField
            control={form.control}
            name='startDateTime'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex-center h-[54px] w-full px-4 py-2 overflow-hidden rounded-lg bg-grey-50'>
                    <FaRegCalendarAlt className='w-6 h-6 text-gray-500' />
                    <p className='ms-3 whitespace-nowrap text-gray-500'>
                      Start Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      showTimeSelect
                      wrapperClassName='datePicker'
                      dateFormat='dd/MM/yyyy h:mm aa'
                      onChange={(date) => field.onChange(date)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='endDateTime'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex-center h-[54px] w-full px-4 py-2 overflow-hidden rounded-lg bg-grey-50'>
                    <FaRegCalendarAlt className='w-6 h-6 text-gray-500' />
                    <p className='ms-3 whitespace-nowrap text-gray-500'>
                      End Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      showTimeSelect
                      wrapperClassName='datePicker'
                      dateFormat='dd/MM/yyyy h:mm aa'
                      onChange={(date) => field.onChange(date)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' size='lg' className='py-[26px]'>
          Create Event
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
