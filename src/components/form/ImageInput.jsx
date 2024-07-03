import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import FileLoader from './FileLoader';
import FileUpLoader from './FileUploader';
import { MdDelete } from 'react-icons/md';

const ImageInput = ({ name, isImageLoading, setIsImageLoading, imageUploadProgress, setImageUploadingProgress, ImageCover, setImageCover }) => {
  const { register, setValue, clearErrors, formState: { errors } } = useFormContext();

  const deleteFileObject = () => {
    setIsImageLoading(true);
    setImageCover(null);
    setIsImageLoading(false);
    setValue(name, null); // Clear the value in the form
    clearErrors(name); // Clear validation errors
  };

  useEffect(() => {
    register(name, {
      required: 'Image is required',
      validate: value => value !== null || 'Image is required'
    });
  }, [register, name]);

  useEffect(() => {
    setValue(name, ImageCover);
  }, [ImageCover, setValue, name]);

  return (
    <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
      {isImageLoading && <FileLoader progress={imageUploadProgress} />}
      {!isImageLoading && (
        <>
          {!ImageCover ? (
            <FileUpLoader
              updateState={setImageCover}
              setProgress={setImageUploadingProgress}
              isLoading={setIsImageLoading}
              isImage={true}
            />
          ) : (
            <div className="relative w-full h-full overflow-hidden rounded-md">
              <img
                src={ImageCover}
                className="w-full h-full object-cover"
                alt=""
              />
              <button
                className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                onClick={deleteFileObject}
              >
                <MdDelete className="text-white" />
              </button>
            </div>
          )}
        </>
      )}
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
    </div>
  );
};

export default ImageInput;
