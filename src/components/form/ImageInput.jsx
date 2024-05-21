import React from 'react'
import FileLoader from './FileLoader';
import FileUpLoader from './FileUploader';
import { MdDelete } from 'react-icons/md';

export default function ImageInput({isimageLoading,imageUploadProgress,ImageCover,setImageUploadingProgress,setIsImageLoading,setImageCover,url}) {
    const deleteFileObject = () => {

        
          setIsImageLoading(true);
          setImageCover(null)
          setIsImageLoading(false);
        
      };
    return (
    <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
    {isimageLoading && <FileLoader progress={imageUploadProgress} />}
    {!isimageLoading && (
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
              onClick={() => deleteFileObject()}
            >
              <MdDelete className="text-white" />
            </button>
          </div>
        )}
      </>
    )}
  </div>
  )
}
