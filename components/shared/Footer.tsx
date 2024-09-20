import Link from 'next/link';
import Image from 'next/image';

import LOGO from '@/assets/logo.svg';

import { FaXTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className='border-t bg-primary-50'>
      <div className='wrapper flex flex-col sm:flex-row flex-center flex-between p-4 sm:mt-8 gap-6 text-center'>
        <Link
          href='/'
          className='w-32 flex items-center justify-center sm:justify-start gap-1 text-xl text-primary font-semibold select-none'>
          <Image
            src={LOGO}
            width={28}
            height={28}
            alt='Eventa Logo - Go Homepage'
          />
          <span>Eventa</span>
        </Link>
        <div className='flex flex-center gap-6 text-3xl text-primary'>
          <Link
            href=''
            target='_blank'
            className='hover:text-pink-500 duration-300'>
            <FaLinkedinIn />
          </Link>
          <Link
            href=''
            target='_blank'
            className='hover:text-pink-500 duration-300'>
            <FaGithub />
          </Link>
          <Link
            href=''
            target='_blank'
            className='hover:text-pink-500 duration-300'>
            <FaXTwitter />
          </Link>
        </div>
      </div>
      <p className='text-xs text-center mb-4 opacity-60'>
        &copy; {new Date().getFullYear()} Eventa. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
