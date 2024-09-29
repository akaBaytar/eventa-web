'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LuLoader2 } from 'react-icons/lu';
import { FaLocationDot, FaLink } from 'react-icons/fa6';
import { FaRegCalendarAlt, FaMoneyBill } from 'react-icons/fa';

import { createEvent, updateEvent } from '@/actions/event.action';

import { handleError } from '@/lib/utils';
import { eventDefaultValues } from '@/constants';
import { eventFormSchema } from '@/lib/validator';
import { useUploadThing } from '@/lib/uploadthing';

import FileUploader from './FileUploader';
import FormDropdown from '../shared/Dropdown';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

import { Event } from '@/types';

type PropTypes = {
  userId: string;
  event?: Event;
  eventId?: string;
  type: 'Create' | 'Update';
};

const EventForm = ({ userId, type, event, eventId }: PropTypes) => {
  const router = useRouter();

  const { startUpload } = useUploadThing('imageUploader');

  const [files, setFiles] = useState<File[]>([]);

  const initialValues =
    event && type === 'Update'
      ? {
          ...event,
          description: event.description ?? undefined,
          location: event.location ?? undefined,
          imageUrl: event.imageUrl ?? undefined,
          categoryId: event.categoryId ?? undefined,
          price: event.price ?? undefined,
          url: event.url ?? undefined,
          startDateTime: event.startDateTime ?? undefined,
          endDateTime: event.endDateTime ?? undefined,
        }
      : eventDefaultValues;

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadImages = await startUpload(files);

      if (!uploadImages) return;

      uploadedImageUrl = uploadImages[0].url;
    }

    if (type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
        });

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent.id}`);
        }
      } catch (error) {
        handleError(error);
      }
    }

    if (type === 'Update') {
      if (!eventId) return router.back();

      console.log('EVENT ID', eventId);

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: {
            ...values,
            imageUrl: uploadedImageUrl,
            id: eventId,
          },
          path: `/events/${eventId}`,
        });

        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent.id}`);
        }
      } catch (error) {
        handleError(error);
      }
    }
  };

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
                    className='input-field shadow-none'
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
                    className='textarea shadow-none'
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
                      className='input-field shadow-none'
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
        <div className='flex flex-col md:flex-row gap-6'>
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex-center h-[54px] w-full px-4 py-2 overflow-hidden rounded-lg bg-grey-50'>
                    <FaMoneyBill className='w-8 h-6 text-gray-500' />
                    <Input
                      type='number'
                      placeholder='Price'
                      min={0}
                      {...field}
                      className='p-regular-16 border-0 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-grey-50 ms-2 shadow-none'
                    />
                    <FormField
                      control={form.control}
                      name='isFree'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className='flex items-center'>
                              <label
                                htmlFor='isFree'
                                className='whitespace-nowrap pe-2 ms-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-60'>
                                Free Ticket
                              </label>
                              <Checkbox
                                id='isFree'
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className='me-2 h-5 w-5 border-2 border-primary'
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex-center h-[54px] w-full px-4 py-2 overflow-hidden rounded-lg bg-grey-50'>
                    <FaLink className='w-6 h-6 text-gray-500' />
                    <Input
                      placeholder='URL'
                      {...field}
                      className='input-field shadow-none'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type='submit'
          size='lg'
          className='py-[26px]'
          disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <div className='flex items-center gap-2 animate-pulse'>
              <LuLoader2 className='w-6 h-6 animate-spin' />{' '}
              <span>Submitting...</span>
            </div>
          ) : (
            `${type} Event`
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
