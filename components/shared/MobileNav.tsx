import Image from 'next/image';

import { Separator } from '../ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import LOGO from '@/assets/logo.svg';
import MENU_ICON from '@/assets/menu.svg';
import NavItems from './NavItems';

const MobileNav = () => {
  return (
    <nav className='md:hidden'>
      <Sheet>
        <SheetTrigger className='align-middle'>
          <Image
            src={MENU_ICON}
            width={24}
            height={24}
            alt='Open Mobile Menu'
          />
        </SheetTrigger>
        <SheetContent className='flex flex-col gap-6 bg-primary-50 md:hidden'>
          <div className='w-32 flex items-center gap-1 text-xl text-primary font-semibold select-none'>
            <Image
              src={LOGO}
              width={28}
              height={28}
              alt='Eventa Logo - Go Homepage'
            />
            <span>Eventa</span>
          </div>
          <Separator className='border-b' />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
