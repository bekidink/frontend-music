import React, { useEffect, useState } from "react";


import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../../components/form/TextInput";
import ImageInput from "../../components/form/ImageInput";
import AudioInput from "../../components/form/AudioInput";
import DisableButton from "../../components/form/DisableButton";
import { toast } from "react-toastify";
import { getOneSong } from "../../api";
const DashboardNewSong = ({isEdit}) => {
  const [songName, setSongName] = useState("");
  const[gener,setGener]=useState("")
  const dispatch=useDispatch()
   
  const allAlbum = useSelector((state) => state.user.allAlbum);
  const allArtists = useSelector((state) => state.user.allArtists);
  
  
  const [isimageLoading, setIsImageLoading] = useState(false);
  const [isAlbumImageLoading, setIsAlbumImageLoading] = useState(false);
  const [isArtistImageLoading, setIsArtistImageLoading] = useState(false);
  const [songImageCover, setSongImageCover] = useState(null);
  const [imageUploadProgress, setImageUploadingProgress] = useState(false);
  const [audioImageCover, setAudioImageCover] = useState(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioUploadProgress, setAudioUploadingProgress] = useState(false);

  const [artistImageCover, setArtistImageCover] = useState(null);
 
  const [artistName, setArtistName] = useState("");
 

  const [albumnImageCover, setAlbumImageCover] = useState(null);
  
  const [albumName, setAlbumName] = useState("");
  const router=useNavigate()
  const [data,setData]=useState(null)
  const {id}=useParams()
  useEffect(() => {

    if(isEdit){
      if(!data){
        getOneSong(id).then((data) => {
        
          setData(data.data)
          // setData(data.song);
         
         
        });
      }else{
        console.log(data)
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
     
    }
    
  }, [isEdit,data,dispatch]);
  
  const saveSong = () => {
   
    if (!songImageCover || !audioImageCover ) {
    toast.info('fill all field')
    } else {
    
 
      const data=     {
        "artistName": artistName,
        "artistImageURL": artistImageCover,
        "albums": [
            {
                "albumName": albumName,
                "albumImageURL":albumnImageCover,
                "songs": [
                    {
                        "songName": songName,
                        "songImageURL": songImageCover,
                        "songURL": audioImageCover,
                        "category": gener
                    }
                ]
            }
        ]
    }
    
    
      
      
   if(isEdit){
    const updatedata=     {
      "artistName": artistName,
      "artistImageURL": artistImageCover,
      
          
              "albumName": albumName,
              "albumImageURL":albumnImageCover,
              
                      "songName": songName,
                      "songImageURL": songImageCover,
                      "songURL": audioImageCover,
                      "category": gener
                
  }
    dispatch({ type: 'user/updateSong',payload:{updatedata,id} })
       
      
    dispatch({ type: 'user/fetchAllSongs' });
 
    router('/dashboard/songs')
   }else{
    dispatch({type:"user/saveNewSong",payload:{data}})
    // dispatch({type:"user/user/fetchAllSongs"})
    dispatch({ type: 'user/fetchAllSongs' });
    router('/dashboard/songs')
   }
      
      
    }
  };

  

  
  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 ">
      
    <TextInput name={songName} setName={setSongName} placeholder={'Song Name'}/>

    <ImageInput isimageLoading={isimageLoading} setIsImageLoading={setIsImageLoading} imageUploadProgress={imageUploadProgress} setImageUploadingProgress={setImageUploadingProgress} ImageCover={songImageCover} setImageCover={setSongImageCover} url={'song'}/>
    

    <AudioInput audioUploadProgress={audioUploadProgress} audioImageCover={audioImageCover} setAudioImageCover={setAudioImageCover} setAudioUploadingProgress={setAudioUploadingProgress} setIsAudioLoading={setIsAudioLoading} isAudioLoading={isAudioLoading} />

    

    <p className="text-xl font-semibold text-headingColor ">Artist Details</p>
    
    <TextInput name={artistName} setName={setArtistName} placeholder={'Artist Name'}/>
   <ImageInput isimageLoading={isArtistImageLoading} setIsImageLoading={setIsArtistImageLoading} imageUploadProgress={imageUploadProgress} setImageUploadingProgress={setImageUploadingProgress} ImageCover={artistImageCover} setImageCover={setArtistImageCover} url={'artist'}/>
   
  

    <p className="text-xl font-semibold text-headingColor my-3">Album Details</p>
   <TextInput name={albumName} setName={setAlbumName} placeholder={'Album Name'}/>
     <ImageInput isimageLoading={isAlbumImageLoading} setIsImageLoading={setIsAlbumImageLoading} imageUploadProgress={imageUploadProgress} setImageUploadingProgress={setImageUploadingProgress} ImageCover={albumnImageCover} setImageCover={setAlbumImageCover} url={'album'}/>
   
<TextInput setName={setGener} name={gener}  placeholder={'Genre Name'}/>
<div className="flex items-center justify-center w-60 cursor-pointer p-4">
      {isimageLoading || isAudioLoading ? (
        <DisableButton
         />
      ) : (
        <motion.button
          className="px-8 py-2 w-full rounded-md text-white bg-red-600 hover:shadow-lg"
          onClick={() => saveSong()}
        >
          Save song
        </motion.button>
      )}
    </div>
  </div>
  );
};
export default DashboardNewSong