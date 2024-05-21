import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

const SongCard = ({ artistName, data, artistIndex, albumIndex }) => {
  const isSongPlaying = useSelector((state) => state.user.isSongPlaying);
  const dispatch = useDispatch();

  const addToContext = () => {
    dispatch({ type: 'user/setMusic', payload: data });
    if (!isSongPlaying) {
      dispatch({ type: 'user/setSongPlaying', payload: true });
    }
  };

  return (
        <motion.div
          className="w-40 min-w-210 px-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
          onClick={() => addToContext()}
         
        >
          <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
            <motion.img
              whileTap={{ scale: 1.05 }}
              src={data.songImageURL}
              alt=""
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
          <p className="text-base text-center text-headingColor font-semibold my-2">
            {data.songName.length > 25 ? `${data.songName.slice(0, 25)}...` : data.songName}
            <span className="block text-sm text-gray-400 my-1">
              {artistName.length > 25 ? `${artistName.slice(0, 25)}...` : artistName}
            </span>
          </p>
        </motion.div>
      
  );
};

export default SongCard;
