import React from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ onDrop, disabled = false }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="rounded border flex justify-center mx-3 my-5 py-10">
      <div className="text-center text-gray-600">
        <input disabled={disabled} {...getInputProps()} />
        <i className="fas fa-upload text-5xl" />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p className="mt-3">Drag &apos;n&apos; drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
