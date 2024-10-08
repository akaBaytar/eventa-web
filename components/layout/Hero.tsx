import Link from 'next/link';
import Image from 'next/image';

import HERO_IMAGE from '@/assets/hero.svg';

import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className='bg-primary-50 bg-dotted-pattern bg-contain py-6 md:py-12'>
      <div className='wrapper grid grid-cols-1 md:grid-cols-2 gap-6 2xl:gap-0'>
        <div className='flex flex-col justify-center gap-8'>
          <h1 className='h1-bold'>Reliable & Rewarding Tickets</h1>
          <p className='p-regular-20 md:p-regular-24'>
            We have a 100% Buyer Guarantee and the only ticket rewards program
            around.
          </p>
          <p className='p-regular-20 md:p-regular-24 -mt-4'>
            Grab your seats, they&apos;re guaranteed - just like your 11th
            ticket on us.
          </p>
          <Button asChild size='lg' className='button w-full sm:w-fit'>
            <Link href='#events'>Explore Events</Link>
          </Button>
        </div>
        <Image
          src={HERO_IMAGE}
          width={1045}
          height={1262}
          alt='Hero Illustration'
          className='max-h-[70vh] 2xl:max-h-[50vh] object-contain object-center'
        />
      </div>
    </section>
  );
};

export default Hero;
