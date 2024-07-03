import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import { useForm } from "react-hook-form";
const Header = () => {
  const navigate=useNavigate()
  const { register,handleSubmit,reset}=useForm()
  const dispatch=useDispatch()
function handleSearch(data){
  const{query}=data
  
  dispatch({ type: 'user/searchSong',payload: { query,navigate } });
  
}
  
  return (
    <header className="flex h-16 shadow-sm  bg-slate-700   w-screen p-4 md:py-2 md:px-6">
      
      <ul className="w-1/3 flex  items-center justify-center ml-7">
        <li className="mx-5 text-lg">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Home
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink to={"/dashboard/home"}className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }>
              Dashboard
            
          </NavLink>
        </li>
     
      </ul>
      <form className="col-span-8 flex  items-center justify-between mx-auto w-2/3" onSubmit={handleSubmit(handleSearch)}>   
    <div className=" flex w-2/3">
        
        <input {...register("query")} type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by Song,Artist and Genre" required />
        <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
       <Search className='w-4 h-4 me-2'/>
      
    </button>
    </div>
    
</form>
     
    </header>
  );
};

export default Header;
