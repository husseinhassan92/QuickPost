import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.js';
import Posts from './Components/Posts/Posts';
import Post from './Components/Post/Post';
import SearchPage from './Pages/SearchPage/SearchPage';
import Messages from './Messages';
import { Provider } from "react-redux";
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


const App = () => {
  return (
    <Provider store={store}>
      <Router>
      <Route
            render={({ location }) => {
              if (location.pathname !== "/" && location.pathname !== "/Sginup" && location.pathname !== "/Login") return <Navbar />;
            }}
          />
        <Switch>
          <Route exact path='/' component={Welcom} />
          <Route path='/Login' component={Login} />
          <Route path='/Sginup' component={Sginup} />
          <Route path='/Sginup' component={Sginup} />
          <Route path='/Friends' component={Friends} />
          <Route path='/profile' component={Profile} />

          <Route path="/Posts" component={Posts} />
          <Route path="/Search/:searchTerm" component={SearchPage} />
          <Route path="/post/:id" component={Post} />
          <Route path="/Messages" component={Messages} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;


