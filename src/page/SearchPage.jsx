import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import SongsContainer from "../components/HomeContainer";
import { ChevronRight, Home } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
export default function SearchPage() {
    const dispatch = useDispatch();
  const searchBy = useSelector((state) => state.user.searchBy);
  const searchSong = useSelector((state) => state.user.searchSong);
  const isSearch = useSelector((state) => state.user.isSearch);
  const [isLoading, setIsLoading] = useState(false);

  

  return (
    <div className="w-screen h-auto flex flex-col  justify-center ">
    <Header />
    <nav className="flex mb-8 mx-10 my-5" aria-label="Breadcrumb">
  <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    <li className="inline-flex items-center">
      <NavLink href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
        <Home/>
        Home
      </NavLink>
    </li>
    <li >
      <div className="flex items-center">
        <ChevronRight className='rtl:rotate-180 w-3 h-3 text-gray-400 mx-1'/>
        <span className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
         Search Result
        </span>
      </div>
    </li>
    {searchBy && <li >
      <div className="flex items-center">
        <ChevronRight className='rtl:rotate-180 w-3 h-3 text-gray-400 mx-1'/>
        <span className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
         {searchBy}
        </span>
      </div>
    </li>}
   
  </ol>
</nav>
    <div className="w-screen mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 items-center justify-evenly">
       {isSearch && <div className="flex items-center"> <CircularProgress/></div>}
      {!isSearch && searchBy && !searchSong && <div>No Search Found For {searchBy}</div>}
      
      {!isSearch && searchSong && searchSong.map((artist,i)=>{
      return  artist.albums.map((album,index)=>(
        <SongsContainer key={index} data={album} artistIndex={i} artistName={artist.artistName} albumIndex={index}/>
        ))
       })}
         
       
      
    </div>
  </div>
  )
}
