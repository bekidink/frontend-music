import React  from "react";
import { NavLink } from "react-router-dom";
import { IoAdd,  } from "react-icons/io5";

import FullFeaturedCrudGrid from "../../components/table/Table";
const DashboardSongs = () => {
  
  
  return (
    
    <div className="w-screen p-4 flex items-center justify-center flex-col">
      <div className="w-full flex my-3  gap-20">
        <NavLink
          to={"/dashboard/newSong"}
          className="flex items-center justify-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer"
        >
          <IoAdd />
        </NavLink>
       
      </div>
    
      <FullFeaturedCrudGrid/>
    </div>
  );
};
export default DashboardSongs;

