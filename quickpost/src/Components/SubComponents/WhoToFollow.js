import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function WhoToFollow({ path, imgname, useraccount, bio }) {
    // Use useSelector hook to access searchResults from Redux store
    const searchResults = useSelector((state) => state.search.searchResults);

    return (
        <div className="container">
            <div className="row">
                <div className='parent_sideleft'>
    <div className='suggested_users'>
        <div className='d-flex parent_sideleft'>
            {/* Check if searchResults is empty */}
            {searchResults.length === 0 ? (
                <p className='fw-bold text-white'>No results found in the user list.</p>
            ) : (
                // Map through searchResults and render user profiles
                searchResults.map((profile) => (
                    <div key={profile.id} className="row">
                        <div className="col d-flex align-items-center">
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
                            <div className='ms-4'>
                                <span className='fw-bold text-white' style={{ textTransform: 'capitalize' }}>{profile.first_name} {profile.last_name}</span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
</div>

            </div>
        </div>
    );
}

export default WhoToFollow;
