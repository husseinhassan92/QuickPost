import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Navbar from '../../Components/Navbar/Navbar'
import Leftbar from '../../Components/LeftSide/LeftSide'
import Rightbar from '../../Components/RightSide/RightSide'
import SearchPage from '../SearchPage/SearchPage'
import { connect } from 'react-redux'
import Profile from '../Profile/Profile'
import './profilePage.css';
const HomePage = ({ isAuthenticated, user, userProfile}) => {
  return (
    <div className="container-fluid">

      <div className="row">
        <div className='d-flex'>
          <div className="left-side  col-2 ">
            <Leftbar />
          </div>
          {/* <div className='mx-2 fixed-top  style={{ background: 'rgb(238, 238, 238)' }}'>
              <Navbar/>
          </div> */}
          <div className="middle   col-10  rounded-3 ">
            <Profile/>
          </div>
          {/* <div className='right-side col-lg-3   style={{ background: 'rgb(238, 238, 238)' }}'>
            <Rightbar />
          </div> */}
        </div>
      </div>
      </div>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.AuthRecducer.isAuthenticated,
  user: state.AuthRecducer.user,
});

export default connect(mapStateToProps)(HomePage);
