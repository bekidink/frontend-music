import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";


import { useDispatch, useSelector } from "react-redux";
const Header = () => {
  
  
  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to={"/"}>
      </NavLink>
      <ul className="flex items-center justify-center ml-7">
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
          <NavLink to={"/dashboard/home"}>
            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
              Dashboard
            </p>
          </NavLink>
        </li>
      </ul>
     
     
    </header>
  );
};

export default Header;
