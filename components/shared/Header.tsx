import Image from 'next/image';
import Link from 'next/link';

import LOGO from '@/assets/logo.svg';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';

const Header = () => {
  return (
    <header className='w-full'>
      <div className='wrapper flex items-center justify-between'>
        <Link
          href='/'
          className='w-32 flex items-center text-2xl text-primary font-semibold select-none'>
          <Image
            src={LOGO}
            width={38}
            height={38}
            alt='Eventa Logo - Go Homepage'
          />
          <span>Eventa</span>
        </Link>
        <div className='flex w-32 justify-end gap-2'>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button asChild className='rounded-lg px-8'>
              <Link href='/sign-in'>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
