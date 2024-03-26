import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Navbar from '../../Components/Navbar/Navbar'
import Leftbar from '../../Components/LeftSide/LeftSide'
import Rightbar from '../../Components/RightSide/RightSide'
import Posts from '../../Components/Posts/Posts'
import SearchPage from '../SearchPage/SearchPage'
import Messages from '../../Messages'
import { connect } from 'react-redux'

const HomePage = ({ isAuthenticated, user, userProfile}) => {
  return (
    <>
    <div className="container mt-3">
      <div className="row">
        <div className='d-flex'>
          <div className="left-side col-lg-3 col-1 me-2 mt-5">
            <Leftbar />
          </div>
          <div className='mx-2 fixed-top'>
              <Navbar/>
          </div>
          <div className="middle col-lg-6 col-11 position-relative  rounded-3 mx-2 mt-5">
            <Posts />
          </div>
          <div className='right-side col-lg-3 mt-5'>

          <Rightbar isActive={true} />             
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

export default connect(mapStateToProps)(HomePage);
