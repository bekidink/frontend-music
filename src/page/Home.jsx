import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import SongsContainer from "../components/HomeContainer";





// Home component to render the header and song lists
const Home = () => {
  const dispatch = useDispatch();
  const allSongs = useSelector((state) => state.user.allSongs);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!allSongs) {
      setIsLoading(true);
      dispatch({ type: 'user/fetchAllSongs' });
    } else {
      setIsLoading(false);
    }
  }, [allSongs, dispatch]);

  return (
    <div className="w-screen h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <div className="w-screen mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 items-center justify-evenly">
         {!allSongs && <CircularProgress/>}
          
            {/* {allSongs && allSongs.map((artist, artistIndex) => (
              <SongsContainer key={artistIndex} artistIndex={artistIndex} data={artist.albums} artistName={artist.artistName} />
            ))} */}
         {allSongs && allSongs.map((artist,i)=>{
        return  artist.albums.map((album,i)=>(
            <SongsContainer key={i} data={album} artistIndex={i} artistName={artist.artistName}/>
          ))
         })}
        
      </div>
    </div>
  );
};

export default Home;
