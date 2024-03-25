import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const SearchPage = () => {
  const searchResults = useSelector((state) => state.search.searchResults);

  return (
    <main>
      <div className="search-content bg-white">
        <div className="container">
          <div className="py-5">
            <div className="title-md">
              <h3>Search results:</h3>
            </div>
            <div>
            {searchResults.length === 0 ? (
  <p>No results found in the user list.</p>
) : (
  searchResults.map((profile) => (
    <div key={profile.id}>
      <Link to={`/OtherProfile/${profile.user_account}`}>
        {profile.image ? (
          <img
            src={profile.image}
            alt="Owner"
            className="rounded-circle me-2 mb-2"
            style={{ width: "50px", height: "50px" }}
          />
        ) : (
          <div>No Image Available</div>
        )}
      </Link>
      <p>First Name: {profile.first_name}</p>
      <p>Last Name: {profile.last_name}</p>
    </div>
  ))
)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
