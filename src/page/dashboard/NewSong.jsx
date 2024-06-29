import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
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
    
    if (isEdit) {
      const updateData = {
        artistName: formData.artistName,
        artistImageURL: artistImageCover,
        albumName: formData.albumName,
        albumImageURL: albumImageCover,
        songName: formData.songName,
        songImageURL: songImageCover,
        songURL: audioImageCover,
        category: formData.category,
      };
      dispatch({ type: 'user/updateSong', payload: { updateData, id } });
      dispatch({ type: 'user/fetchAllSongs' });
      navigate('/dashboard/songs');
    } else {
      dispatch({ type: "user/saveNewSong", payload: { songData } });
      dispatch({ type: 'user/fetchAllSongs' });
      navigate('/dashboard/songs');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <TextInput 
          name="songName"
          placeholder="Song Name"
          register={register}
          error={errors.songName}
        />
        <ImageInput
          isImageLoading={isImageLoading}
          setIsImageLoading={setIsImageLoading}
          imageUploadProgress={imageUploadProgress}
          setImageUploadingProgress={setImageUploadingProgress}
          ImageCover={songImageCover}
          setImageCover={setSongImageCover}
          url="song"
        />
        <AudioInput
          audioUploadProgress={audioUploadProgress}
          audioImageCover={audioImageCover}
          setAudioImageCover={setAudioImageCover}
          setAudioUploadingProgress={setAudioUploadingProgress}
          setIsAudioLoading={setIsAudioLoading}
          isAudioLoading={isAudioLoading}
        />
        <p className="text-xl font-semibold text-headingColor">Artist Details</p>
        <TextInput
          name="artistName"
          placeholder="Artist Name"
          register={register}
          error={errors.artistName}
        />
        <ImageInput
          isImageLoading={isArtistImageLoading}
          setIsImageLoading={setIsArtistImageLoading}
          imageUploadProgress={imageUploadProgress}
          setImageUploadingProgress={setImageUploadingProgress}
          ImageCover={artistImageCover}
          setImageCover={setArtistImageCover}
          url="artist"
        />
        <p className="text-xl font-semibold text-headingColor my-3">Album Details</p>
        <TextInput
          name="albumName"
          placeholder="Album Name"
          register={register}
          error={errors.albumName}
        />
        <ImageInput
          isImageLoading={isAlbumImageLoading}
          setIsImageLoading={setIsAlbumImageLoading}
          imageUploadProgress={imageUploadProgress}
          setImageUploadingProgress={setImageUploadingProgress}
          ImageCover={albumImageCover}
          setImageCover={setAlbumImageCover}
          url="album"
        />
        <TextInput
          name="category"
          placeholder="Genre Name"
          register={register}
          error={errors.category}
        />
        <div className="flex items-center justify-center w-60 cursor-pointer p-4">
          {isImageLoading || isAudioLoading ? (
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
    </div>
  );
};

export default DashboardNewSong;
