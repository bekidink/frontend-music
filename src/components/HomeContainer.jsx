import React from "react";
import SongCard from "./card/PlayCard";

const SongsContainer = ({ data, artistIndex,artistName }) => {
  const albums = data;
 console.log(albums.albumName,'alb')
  return (
    <>
     {data && albums.songs.map((song, i) => (
          <SongCard data={song} artistName={artistName} artistIndex={artistIndex} albumIndex={i} />
      ))}
    </>
    
  );
};

export default SongsContainer;
