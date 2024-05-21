import React from "react";
import Header from "../../components/Header";
import { NavLink, Route, Routes } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { isActiveStyles, isNotActiveStyles } from "../../utils/styles";

import { useDispatch, useSelector } from "react-redux";
import { BiMenu } from "react-icons/bi";
import DashboardHome from "./DashboardHome";
import DashboardSongs from "./DashboardSongs";
import DashboardNewSong from "./NewSong";
import DashboardEditSong from "./DashboardEditSong";
import { MusicNote } from "@mui/icons-material";
const Dashboard = () => {
  const alertType = useSelector((state) => state.user.alertType);
  const dispatch=useDispatch()
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <div className="w-[60%] my-2  p-4 flex items-center justify-evenly  ">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          <IoHome className="text-2xl text-textColor" />
        </NavLink>
        
        <NavLink
          to={"/dashboard/songs"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          <MusicNote/>
        </NavLink>
       
      </div>
      <span className='md:hidden' >
    <BiMenu className='w-6 h-6 cursor-pointer'/>
</span>

      <div className="my-4 w-full p-4">
        <Routes>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/songs" element={<DashboardSongs />} />
        
          <Route path="/newSong" element={<DashboardNewSong />} />
         
          <Route path="/song/edit/:id" element={<DashboardEditSong />} />
        </Routes>
      </div>
    </div>
  );
};
export default Dashboard;
