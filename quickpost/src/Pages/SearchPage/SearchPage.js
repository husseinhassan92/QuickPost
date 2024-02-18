import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncSearch, getSearchResults, getSearchStatus, clearSearch } from '../../Store/searchSlice';
import Posts from '../../Components/Posts/Posts'; // Import the Posts component

const SearchPage = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useParams();
  const searchResults = useSelector(getSearchResults); // Changed from getSearchProducts
  const searchStatus = useSelector(getSearchStatus); // Changed from getSearchProductsStatus

  useEffect(() => {
    dispatch(clearSearch());
    if (searchTerm) {
      dispatch(fetchAsyncSearch(searchTerm)); // Changed from fetchAsyncSearchProduct
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
              <Posts posts={searchResults} isLoading={searchStatus === 'loading'} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default SearchPage;
