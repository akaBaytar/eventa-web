import { Dispatch, SetStateAction } from 'react';

type PropTypes = {
  imageUrl: string;
  onFieldChange: (value: string) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const FileUploader = ({}: PropTypes) => {
  return <div>file uploader</div>;
};

export default FileUploader;
