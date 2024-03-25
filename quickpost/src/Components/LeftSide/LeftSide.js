import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, connect, useStore } from 'react-redux';
import { getAllFriends, fetchAsyncFriends } from '../../Store/Reducers/friendSlice';
import SidebarOption from '../SubComponents/SidebarOption';
import { CiLogout, CiSearch } from "react-icons/ci";
import { IoMdLogOut, IoMdNotificationsOutline } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { CiCircleList } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { HiHashtag } from "react-icons/hi";
import { GrHomeRounded } from "react-icons/gr";
import { SiQuicktime } from "react-icons/si";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "../../Store/Actions/AuthAction";


const Leftbar = ({ isHomePage ,logout, isAuthenticated}) => {
  const [redirect, setRedirect] = useState(false);

    const logout_user = () => {
        logout();
        setRedirect(true);
    };
  // const dispatch = useDispatch();
  // const friends = useSelector(getAllFriends);

  // useEffect(() => {
  //   dispatch(fetchAsyncFriends());
  // }, [dispatch]);

  return (
    <>
      <div className="sidebar vh-100 bg-dark">
        <SiQuicktime className="sidebar__twitterIcon" />

        <SidebarOption active Icon={GrHomeRounded} text="Home" link={"/home"} title={"home"} />
        <SidebarOption Icon={HiHashtag} text="Explore" link={"/search"} title={"search"} />
        <SidebarOption Icon={IoMdNotificationsOutline} text="Notifications" link={"/notifications"} title={"notifications"} />
        <SidebarOption Icon={CiMail} text="Messages" link={""} title={"messages"} />
        <SidebarOption Icon={CiBookmark} text="Bookmarks" link={"/bookmarks"} title={"bookmarks"} />
        <SidebarOption Icon={CiCircleList} text="Users" link={"/friends"} title={"friends"} />
        <SidebarOption Icon={AiOutlineUser} text="Profile" link={"/profile"} title={"profile"} />
        {/* <Link to="/friends" className="dropdown-item">Friends</Link> */}

        {/* Button -> Logout */}
          <CiLogout className="fs-5 " />
        <Link  to="/" className={`sidebarOption bg_logout`} onClick={logout_user}>
          <h2 className="d-lg-block d-none">Logout</h2>
        </Link>
      </div>
    </>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.AuthRecducer.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Leftbar);

