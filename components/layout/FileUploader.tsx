'use client';

import { useCallback, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

import { useDropzone } from '@uploadthing/react';
import { generateClientDropzoneAccept } from 'uploadthing/client';

import { convertFileToUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import SVG from '@/assets/upload.svg';

type PropTypes = {
  imageUrl: string;
  onFieldChange: (url: string) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const FileUploader = ({ imageUrl, onFieldChange, setFiles }: PropTypes) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onFieldChange(convertFileToUrl(acceptedFiles[0]));
    },
    [onFieldChange, setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className='flex-center bg-dark-3 flex h-60 cursor-pointer flex-col overflow-hidden rounded-lg bg-grey-50'>
      <input {...getInputProps()} className='cursor-pointer' />
      {imageUrl ? (
        <div className='flex h-full w-full flex-1 justify-center '>
          <Image
            src={imageUrl}
            alt='image'
            width={240}
            height={240}
            className='w-full object-cover object-center'
          />
        </div>
      ) : (
        <div className='flex-center flex-col py-5 text-grey-500'>
          <Image src={SVG} width={80} height={80} alt='file upload icon' />
          <h3 className='mb-2 mt-2'>Drag photo here</h3>
          <p className='p-medium-12 mb-4'>SVG, PNG, JPG</p>
          <Button type='button' className='rounded-lg'>
            Select From Device
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
