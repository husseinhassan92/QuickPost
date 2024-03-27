import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Navbar from '../../Components/Navbar/Navbar'
import Leftbar from '../../Components/LeftSide/LeftSide'
import Rightbar from '../../Components/RightSide/RightSide'
import Posts from '../../Components/Posts/Posts'
import SearchPage from '../SearchPage/SearchPage'
import Messages from '../../Messages'
import { connect } from 'react-redux'
import { loadUserProfileById } from "../../Store/Actions/AuthAction"; 

const HomePage = ({ isAuthenticated, user, userProfile, loadUserProfileById}) => {
  if (user){loadUserProfileById(user.id);}
  return (
    <>
    <div className="container mt-3">
      <div className="row">
        <div className='d-flex'>
          <div className="left-side col-2 me-3 mt-5">
            <Leftbar />
          </div>
          {/* <div className='mx-2 mb-3 fixed-top'>
              <Navbar/>
          </div> */}
          <div className="middle  col-10  rounded-3  mt-5">
            <Posts />
          </div>
          {/* <div className='right-side col-lg-2 mt-5'>
          <Rightbar isActive={true} />             
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

export default connect(mapStateToProps,{loadUserProfileById})(HomePage);
