import React from "react";
import "./Sidebar.css";
// import { Button } from "react-bootstrap";
import SidebarOption from "../SubComponents/SidebarOption";
import { CiLogout, CiSearch } from "react-icons/ci";
import { IoMdLogOut, IoMdNotificationsOutline } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { CiCircleList } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { HiHashtag } from "react-icons/hi";
import { GrHomeRounded } from "react-icons/gr";
import { SiQuicktime } from "react-icons/si";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Sidebar() {
  return (
    <div className="sidebar vh-100 bg-dark">
      <SiQuicktime className="sidebar__twitterIcon" />

      <SidebarOption active Icon={GrHomeRounded} text="Home" link={"/home"} title={"home"}/>
      <SidebarOption Icon={HiHashtag} text="Explore" link={"/search"} title={"search"}/>
      <SidebarOption Icon={IoMdNotificationsOutline} text="Notifications" link={"/notifications"} title={"notifications"}/>
      <SidebarOption Icon={CiMail} text="Messages" link={""} title={"messages"}/>
      <SidebarOption Icon={CiBookmark} text="Bookmarks" link={"/bookmarks"} title={"bookmarks"}/>
      <SidebarOption Icon={CiCircleList} text="Friends" link={"/friends"} title={"friends"}/>
      <SidebarOption Icon={AiOutlineUser} text="Profile" link={"/profile"} title={"profile"}/>
      <SidebarOption Icon={AiOutlineUser} text="CreateProfile" link={"/CreateProfile"} title={"CreateProfile"}/>
      <SidebarOption Icon={AiOutlineUser} text="UpdateProfile" link={"/UpdateProfile"} title={"UpdateProfile"}/>

      {/* Button -> Logout */}
      <Link className={`sidebarOption bg_logout`}>
      <CiLogout className="fs-5 "/>
      <h2 className="d-lg-block d-none">Logout</h2>
    </Link>
    </div>
  );
}

export default Sidebar;
