import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiPlayListFill } from "react-icons/ri";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { IoClose, IoMusicalNote } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const MusicPlayer = () => {
  const allSongs = useSelector((state) => state.user.allSongs);
  const artistIndex = useSelector((state) => state.user.artistIndex);
  const albumIndex = useSelector((state) => state.user.albumIndex);
  const songIndex = useSelector((state) => state.user.songIndex);
  const searchSong = useSelector((state) => state.user.searchSong);
  const dispatch = useDispatch();
  const [isPlayList, setIsPlayList] = useState(false);
  const location = useLocation();
  const[imageUrl,setImageUrl]=useState('')
  const[audioUrl,setAudioUrl]=useState('')
  const[artistName,setArtistName]=useState('')
  const[songName,setSongName]=useState('')
  const[albumName,setAlbumName]=useState('')
  // You can now access the current pathname
  const currentPath = location.pathname;
  console.log(currentPath)
  const closePlayer = () => {
    dispatch({
      type: 'user/setSongPlaying',
      payload: false,
    });
  };

  useEffect(() => {
   
    // if (allSongs) {
    //   const song = allSongs[artistIndex]?.albums[albumIndex]?.songs[songIndex];
    //   dispatch({
    //     type: 'user/setCurrentSong',
    //     payload: song,
    //   });
    // }
    if(currentPath==='/search'){
      setImageUrl(searchSong[artistIndex]?.albums[albumIndex]?.songs[songIndex]?.songImageURL)
      setSongName(searchSong[artistIndex]?.albums[albumIndex]?.songs[songIndex]?.songName)
      setArtistName(searchSong[artistIndex]?.artistName)
      setAlbumName(searchSong[artistIndex]?.albums[albumIndex]?.albumName)
      setAudioUrl(searchSong[artistIndex]?.albums[albumIndex]?.songs[songIndex]?.songURL)
    }else{
      setImageUrl( allSongs[artistIndex]?.albums[albumIndex]?.songs[songIndex]?.songImageURL)
      setSongName(allSongs[artistIndex]?.albums[albumIndex]?.songs[songIndex]?.songName)
      setArtistName(allSongs[artistIndex]?.artistName)
      setAlbumName(allSongs[artistIndex]?.albums[albumIndex]?.albumName)
      setAudioUrl(allSongs[artistIndex]?.albums[albumIndex]?.songs[songIndex]?.songURL)
    }
  }, [allSongs, artistIndex, albumIndex, songIndex, dispatch]);

  return (
    <div className="w-screen flex items-center gap-3">
      <div className="w-screen items-center gap-3 p-4 flex relative">
        <img
          src={imageUrl}
          className="w-40 h-20 object-cover rounded-md"
          alt="Song"
        />
        <div className="flex items-start flex-col">
          <p className="lg:text-xl text-sm text-headingColor font-semibold">
            { (songName?.length > 15
              ? songName.slice(0, 15)
              : songName)}
          </p>
          <p className="text-textColor">
            {artistName}
            <span className="text-sm text-textColor font-semibold">
              {albumName}
            </span>
          </p>
          <motion.i whileTap={{ scale: 0.8 }} onClick={() => setIsPlayList(!isPlayList)}>
            <RiPlayListFill className="text-textColor hover:text-headingColor" />
          </motion.i>
        </div>
        <div className="flex-1">
          <AudioPlayer
            src={audioUrl}
            onPlay={() => console.log("is playing")}
            autoPlay={false}
            showSkipControls={true}
          />
        </div>
        <IoClose onClick={closePlayer} />
      </div>
      {isPlayList && <PlayListCard />}
    </div>
  );
};

export default MusicPlayer;

export const PlayListCard = () => {
  const allSongs = useSelector((state) => state.user.allSongs);
  const searchSong = useSelector((state) => state.user.searchSong);
  const artistIndex = useSelector((state) => state.user.artistIndex);
  const albumIndex = useSelector((state) => state.user.albumIndex);
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if(currentPath!=='/search'){
      if (!allSongs) {
        dispatch({ type: 'user/fetchAllSongs' });
      }
    }
    
  }, [allSongs, searchSong,dispatch]);

  const setCurrentPlaySong = (artistIndex, albumIndex, songIndex) => {
    dispatch({ type: 'user/setSongIndex', payload: { songIndex } });
    dispatch({ type: 'user/setAlbumIndex', payload: { albumIndex } });
    dispatch({ type: 'user/setArtistIndex', payload: { artistIndex } });
    dispatch({ type: 'user/setSongPlaying', payload: true });
   
  };

  return (
    <div className="absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary">
      {currentPath==='/search'?(searchSong.length > 0 ? (
        searchSong.map((artist, artistIdx) => 
          artist.albums.map((album, albumIdx) =>
            album.songs.map((song, songIdx) => (
              <motion.div
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.3, delay: (artistIdx + albumIdx + songIdx) * 0.1 }}
                className="group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent"
                onClick={() => setCurrentPlaySong(artistIdx, albumIdx, songIdx)}
                key={`${artistIdx}-${albumIdx}-${songIdx}`}
              >
                <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />
                <div className="flex items-start flex-col">
                  <p className="text-lg text-headingColor font-semibold">
                    {song.songName.length > 15 ? song.songName.slice(0, 15) : song.songName}
                    <span className="text-base">{album.albumName}</span>
                  </p>
                  <p className="text-textColor">
                    {artist.artistName}
                    <span className="text-sm text-textColor font-semibold">
                      {song.category}
                    </span>
                  </p>
                </div>
              </motion.div>
            ))
          )
        )
      ) : (
        <></>
      )):
       (
        allSongs.length > 0 ? (
          allSongs.map((artist, artistIdx) => 
            artist.albums.map((album, albumIdx) =>
              album.songs.map((song, songIdx) => (
                <motion.div
                  initial={{ opacity: 0, translateX: -50 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ duration: 0.3, delay: (artistIdx + albumIdx + songIdx) * 0.1 }}
                  className="group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent"
                  onClick={() => setCurrentPlaySong(artistIdx, albumIdx, songIdx)}
                  key={`${artistIdx}-${albumIdx}-${songIdx}`}
                >
                  <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />
                  <div className="flex items-start flex-col">
                    <p className="text-lg text-headingColor font-semibold">
                      {song.songName.length > 15 ? song.songName.slice(0, 15) : song.songName}
                      <span className="text-base">{album.albumName}</span>
                    </p>
                    <p className="text-textColor">
                      {artist.artistName}
                      <span className="text-sm text-textColor font-semibold">
                        {song.category}
                      </span>
                    </p>
                  </div>
                </motion.div>
              ))
            )
          )
        ) : (
          <></>
        )
       )
       }
    </div>
  );
};
