import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const handleError = (error: unknown) => {
  console.log(error);
  
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);