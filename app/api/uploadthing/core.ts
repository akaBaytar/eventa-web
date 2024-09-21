import { getAuth } from '@clerk/nextjs/server';

import { createUploadthing } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

import type { NextRequest } from 'next/server';
import type { FileRouter } from 'uploadthing/next';

import prisma from '@/database';

const f = createUploadthing();

const auth = async (req: NextRequest) => {
  const { userId } = getAuth(req);

  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  return user ? { id: user.id } : null;
};

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '1MB' } })
    .middleware(async ({ req }) => {
      const user = await auth(req);

      if (!user) throw new UploadThingError('Unauthorized');

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
