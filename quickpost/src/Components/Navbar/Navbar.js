import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import { Navbar as BootstrapNavbar, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import './Navbar.css';
import image from "../../images/image1.jpg";

const Navbar = () => { // Remove 'history' from props
  const history = useHistory(); // Get history object using useHistory hook
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
  const [searchTerm, setSearchTerm] = useState(""); // State to manage search term

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Function to handle search
  const handleSearch = () => {
    // Navigate to the search page with the search term as a query parameter
    history.push(`/search?term=${searchTerm}`);
    // Do something with the search term, such as navigating to a search page
    console.log("Searching for:", searchTerm);
  };

  return (
    <nav>
      <div className='container-fluid p-1'>
        <div className='row flex align-items-center justify-content-between m-0 '>

          {/* Left Part - Logo */}
          <div className="col p-0">
            <BootstrapNavbar bg="light" expand="lg" className="p-0">
              <BootstrapNavbar.Brand href="#" className="p-1">Quick Post</BootstrapNavbar.Brand>
            </BootstrapNavbar>
          </div>

          {/* Middle Part - Links */}
          <div className="col p-0">
            <BootstrapNavbar bg="light" expand="lg" className="p-0">
              <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
              <BootstrapNavbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-5">
                  <Link to="/" className="nav-link"><i className="fas fa-home"></i> Home</Link>
                  <Link to="/Post" className="nav-link"><i className="fas fa-user"></i>Post</Link>
                  <Link to="/messages" className="nav-link"><i className="fas fa-comments"></i> Messages</Link>
                  {/* Add more links as needed */}
                </Nav>
              </BootstrapNavbar.Collapse>
            </BootstrapNavbar>
          </div>

          {/* Right Part - Search and Dropdown */}
          <div className="col p-0">
            <BootstrapNavbar bg="light" expand="lg" className="p-0">
              <div className="navbar-search d-flex align-items-center m-0">
                <Form className="d-flex align-items-center m-0">
                  <FormControl type="text" placeholder="Search" className="mr-sm-2 ms-3" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <Button variant="outline-success" className="ms-3" onClick={handleSearch}>Search</Button>
                </Form>
                
                {/* Profile photo and dropdown */}
                <div className="ml-3 ms-4">
                  <img src={image} alt="Profile" className="rounded-circle" onClick={toggleDropdown} style={{ cursor: 'pointer', width: '40px', height: '40px' }} />
                  {showDropdown && (
                    <Dropdown align="end" className="mt-0 ms-2" show={showDropdown} onClose={() => setShowDropdown(false)}>
                      <Dropdown.Menu className='mt-2 txt-center'>
                        <Link to="/action-1" className="dropdown-item ">Action</Link>
                        <Link to="/action-2" className="dropdown-item">Another action</Link>
                        <Link to="/logout" className="dropdown-item">Logout <i className="fas fa-sign-out-alt fa-lg"></i></Link>
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
