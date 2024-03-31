import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, FormControl, Button, Container } from 'react-bootstrap';
import { fetchAsyncSearch } from '../../Store/Reducers/searchSlice';
import { useSelector } from "react-redux";
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Navbar as BootstrapNavbar } from 'react-bootstrap'; // Import other components separately if needed

const SearchPage = () => {
  const searchResultsRedux = useSelector((state) => state.search.searchResults);
  const dispatch = useDispatch(); // Correct import and usage of useDispatch
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStatus, setSearchStatus] = useState('idle');
  const history = useHistory(); // Import and initialize useHistory hook

  const handleSearch = async () => {
    dispatch(fetchAsyncSearch({ keyword: searchTerm }))
      .then(() => {
        if (history.location.pathname === '/Explore') {
         
        } else {
          // If not on the home page, redirect to the search page
          history.push(`/Explore`);
        }
      })
      .catch(error => {
        console.error('Error searching profiles:', error);
        setSearchStatus('failed');
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="search-container">
          <form className="d-flex align-items-center m-0">
            <input 
              type="text" 
              placeholder="Search" 
              className="form-control form_input rounded  ms-3 search-input" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button 
              type="button" 
              className="btn-2 ms-3 search-button" 
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </div>
        {searchResultsRedux.length === 0 ? (
          <p className='fw-bold text-white mt-3'>No results found in the user list.</p>
        ) : (
          // Map through searchResults and render user profiles
          searchResultsRedux.map((profile) => (
            <div className=''>
            <div className='users'>
            <div className='d-flex mt-3 ps-2' style={{ border: '0.5px solid  #401f71', backgroundColor: '#f4f0f0', borderRadius: '0.25rem' }}>
                  <div key={profile.id} className="d-flex row">
                    <div className="col d-flex align-items-center big">
                      <Link to={`/OtherProfile/${profile.user_account}`}>
                        {profile.image ? (
                          <img
                            src={profile.image}
                            alt="Owner"
                            className="rounded-circle me-2 mb-2 mt-3"
                            style={{ width: "50px", height: "50px" }}
                          />
                        ) : (
                          <div>No Image Available</div>
                        )}
                      </Link>
                      <div className='ms-4'>
                        <span className='fw-bold text-dark' style={{ textTransform: 'capitalize' }}>{profile.first_name} {profile.last_name}</span>
                      </div>
                    </div>
                  </div> 
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.AuthRecducer.isAuthenticated,
  user: state.AuthRecducer.user,
  userProfile: state.AuthRecducer.userProfile,
});

export default connect(mapStateToProps)(SearchPage);
