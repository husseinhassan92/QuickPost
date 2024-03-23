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
    <div>
        <Leftbar/>
        <Posts/>
        <Rightbar/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.AuthRecducer.isAuthenticated,
  user: state.AuthRecducer.user,
});

export default connect(mapStateToProps)(HomePage);
