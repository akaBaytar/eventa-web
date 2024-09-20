'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navLinks } from '@/constants';

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className='w-full flex md:flex-between flex-col md:flex-row items-start gap-4'>
      {navLinks.map(({ label, route }) => {
        const isActive = pathname === route;

        return (
          <li
            key={label}
            className={`flex-center p-medium-16 whitespace-nowrap ${
              isActive && 'text-primary'
            }`}>
            <Link href={route}>{label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
