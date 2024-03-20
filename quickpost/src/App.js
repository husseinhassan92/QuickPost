import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.js';
import Login from './Pages/Login/Login';
import Sginup from './Pages/SginUp/SginUp';
import Welcom from './Pages/WelcomePage/Welcom';
import Home from './Pages/HomePage/Home.js';
import Post from './Components/Post/Post';
import Friends from './Pages/FriendsPage/Friends';
import Profile from './Pages/Profile/Profile';
import ResetPassword from './Pages/ResetPassword/ResetPassword.js';
import ResetPasswordConfirm from './Pages/ResetPasswordConfirm/ResetPasswordConfirm.js';
import Activate from './Pages/Activate/Activate.js';
import SearchPage from './Pages/SearchPage/SearchPage';
import Messages from './Messages';
import { Provider, useSelector } from "react-redux";
import store from "./Store/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Error from './Components/Error/Error.js';


const App = () => {
  const  isLoggedIn = useSelector(state => state.AuthRecducer.isAuthenticated)
  console.log(isLoggedIn)
  return (
    
      <Router>
        {isLoggedIn && <Home />}
        <Switch>
          <Route exact path='/' component={Welcom} />
          {/* <Route path='*' component={Error} /> */}
          <Route path='/Login' component={Login} />
          <Route path='/home' component={Home} />
          <Route path='/Sginup' component={Sginup} />
          <Route path='/Friends' component={Friends} />
          <Route path='/profile' component={Profile} />
          <Route path="/Search/:searchTerm" component={SearchPage} />
          <Route path="/post/:id" component={Post} />
          <Route path="/Messages" component={Messages} />
          <Route  path='/reset-password' component={ResetPassword} />
          <Route  path='/password/reset/confirm/:uid/:token'component={ResetPasswordConfirm} />
          <Route exact path='/activate/:uid/:token' component={Activate} />
        </Switch>
      </Router>
  );
};

export default App;


