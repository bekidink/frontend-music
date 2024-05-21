import React, { useEffect, useState } from "react";

import { useParams, useNavigate, useLocation } from "react-router-dom";


import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { getOneSong } from "../../api";
import AudioInput from "../../components/form/AudioInput";
import ImageInput from "../../components/form/ImageInput";
import DisableButton from "../../components/form/DisableButton";
import TextInput from "../../components/form/TextInput";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
const DashboardEditSong = () => {
  

  const [songName, setSongName] = useState("");
  const [data, setData] = useState(null);
 const dispatch=useDispatch()
 const[gener,setGener]=useState("")
  
  
  const { id } = useParams();
  const [isimageLoading, setIsImageLoading] = useState(false);
  const [songImageCover, setSongImageCover] = useState(null);
  const [imageUploadProgress, setImageUploadingProgress] = useState(false);
  const [audioImageCover, setAudioImageCover] = useState(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioUploadProgress, setAudioUploadingProgress] = useState(false);

  const [artistImageCover, setArtistImageCover] = useState(null);
  const [artistImageUploadProgress, setArtistImageUploadingProgress] = useState(false);
  const [artistName, setArtistName] = useState("");
  

  const [albumnImageCover, setAlbumImageCover] = useState(null);
  const [albumUploadProgress, setAlbumImageUploadingProgress] = useState(false);
  const [albumName, setAlbumName] = useState("");
  const router=useNavigate()
  useEffect(() => {
    if (!data) {
      
      getOneSong(id).then((data) => {
        
        setData(data.data)
        // setData(data.song);
       
       
      });
    } else{
 
      setSongName(data.song.songName);
      setAlbumImageCover(data.albumImageURL)
      setArtistImageCover(data.artistImageURL);
      setArtistName(data.artistName);
      setAlbumName(data.albumName
      );
      setGener(data.song.category)
      setSongImageCover(data.song.songImageURL
      );
      setAudioImageCover(data.song.songURL);
    }
  
  }, [data,dispatch]);
  
  const saveSong = async() => {
   try {
    if (!songImageCover || !audioImageCover) {
      toast.info('fill all info')
    } else {
     
      const data=     {
        "artistName": artistName,
        "artistImageURL": artistImageCover,
        
            
                "albumName": albumName,
                "albumImageURL":albumnImageCover,
                
                        "songName": songName,
                        "songImageURL": songImageCover,
                        "songURL": audioImageCover,
                        "category": gener
                  
    }
       dispatch({ type: 'user/updateSong',payload:{data,id} })
       
      
        dispatch({ type: 'user/fetchAllSongs' });
     
        router('/dashboard/songs')
      
      
      
    }
   } catch (error) {
    console.error("Error saving song:", error);
   }
  };

  

  
  return (
   <div>
    {!data && <CircularProgress/>}
     {data &&  <div className="flex flex-col items-center justify-center p-4 border border-gray-300 ">
      {/* song */}
      <TextInput name={songName} setName={setSongName} placeholder={'Song Name'}/>
  
      <ImageInput isimageLoading={isimageLoading} setIsImageLoading={setIsImageLoading} imageUploadProgress={imageUploadProgress} setImageUploadingProgress={setImageUploadingProgress} ImageCover={songImageCover} setImageCover={setSongImageCover} url={'song'}/>
      
  
      <AudioInput audioUploadProgress={audioUploadProgress} audioImageCover={audioImageCover} setAudioImageCover={setAudioImageCover} setAudioUploadingProgress={setAudioUploadingProgress} setIsAudioLoading={setIsAudioLoading} isAudioLoading={isAudioLoading} />
  
      
  {/* artist */}
      <p className="text-xl font-semibold text-headingColor ">Artist Details</p>
      
      <TextInput name={artistName} setName={setArtistName} placeholder={'Artist Name'}/>
     <ImageInput isimageLoading={isimageLoading} setIsImageLoading={setIsImageLoading} imageUploadProgress={artistImageUploadProgress} setImageUploadingProgress={setAlbumImageUploadingProgress} ImageCover={artistImageCover} setImageCover={setArtistImageCover} url={'artist'}/>
     
    
 {/* album */}
      <p className="text-xl font-semibold text-headingColor my-3">Album Details</p>
     <TextInput name={albumName} setName={setAlbumName} placeholder={'Album Name'}/>
       <ImageInput isimageLoading={isimageLoading} setIsImageLoading={setIsImageLoading} imageUploadProgress={albumUploadProgress} setImageUploadingProgress={setAlbumImageUploadingProgress} ImageCover={albumnImageCover} setImageCover={setAlbumImageCover} url={'album'}/>
     {/* genere */}
  <TextInput name={gener} setName={setGener} placeholder={'Genre Name'}/>
  <div className="flex items-center justify-center w-60 cursor-pointer p-4">
        {isimageLoading || isAudioLoading ? (
          <DisableButton />
        ) : (
          <motion.button
            className="px-8 py-2 w-full rounded-md text-white bg-red-600 hover:shadow-lg"
            onClick={() => saveSong()}
          >
            Save song
          </motion.button>
        )}
      </div>
    </div>}
   </div>
   
  );
};

export default DashboardEditSong;



