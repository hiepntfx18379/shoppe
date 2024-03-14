import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Navbar from "../../home/navbar/Navbar";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className={`w-[90%] m-auto grid grid-cols-[190px,1fr]`}>
        <div className="w-[160px] 800px:w-[335px] sticky ">
          <SideBar />
        </div>
        <div className="w-[100%] bg-white">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Profile;
