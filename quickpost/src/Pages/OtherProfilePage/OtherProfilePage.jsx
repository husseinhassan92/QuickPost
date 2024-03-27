import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Navbar from '../../Components/Navbar/Navbar'
import Leftbar from '../../Components/LeftSide/LeftSide'
import Rightbar from '../../Components/RightSide/RightSide'
import SearchPage from '../SearchPage/SearchPage'
import { connect } from 'react-redux'
import Profile from '../Profile/Profile'
import OtherProfile from '../OtherProfile/OtherProfile'

const HomePage = ({ isAuthenticated, user, userProfile}) => {
  return (
    <>
    <div className="container mt-3 ">
      <div className="row">
        <div className='d-flex'>
          <div className="left-side col-lg-3 col-2 vh-100">
            <Leftbar />
          </div>
          <div className="middle col-lg-9  col-11 border rounded-3">
            <OtherProfile/>
          </div>
          {/* <div className='right-side col-lg-3 '>
            <Rightbar />
          </div> */}
        </div>
      </div>
    </div>
  </>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.AuthRecducer.isAuthenticated,
  user: state.AuthRecducer.user,
});

export default connect(mapStateToProps)(HomePage);
