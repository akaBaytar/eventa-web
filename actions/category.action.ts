'use server';

import prisma from '@/database';
import { handleError } from '@/lib/utils';

export const createCategory = async ({ category }: { category: string }) => {
  try {
    const newCategory = await prisma.category.create({
      data: { name: category },
    });

    return newCategory;
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany();

    return categories;
  } catch (error) {
    handleError(error);
  }
};
