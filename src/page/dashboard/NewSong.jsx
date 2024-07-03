import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import TextInput from "../../components/form/TextInput";
import ImageInput from "../../components/form/ImageInput";
import AudioInput from "../../components/form/AudioInput";
import DisableButton from "../../components/form/DisableButton";
import { getOneSong } from "../../api";

const DashboardNewSong = ({ isEdit }) => {
  const methods = useForm();
  const { register, handleSubmit, setValue, formState: { errors } } = methods;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isAlbumImageLoading, setIsAlbumImageLoading] = useState(false);
  const [isArtistImageLoading, setIsArtistImageLoading] = useState(false);
  const [songImageCover, setSongImageCover] = useState(null);
  const [imageUploadProgress, setImageUploadingProgress] = useState(false);
  const [audioImageCover, setAudioImageCover] = useState(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioUploadProgress, setAudioUploadingProgress] = useState(false);
  const [artistImageCover, setArtistImageCover] = useState(null);
  const [albumImageCover, setAlbumImageCover] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading,setIsLoading]=useState(false)
  useEffect(() => {
    if (isEdit) {
      if (!data) {
        getOneSong(id).then((data) => {
          setData(data.data);
        });
      } else {
        setValue("songName", data.song.songName);
        setValue("albumName", data.albumName);
        setValue("artistName", data.artistName);
        setValue("category", data.song.category);
        setSongImageCover(data.song.songImageURL);
        setAudioImageCover(data.song.songURL);
        setAlbumImageCover(data.albumImageURL);
        setArtistImageCover(data.artistImageURL);
      }
    }
  }, [isEdit, data, setValue, id]);
  
  const onSubmit = (formData) => {
    if (!songImageCover || !audioImageCover) {
      toast.info('Fill all fields');
      return;
    }
    setIsLoading(true)
    const songData = {
      artistName: formData.artistName,
      artistImageURL: artistImageCover,
      albums: [
        {
          albumName: formData.albumName,
          albumImageURL: albumImageCover,
          songs: [
            {
              songName: formData.songName,
              songImageURL: songImageCover,
              songURL: audioImageCover,
              category: formData.category,
            },
          ],
        },
      ],
    };
    let data = {}
    if(isEdit){
       data = {
        artistName: formData.artistName,
        artistImageURL: artistImageCover,
        albumName: formData.albumName,
        albumImageURL: albumImageCover,
        songName: formData.songName,
        songImageURL: songImageCover,
        songURL: audioImageCover,
        category: formData.category,
      };
    }
    if (isEdit) {
      if(data){
        console.log(data)
        dispatch({ type: 'user/updateSong', payload: { data, id,navigate } });
        // dispatch({ type: 'user/fetchAllSongs' });
      }else{
        console.log("no updated data")
      }
     
      
      
    } else {
      dispatch({ type: "user/saveNewSong", payload: { songData,navigate } });
      dispatch({ type: 'user/fetchAllSongs' });
      
    }
  };

  return (
    <div className="flex flex-col items-start justify-center p-4 border border-gray-300">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-x-6 w-full ">
        
        
        
         <div className="flex flex-col items-center ">
         <p className="text-xl font-semibold text-headingColor my-3">Artist Details</p>
         <TextInput
            name="artistName"
            placeholder="Artist Name"
            register={register}
            error={errors.artistName}
          />
          <ImageInput
            name="artistImage"
            isImageLoading={isArtistImageLoading}
            setIsImageLoading={setIsArtistImageLoading}
            imageUploadProgress={imageUploadProgress}
            setImageUploadingProgress={setImageUploadingProgress}
            ImageCover={artistImageCover}
            setImageCover={setArtistImageCover}
          />
         </div>
         <div className="flex flex-col items-center">
         <p className="text-xl font-semibold text-headingColor my-3">Album Details</p>
         <TextInput
            name="albumName"
            placeholder="Album Name"
            register={register}
            error={errors.albumName}
          />
          <ImageInput
            name="albumImage"
            isImageLoading={isAlbumImageLoading}
            setIsImageLoading={setIsAlbumImageLoading}
            imageUploadProgress={imageUploadProgress}
            setImageUploadingProgress={setImageUploadingProgress}
            ImageCover={albumImageCover}
            setImageCover={setAlbumImageCover}
          />
         </div>
         <div className="flex flex-col items-center">
         <p className="text-xl font-semibold text-headingColor my-3">Song Details</p>
         <TextInput 
            name="songName"
            placeholder="Song Name"
            register={register}
            error={errors.songName}
          />
          <ImageInput
            name="songImage"
            isImageLoading={isImageLoading}
            setIsImageLoading={setIsImageLoading}
            imageUploadProgress={imageUploadProgress}
            setImageUploadingProgress={setImageUploadingProgress}
            ImageCover={songImageCover}
            setImageCover={setSongImageCover}
          />
          <AudioInput
            name="songAudio"
            audioUploadProgress={audioUploadProgress}
            audioImageCover={audioImageCover}
            setAudioImageCover={setAudioImageCover}
            setAudioUploadingProgress={setAudioUploadingProgress}
            setIsAudioLoading={setIsAudioLoading}
            isAudioLoading={isAudioLoading}
          />
           <TextInput
            name="category"
            placeholder="Genre Name"
            register={register}
            error={errors.category}
          />
         </div>
         
         
          
          
          

         
          <div className="flex items-center justify-center w-60 cursor-pointer p-4">
            {isLoading  ? (
              <DisableButton />
            ) : (
              <motion.button
                className="px-8 py-2 justify-center w-full rounded-md text-white bg-red-600 hover:shadow-lg"
                type="submit"
              >
                Save Song
              </motion.button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default DashboardNewSong;
