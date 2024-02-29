import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllFriends, fetchAsyncFriends } from '../../Store/friendSlice';

const Leftbar = ({ isHomePage }) => {
  const dispatch = useDispatch();
  const friends = useSelector(getAllFriends);

  useEffect(() => {
    dispatch(fetchAsyncFriends());
  }, [dispatch]);

  return (
    <div className="leftbar" style={{ height: "100rem" }}>
      <div className="leftbarWrapper">
      <div className="bg-light border-left" id="left-panel" >
          <div className="list-group list-group-flush">
            <a href="#" className="list-group-item list-group-item-action bg-light pt-4">
              <i className="fas fa-home"></i> Home
            </a>
            <a href="#" className="list-group-item list-group-item-action bg-light pt-4">
              <i className="fas fa-user-friends"></i> Friends
            </a>
            <a href="#" className="list-group-item list-group-item-action bg-light border-bottom pt-4">
              <i className="fas fa-comment"></i> Messages
            </a>
          </div>
        </div>
        {isHomePage && (
          <ul className="list-unstyled bg-light">
            {friends.map((friend) => (
              <li key={friend.id} className="mb-3">
                <div className='d-flex align-items-center'>
                  <img src={friend.picture} alt="Owner" className='rounded-circle me-2' style={{ width: '50px', height: '50px' }} />
                  <div>{friend.firstName}</div>
                </div>
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Leftbar;
