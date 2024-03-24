import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.js';
import Posts from './Components/Posts/Posts';
import Post from './Components/Post/Post';
import SearchPage from './Pages/SearchPage/SearchPage';
import Messages from './Messages';
import { Provider, useSelector } from "react-redux";
import store from "./Store/store";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Rightbar from './Components/RightSide/RightSide';
import './App.css';
//import Leftbar from './Components/LeftSide/LeftSide.js';
import Login from './Pages/Login/Login';
import Sginup from './Pages/SginUp/SginUp';
import Welcom from './Pages/WelcomePage/Welcom';
//import HomePage from './Pages/HomePage/HomePage.js';
import Friends from './Pages/FriendsPage/Friends';
import Profile from './Pages/Profile/Profile';
import ResetPassword from './Pages/ResetPassword/ResetPassword.js';
import ResetPasswordConfirm from './Pages/ResetPasswordConfirm/ResetPasswordConfirm.js';
import Activate from './Pages/Activate/Activate.js';
import CreateProfile from './Components/CreateProfile/CreateProfile';
import OtherProfile from './Pages/OtherProfile/OtherProfile';
import HomePage from './Pages/HomePage/HomePage.js';



const App = () => {
  const  isLoggedIn = useSelector(state => state.AuthRecducer.isAuthenticated)
  const  user = useSelector(state => state.AuthRecducer.user)
  console.log(user)
  return (
    
      <Router>
        {isLoggedIn && <Navbar />}
        <Switch>
          <Route exact path='/' component={Welcom} />
          <Route path='/Login' component={Login} />
          <Route path='/Sginup' component={Sginup} />
          <Route path='/Friends' component={Friends} />

          <Route path='/profile' component={Profile} />
          {/* <Route path="/Posts" component={Posts} /> */}
          <Route path="/Search/:searchTerm" component={SearchPage} />
          <Route path="/home" component={HomePage} />

          <Route path="/post/:id" component={Post} />
          <Route path="/Messages" component={Messages} />
          <Route  path='/reset-password' component={ResetPassword} />
          <Route  path='/password/reset/confirm/:uid/:token'component={ResetPasswordConfirm} />
          <Route exact path='/activate/:uid/:token' component={Activate} />
          <Route path="/createprofile" component={CreateProfile} />
          <Route path='/OtherProfile/:id' component={OtherProfile} />
          
        </Switch>
      </Router>
  );
};

export default App;


