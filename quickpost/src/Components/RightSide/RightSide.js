import React from 'react';
import "./RightSide.css";
import { Link, useHistory } from 'react-router-dom';

const Rightbar = () => {
  const HomeRightbar = () => {
    return (
      <div className='container-fluid '> 
      <div className='row'>
        <div className="bg-light border-right" id="left-panel">
        <div className="list-group list-group-flush">
        <Link to="./CreateProfile/CreateProfile" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-user-friends"></i> create profile
          </Link>
          <Link to="./UpdateProfile/UpdateProfile" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-user-friends"></i> Update Profile
          </Link>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-home"></i> Home
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-user-friends"></i> Friends
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-comment"></i> Messages
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-home"></i> Home
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-user-friends"></i> Friends
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-comment"></i> Messages
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-home"></i> Home
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-user-friends"></i> Friends
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-comment"></i> Messages
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-home"></i> Home
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-user-friends"></i> Friends
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-comment"></i> Messages
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-home"></i> Home
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-user-friends"></i> Friends
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-comment"></i> Messages
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-home"></i> Home
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-user-friends"></i> Friends
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-comment"></i> Messages
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-home"></i> Home
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-user-friends"></i> Friends
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="fas fa-comment"></i> Messages
          </a>
        </div>
      </div>
      </div>
      </div>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <HomeRightbar />
      </div>
    </div>
  );
}

export default Rightbar;
