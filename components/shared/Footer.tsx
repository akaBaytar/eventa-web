import Link from 'next/link';
import Image from 'next/image';

import LOGO from '@/assets/logo.svg';

import { FaXTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className='border-t bg-primary-50'>
      <div className='wrapper flex flex-col sm:flex-row flex-center flex-between p-4 sm:mt-8 gap-8 text-center'>
        <Link
          href='/'
          className='w-32 flex items-center justify-center sm:justify-start gap-1 text-xl text-primary font-semibold select-none mt-8 sm:mt-0'>
          <Image
            src={LOGO}
            width={28}
            height={28}
            alt='Eventa Logo - Go Homepage'
          />
          <span>Eventa</span>
        </Link>
        <div className='text-xs text-gray-600 cursor-pointer'>
          <ul className='flex flex-col gap-1 sm:items-start'>
            <li className='hover:underline underline-offset-2'>Press</li>
            <li className='hover:underline underline-offset-2'>Careers</li>
            <li className='hover:underline underline-offset-2'>About Us</li>
            <li className='hover:underline underline-offset-2'>Investors</li>
            <li className='hover:underline underline-offset-2'>
              Buyer Guarantee
            </li>
          </ul>
        </div>
        <div className='text-xs text-gray-600 cursor-pointer'>
          <ul className='flex flex-col gap-1 sm:items-start'>
            <li className='hover:underline underline-offset-2'>Site Map</li>
            <li className='hover:underline underline-offset-2'>
              Accessibility
            </li>
            <li className='hover:underline underline-offset-2'>Terms of Use</li>
            <li className='hover:underline underline-offset-2'>
              Privacy Policy
            </li>
            <li className='hover:underline underline-offset-2'>
              Privacy Preferences
            </li>
          </ul>
        </div>
        <div className='flex flex-center gap-6 text-3xl text-primary'>
          <Link
            href='https://www.linkedin.com/in/akabaytar/'
            target='_blank'
            className='hover:text-pink-500 duration-300'>
            <FaLinkedinIn />
          </Link>
          <Link
            href='https://github.com/akaBaytar'
            target='_blank'
            className='hover:text-pink-500 duration-300'>
            <FaGithub />
          </Link>
          <Link
            href='https://x.com/akaBaytar'
            target='_blank'
            className='hover:text-pink-500 duration-300'>
            <FaXTwitter />
          </Link>
        </div>
      </div>
      <p className='text-xs text-center mb-4 mt-8 opacity-60'>
        &copy; {new Date().getFullYear()} Eventa. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
