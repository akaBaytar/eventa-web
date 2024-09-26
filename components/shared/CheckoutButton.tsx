'use client';

import Link from 'next/link';

import { SignedOut } from '@clerk/clerk-react';
import { SignedIn, useUser } from '@clerk/nextjs';

import { Button } from '../ui/button';
import Checkout from '../layout/Checkout';

import { Event } from '@/types';

const CheckoutButton = ({ event }: { event: Event }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  const isFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className='flex items-center gap-4'>
      {isFinished ? (
        <p className='bg-red-600 text-white py-1 px-2 rounded-lg text-sm'>
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className='rounded-lg'>
              <Link href='/sign-in'>Login for Get Tickets</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
