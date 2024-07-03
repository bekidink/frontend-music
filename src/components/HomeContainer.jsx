import React, { useState } from "react";
import SongCard from "./card/PlayCard";
import { useSelector } from "react-redux";

const SongsContainer = ({ data, artistIndex,artistName,albumIndex }) => {
  const isSearch = useSelector((state) => state.user.isSearch);
  const albums = data;
  return (
    <>
     {albums && !isSearch && albums.songs.map((song, i) => (
          <SongCard data={song} artistName={artistName} artistIndex={artistIndex} albumIndex={albumIndex} songIndex={i} key={i}/>
      ))}
      {albums && isSearch && albums.songs.map((song, i) => (
          <SongCard data={song} artistName={artistName} artistIndex={artistIndex} albumIndex={albumIndex} songIndex={i} key={i} />
      ))}
    </>
  );
};

export default SongsContainer;
