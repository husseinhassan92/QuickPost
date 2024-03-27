import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, connect, useStore } from 'react-redux';
import { getAllFriends, fetchAsyncFriends } from '../../Store/Reducers/friendSlice';
// import SidebarOption from '../SubComponents/SidebarOption';
// import { CiLogout, CiSearch } from "react-icons/ci";
// import { IoMdLogOut, IoMdNotificationsOutline } from "react-icons/io";
// import { CiMail } from "react-icons/ci";
// import { CiBookmark } from "react-icons/ci";
// import { CiCircleList } from "react-icons/ci";
// import { AiOutlineUser } from "react-icons/ai";
// import { HiHashtag } from "react-icons/hi";
// import { GrHomeRounded } from "react-icons/gr";
// import { SiQuicktime } from "react-icons/si";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "../../Store/Actions/AuthAction";
import './LeftSide.css'
import { Nav } from 'react-bootstrap';


const Leftbar = ({ isHomePage, logout, isAuthenticated }) => {
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
      {/* <SiQuicktime className="sidebar__twitterIcon" />


        <SidebarOption active Icon={GrHomeRounded} text="Home" link={"/home"} />
        <SidebarOption Icon={HiHashtag} text="Explore" link={"/Explore"}  />
        <SidebarOption Icon={IoMdNotificationsOutline} text="Notifications" link={"/notifications"}  />
        <SidebarOption Icon={CiMail} text="Messages" link={""} title={"messages"} />
        <SidebarOption Icon={CiBookmark} text="Bookmarks" link={"/bookmarks"}  />
        <SidebarOption Icon={"bi bi-people-fill"} text="Users" link={"/friends"}  />
        <SidebarOption Icon={AiOutlineUser} text="Profile" link={"/profile"}  />
        <Link to="/friends" className="dropdown-item">Friends</Link>

        Button -> Logout */}
        {/* ============================================================ */}
      <div className="leftSide vh-100 d-flex flex-column gap-4 bg-dark" style={{ width: '80px' }}>

        {/* <!--==== Logo ====--> */}
        <Link to="/home" className="links-active my-2">
        <i class="bi bi-quora fs-2"></i>
        <span className="icon m-0 fs-3">uickPost</span>
        </Link>
        {/* <!--==== Navbar ====--> */}
        <Nav className="mainNav d-flex flex-column gap-3 align-items-center">

          <Link to="/home" className="links-active mb-6">
            <i className="bi bi-house-door-fill fs-5"></i>
            <span className="icon">Home</span>
          </Link>
          <Link to="/Explore" className="links mb-6">
            <i class="bi bi-search-heart fs-5"></i>
            <span className="icon">Explore</span>
          </Link>
          <Link to="/friends" className="links mb-6">
          <i class="bi bi-people-fill fs-5"></i>
            <span className="icon">Users</span>
          </Link>
          <Link to="/profile" className="links mb-6">
            <i className="bi bi-person-fill fs-5"></i>
            <span className="icon">Profile</span>
          </Link>
          <Link to="/" className="links" onClick={logout_user} id="bg_logout">
          <i class="bi bi-box-arrow-right fs-5"></i>
          <span className="d-lg-block d-none icon">Logout</span>
          </Link>
        </Nav>
        
      </div>

    </>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.AuthRecducer.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Leftbar);

