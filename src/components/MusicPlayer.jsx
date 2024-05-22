import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiPlayListFill } from "react-icons/ri";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import {  IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
const MusicPlayer = () => {

  const allSongs = useSelector((state) => state.user.allSongs);
  const songIndex = useSelector((state) => state.user.songIndex);
  
  const music = useSelector((state) => state.user.music);
  
  const dispatch=useDispatch()
  const [isPlayList, setIsPlayList] = useState(false);
  
  const closePlayer = () => {
    dispatch({
      type: 'user/setSongPlaying',
      isSongPlaying: false,
    });
  };
useEffect(()=>{
  if(allSongs){
    const art=allSongs[songIndex]
    const album=art.albums[songIndex]
    
  }
},[allSongs,songIndex])
  return (
   
    <div className="w-screen flex items-center gap-3 ">
      <div className={`w-screen items-center gap-3 p-4 flex relative`}>
        <img
          src={music.songImageURL
          }
          className="w-40 h-20 object-cover rounded-md"
        />
        <div className="flex items-start flex-col">
          <p className="lg:text-xl text-sm text-headingColor font-semibold">
            {`${
             music.songName.length > 15
                ? music.songName.slice(0, 15)
                : music.songName
            }`}
          </p>
          <p className="text-textColor">
            {allSongs[songIndex]?.artist}
            <span className="text-sm text-textColor font-semibold">
              {music.category}
            </span>
          </p>
          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsPlayList(!isPlayList)}
          >
            <RiPlayListFill className="text-textColor hover:text-headingColor" />
          </motion.i>
        </div>
        <div className="flex-1">
          <AudioPlayer
            src={music.songURL}
            onPlay={() => console.log("is playing")}
            autoPlay={false}
            showSkipControls={true}
            
          />
        </div>
        <IoClose onClick={closePlayer} />
      </div>
    </div>
  );
};

export default MusicPlayer;
