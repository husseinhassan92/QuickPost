import React from 'react';
import "./RightSide.css";
import { FiSearch } from "react-icons/fi";
import WhoToFollow from '../SubComponents/WhoToFollow';
// import userProfile from "./../../images/user_profile.jpg"
const Rightbar = () => {
  const HomeRightbar = () => {
    return (
      <div className='rightBar container vh-100'>
        <div className='row'>
          <div className="" id="left-panel">
            <div className="">
                <div className="search_parent">
                  <div className="search_icon">
                    <FiSearch className='text-neutral-500 text-xl' />
                  </div>
                  <input type="text" id="search-navbar" placeholder="Search..." />
                </div>
              </div>
              <div className='d-flex gap-1'>
              <WhoToFollow useraccount={"Saadawy10"} bio={"work as frontend"} imgname={"user"}/>
              </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <HomeRightbar />
      </div>
    </div>
  );
}

export default Rightbar;
