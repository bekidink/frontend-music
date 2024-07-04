import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";

const Card = styled(motion.div)`
  width: 10rem;
  min-width: 210px;
  padding-left: 1rem;
  padding-right: 1rem;
  cursor: pointer;
  background-color: #f3f4f6;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    background-color: #e5e7eb;
  }
`;

const ImageContainer = styled.div`
  width: 10rem;
  min-width: 160px;
  height: 10rem;
  min-height: 160px;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
`;

const Title = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #1f2937;
  font-weight: 600;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Artist = styled.span`
  display: block;
  font-size: 0.875rem;
  color: #9ca3af;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`;

const SongCard = ({ artistName, data, artistIndex, albumIndex, songIndex }) => {
  const isSongPlaying = useSelector((state) => state.user.isSongPlaying);
  const dispatch = useDispatch();
  
  const addToContext = () => {
    console.log(songIndex, albumIndex, artistIndex);
    dispatch({ type: 'user/setSongIndex', payload: { songIndex } });
    dispatch({ type: 'user/setAlbumIndex', payload: { albumIndex } });
    dispatch({ type: 'user/setArtistIndex', payload: { artistIndex } });
    if (!isSongPlaying) {
      dispatch({ type: 'user/setSongPlaying', payload: true });
    }
  };

  return (
    <Card onClick={addToContext}>
      <ImageContainer>
        <Image
          whileTap={{ scale: 1.05 }}
          src={data.songImageURL}
          alt=""
        />
      </ImageContainer>
      <Title>
        {data.songName.length > 25 ? `${data.songName.slice(0, 25)}...` : data.songName}
        <Artist>
          {artistName.length > 25 ? `${artistName.slice(0, 25)}...` : artistName}
        </Artist>
      </Title>
    </Card>
  );
};

export default SongCard;