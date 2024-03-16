import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncSearch, getSearchResults, getSearchStatus, clearSearch } from '../../Store/Reducers/searchSlice';
import Posts from '../../Components/Posts/Posts'; // Import the Posts component

const SearchPage = () => {
  const dispatch = useDispatch();
  const { term: searchTerm } = useParams(); // Make sure to use the correct parameter name from the route
  const searchResults = useSelector(getSearchResults);
  const searchStatus = useSelector(getSearchStatus);

  useEffect(() => {
    dispatch(clearSearch());
    if (searchTerm) {
      // Update the fetchAsyncSearch action to use the new API endpoint and parameters
      dispatch(fetchAsyncSearch({ keyword: searchTerm }));
    }
  }, [searchTerm, dispatch]);

  return (
    <main>
      <div className='search-content bg-white'>
        <div className='container'>
          <div className='py-5'>
            <div className='title-md'>
              <h3>Search results:</h3>
            </div>
            <br />
            {searchStatus === 'loading' ? (
              <i className="fa-solid fa-hourglass-start"></i>
            ) : searchResults.length === 0 ? (
              <div className='container' style={{ minHeight: "70vh" }}>
                <div className='fw-5 text-danger py-5'>
                  <h3>No results found.</h3>
                </div>
              </div>
            ) : (
              <div>
                {/* Render search elements based on searchResults */}
                {searchResults.map((result, index) => (
                  <div key={index}>
                    {/* Render each search element */}
                    <p>{result.Column1}</p>
                    <p>{result.Column2}</p>
                    <p>{result.Column3}</p>

                    {/* Add more elements as needed */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default SearchPage;
