import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchAsyncSearch } from '../../Store/searchSlice';
import './Navbar.css';
import image from "../../images/image1.jpg";
import axios from 'axios';

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://retoolapi.dev/p2SxxC/data', {
        params: {
          searchTerm: searchTerm // Correct parameter name
        }
      });

      console.log(response.data); // Log entire response

      await dispatch(fetchAsyncSearch({ keyword: searchTerm }));

      // Correct the redirect URL
      history.push(`/Search?term=${encodeURIComponent(searchTerm)}`);
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };

  return (
    <nav>
      <div className='container-fluid p-1'>
        <div className='row flex align-items-center justify-content-between m-0 '>
          <div className="col p-0">
            <BootstrapNavbar bg="light" expand="lg" className="p-0">
              <BootstrapNavbar.Brand href="#" className="p-1">Quick Post</BootstrapNavbar.Brand>
            </BootstrapNavbar>
          </div>

          <div className="col p-0">
            <BootstrapNavbar bg="light" expand="lg" className="p-0">
              <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
              <BootstrapNavbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-5">
                  <Link to="/" className="nav-link"><i className="fas fa-home"></i> Home</Link>
                  <Link to="/Posts" className="nav-link"><i className="fas fa-user"></i>Posts</Link>
                  <Link to="/messages" className="nav-link"><i className="fas fa-comments"></i> Messages</Link>
                </Nav>
              </BootstrapNavbar.Collapse>
            </BootstrapNavbar>
          </div>

          <div className="col p-0">
            <BootstrapNavbar bg="light" expand="lg" className="p-0">
              <div className="navbar-search d-flex align-items-center m-0">
                <Form className="d-flex align-items-center m-0">
                  <FormControl type="text" placeholder="Search" className="mr-sm-2 ms-3" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <Button variant="outline-success" className="ms-3" onClick={handleSearch}>Search</Button>
                </Form>
                
                <div className="ml-3 ms-4">
                  <img src={image} alt="Profile" className="rounded-circle" onClick={toggleDropdown} style={{ cursor: 'pointer', width: '40px', height: '40px' }} />
                  {showDropdown && (
                    <Dropdown align="end" className="mt-0 ms-2" show={showDropdown} onClose={() => setShowDropdown(false)}>
                      <Dropdown.Menu className='mt-2 txt-center'>
                        <Link to="/profile" className="dropdown-item ">Profile</Link>
                        <Link to="/friends" className="dropdown-item">Friends</Link>
                        <Link to="/" className="dropdown-item">Logout <i className="fas fa-sign-out-alt fa-lg"></i></Link>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </div>
            </BootstrapNavbar>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
