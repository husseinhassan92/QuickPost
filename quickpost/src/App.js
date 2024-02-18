import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.js';
import Posts from './Components/Posts/Posts';
import SearchPage from './Pages/SearchPage/SearchPage'; 
import Messages from './Messages'; 
import { Provider } from "react-redux";
import store from "./Store/store"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Rightbar from './Components/RightSide/RightSide'; 
import './App.css'; 
import Leftbar from './Components/LeftSide/LeftSide.js';

const App = () => {
  return (
    <Provider store={store}> 
      <Router>
        <Navbar />
        <div className="container-fluid">
          <div className="row p-0">
        
            <div className="col-3 p-0 ">
              <Leftbar />
            </div>
            <div className="col-6 ">
              <Switch>
                <Route exact path="/Post" component={Posts} />
                <Route path="/Search/:searchTerm" component={SearchPage} /> 
                <Route path="/Messages" component={Messages} />
              </Switch>
            </div>
            <div className="col-3 p-0 m-0 ">
              <Rightbar />
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
