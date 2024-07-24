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
import styled from "@emotion/styled";
import capitalize from "../../utils/capitalize";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 16px;
  border: 1px solid #d1d5db;
`;

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  width: 100%;
   @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 12px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  padding: 16px;
  cursor: pointer;
`;

const SaveButton = styled(motion.button)`
  padding: 8px 32px;
  width: 100%;
  border-radius: 4px;
  color: #fff;
  background-color: #e53e3e;
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const capitalizedArtistName = capitalize(formData.artistName);
  const capitalizedAlbumName = capitalize(formData.albumName);
  const capitalizedSongName = capitalize(formData.songName);
  const capitalizedCategory = capitalize(formData.category);
    const songData = {
      artistName: capitalizedArtistName,
      // artistImageURL: artistImageCover,
      albums: [
        {
          albumName: capitalizedAlbumName,
          // albumImageURL: albumImageCover,
          songs: [
            {
              songName: capitalizedSongName,
              songImageURL: songImageCover,
              songURL: audioImageCover,
              category:capitalizedCategory,
            },
          ],
        },
      ],
    };

    let data = {};
    if (isEdit) {
      data = {
        artistName: formData.artistName,
        // artistImageURL: artistImageCover,
        albumName: formData.albumName,
        // albumImageURL: albumImageCover,
        songName: formData.songName,
        songImageURL: songImageCover,
        songURL: audioImageCover,
        category: formData.category,
      };
    }
    if (isEdit) {
      if (data) {
        console.log(data);
        dispatch({ type: 'user/updateSong', payload: { data, id, navigate } });
        dispatch({ type: 'user/fetchAllSongs' });
      dispatch({type:'stat'})
      } 
    } else {
      dispatch({ type: "user/saveNewSong", payload: { songData, navigate } });
      dispatch({ type: 'user/fetchAllSongs' });
      dispatch({type:'stat'})
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <FormProvider {...methods}>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Section>
            <SectionTitle>Artist & Album  Details</SectionTitle>
            <TextInput
              name="artistName"
              placeholder="Artist Name"
              register={register}
              error={errors.artistName}
            />
            <TextInput
              name="albumName"
              placeholder="Album Name"
              register={register}
              error={errors.albumName}
            />
          </Section>
          <Section>
          <SectionTitle>Song Details</SectionTitle>
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
            {/* <ImageInput
              name="albumImage"
              isImageLoading={isAlbumImageLoading}
              setIsImageLoading={setIsAlbumImageLoading}
              imageUploadProgress={imageUploadProgress}
              setImageUploadingProgress={setImageUploadingProgress}
              ImageCover={albumImageCover}
              setImageCover={setAlbumImageCover}
            /> */}
          </Section>
          <Section>
          <SectionTitle>Song Details</SectionTitle>
          <TextInput
              name="category"
              placeholder="Genre Name"
              register={register}
              error={errors.category}
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
           
          </Section>
          <ButtonContainer>
            {isLoading ? (
              <DisableButton />
            ) : (
              <SaveButton
                className="justify-center"
                type="submit"
              >
                Save Song
              </SaveButton>
            )}
          </ButtonContainer>
        </FormContainer>
      </FormProvider>
    </Container>
  );
};

export default DashboardNewSong;
