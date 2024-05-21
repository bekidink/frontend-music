import React from 'react'
import { MdDelete } from 'react-icons/md'
import FileLoader from './FileLoader'
import FileUpLoader from './FileUploader'

export default function AudioInput({audioUploadProgress,audioImageCover,setAudioImageCover,setAudioUploadingProgress,setIsAudioLoading,isAudioLoading}) {
    const deleteFileObject = () => {
            setAudioImageCover(null);
           };
    return (
    <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer my-5">
        {isAudioLoading && <FileLoader progress={audioUploadProgress} />}
        {!isAudioLoading && (
          <>
            {!audioImageCover ? (
              <FileUpLoader
                updateState={setAudioImageCover}
                setProgress={setAudioUploadingProgress}
                isLoading={setIsAudioLoading}
                isImage={false}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <audio
                  src={audioImageCover}
                  alt=""
                  controls
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

