import Image from 'next/image';
import Link from 'next/link';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

import LOGO from '@/assets/logo.svg';

import NavItems from './NavItems';
import MobileNav from './MobileNav';
import { Button } from '../ui/button';

const Header = () => {
  return (
    <header className='w-full border-b bg-primary-50'>
      <div className='wrapper flex items-center justify-between'>
        <Link
          href='/'
          className='w-32 flex items-center gap-1 text-xl text-primary font-semibold select-none'>
          <Image
            src={LOGO}
            width={28}
            height={28}
            alt='Eventa Logo - Go Homepage'
          />
          <span>Eventa</span>
        </Link>
        <SignedIn>
          <nav className='hidden w-full max-w-xs md:flex-between'>
            <NavItems />
          </nav>
        </SignedIn>
        <div className='flex w-32 justify-end gap-2'>
          <SignedIn>
            <UserButton />
            <MobileNav />
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
