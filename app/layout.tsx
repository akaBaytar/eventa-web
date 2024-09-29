import { Poppins } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/toaster';

import type { Metadata } from 'next';
import '@/styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Eventa – Create, Share and Buy Event Tickets',
  description:
    'Eventa is a platform where users can create and manage their own events, share them with others, and sell tickets seamlessly. Discover upcoming conferences, concerts, festivals, and more. Buy and sell event tickets with ease on Eventa.',
  icons: {
    apple: '/images/apple-icon.png',
  },
};

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={poppins.variable}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default Layout;
