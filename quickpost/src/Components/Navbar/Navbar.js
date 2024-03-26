import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { logout } from "../../Store/Actions/AuthAction";
import { fetchAsyncSearch } from '../../Store/Reducers/searchSlice';
import "./Navbar.css";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const MyNavbar = ({ logout, isAuthenticated }) => {
  const history = useHistory();
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState('idle');
  const logout_user = () => {
    logout();
    setRedirect(true);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearch = async () => {
    dispatch(fetchAsyncSearch({ keyword: searchTerm }))
      .then(() => {
        if (history.location.pathname === '/home') {
          // If on the home page, perform search action directly
          // Example: console.log('Search directly on the home page');
          // Implement your search action here
        } else {
          // If not on the home page, redirect to the search page
          // history.push(`/search/${searchTerm}`);
          history.push(`/home`);

        }
      })
      .catch(error => {
        console.error('Error searching profiles:', error);
        setSearchStatus('failed');
      });
  };

  return (
    // <nav className='container-fluid p-1'>
    //   <div className='container-fluid p-1 b' bg="dark">
    //     <div className='row flex align-items-center justify-content-between m-0 '>
    //       <div className="col p-0">
    //         <BootstrapNavbar bg="dark" expand="lg" className="p-0">
    //           <BootstrapNavbar.Brand href="#" className="logo p-1">Quick Post</BootstrapNavbar.Brand>
    //         </BootstrapNavbar>
    //       </div>

    //       <div className="col p-0">
    //         <BootstrapNavbar bg="dark" expand="lg" className="p-0"></BootstrapNavbar>
    //       </div>


    //       <div className="col p-0">
    //         <BootstrapNavbar bg="dark" expand="lg" className="p-0">
    //           <BootstrapNavbar.Collapse>
    //             <Form className="d-flex align-items-center m-0">
    //               <FormControl type="text" placeholder="Search" className="mr-sm-2 ms-3" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    //               <Button variant="outline-primary" className="ms-3" onClick={handleSearch}>Search</Button>
    //             </Form>

    //             <div className="ml-3 ms-4">
    //               <img src={profileImage} alt="Profile" className="rounded-circle" onClick={toggleDropdown} style={{ cursor: 'pointer', width: '40px', height: '40px' }} />
    //               {showDropdown && (
    //                 <Dropdown align="end" className="mt-0 ms-2" show={showDropdown} onClose={() => setShowDropdown(false)}>
    //                   <Dropdown.Menu className='mt-2 txt-center'>
    //                     <Link to="/profile" className="dropdown-item ">Profile</Link>
    //                     <Link to="/friends" className="dropdown-item">Friends</Link>
    //                     <Link to="/" className="dropdown-item" onClick={logout_user}>Logout <i className="fas fa-sign-out-alt fa-lg"></i></Link>
    //                   </Dropdown.Menu>
    //                 </Dropdown>
    //               )}
    //             </div>
    //           </BootstrapNavbar.Collapse>
    //         </BootstrapNavbar>
    //       </div>
    //     </div>
    //   </div>
    // </nav>

    <Navbar className="bg-dark ">
      <Container>
        <Navbar.Brand href="#" className='text-primary'>QuickPost</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className='text-white'>
            Signed in as: <a href="#">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.AuthRecducer.isAuthenticated
});

export default connect(mapStateToProps, { logout })(MyNavbar);
