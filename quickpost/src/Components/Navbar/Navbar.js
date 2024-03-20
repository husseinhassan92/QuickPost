import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { logout } from "../../Store/Actions/AuthAction";

const Navbar = ({ logout, isAuthenticated }) => {
  const history = useHistory();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [redirect, setRedirect] = useState(false);

  const logout_user = () => {
    logout();
    setRedirect(true);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://dummyapi.io/data/v1/user/60d0fe4f5311236168a10a19', {
        headers: {
          'app-id': "65d08f07b536e68ad8626e8c",
          'Content-Type': 'application/json'
        }
      });
      setProfileImage(response.data.picture);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://retoolapi.dev/p2SxxC/data', {
        params: {
          searchTerm: searchTerm // Correct parameter name
        }
      });

      console.log(response.data); // Log entire response

      // Correct the redirect URL
      history.push(`/Search?term=${encodeURIComponent(searchTerm)}`);
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };

  return (
    <>
    <nav className='mainNav d-lg-block d-none'>
      <div className=' container shadow p-1 my-3 '>
        <div className='row container'>
          <div className='col-6 bg-dark p-3 mx-auto fixed-top'>
            <div className='d-flex justify-content-between '>

              <BootstrapNavbar expand="lg" className="p-0">
                <BootstrapNavbar.Brand href="#" className="p-1"><Link to='/home' className='text-decoration-none'>Quick Post</Link></BootstrapNavbar.Brand>
              </BootstrapNavbar>

              <BootstrapNavbar expand="lg" className="p-0">
                <BootstrapNavbar.Collapse>
                  <div className="ml-3 ms-4">
                    <img src={profileImage} alt="Profile" className="rounded-circle" onClick={toggleDropdown} style={{ cursor: 'pointer', width: '40px', height: '40px' }} />
                    {showDropdown && (
                      <Dropdown align="end" className="mt-0 ms-2" show={showDropdown} onClose={() => setShowDropdown(false)}>
                        <Dropdown.Menu className='mt-2 txt-center'>
                          <Link to="/profile" className="dropdown-item ">Profile</Link>
                          <Link to="/friends" className="dropdown-item">Friends</Link>
                          <Link to="/" className="dropdown-item" onClick={logout_user}>Logout <i className="fas fa-sign-out-alt fa-lg"></i></Link>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                </BootstrapNavbar.Collapse>
              </BootstrapNavbar>

            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
    
    
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.AuthRecducer.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);
