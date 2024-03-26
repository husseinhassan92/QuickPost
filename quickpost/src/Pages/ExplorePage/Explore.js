import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Navbar from '../../Components/Navbar/Navbar'
import Leftbar from '../../Components/LeftSide/LeftSide'
import Rightbar from '../../Components/RightSide/RightSide'
import Posts from '../../Components/Posts/Posts'
import SearchPage from '../SearchPage/SearchPage'
import Messages from '../../Messages'
import { connect } from 'react-redux'

const ExplorePage = ({ isAuthenticated, user, userProfile}) => {
  return (
    <>
    <div className="container-fluid ">
      <div className="row">
        <div className='d-flex'>
          <div className="left-side col-lg-3 col-1 vh-100">
            <Leftbar />
          </div>
          <div className="middle col-lg-6 col-11 mt-3 ">
            <SearchPage />
          </div>
          <div className='right-side col-lg-3 '>

          </div>
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

export default connect(mapStateToProps)(ExplorePage);
