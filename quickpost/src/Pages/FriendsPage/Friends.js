import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncFriends, getAllFriends } from '../../Store/Reducers/friendSlice';
import { Card, Container, Row, Spinner, Alert, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link
import "./Friends.css";
import Leftbar from '../../Components/LeftSide/LeftSide';

const Friend = ({ friend }) => {
  
  return (
    <Col xs={12} sm={6} md={3} className='mb-5'>
      <Card className="friend-card h-100 " >
        <Card.Img variant="top" src={friend.picture} alt={friend.Name} />
        <Card.Body>
          <Card.Title>{friend.firstName}</Card.Title>
          <Button  variant="danger">
          <i className="fa-solid fa-heart-broken"></i> unfriend
          </Button>        
        </Card.Body>
      </Card>
    </Col>
  );
};

const FriendListPage = () => {
  const dispatch = useDispatch();
  const friends = useSelector(getAllFriends);
  const friendsStatus = useSelector(state => state.friends.friendsStatus);

  useEffect(() => {
    dispatch(fetchAsyncFriends());
  }, [dispatch]);

  return (
    <Container>
      <Row>
      <Col  className="px-0" >
        <Leftbar isHomePage={false} />
                </Col>
        <Col sm={9}>
        <h1 className="text-center my-4">Friends List</h1>

          {friendsStatus === 'LOADING' && <Spinner animation="border" />}
          {friendsStatus === 'FAILED' && <Alert variant="danger">Failed to fetch friends.</Alert>}
          {friendsStatus === 'SUCCEEDED' && (
            <Row className="friend-list">
            {friends.map((friend) => (
              <Col key={friend.id}  sm={6} md={4} lg={3} className='mb-4'>
                <Card>
                  <Link to={`/OtherProfile/${friend.user_account}`}> {/* Use friend.id here */ }
                    <Card.Img variant="top" src={friend.image} alt="Friend" style={{ height: "13rem" }} />
                  </Link>
                  <Card.Body>
                  <Card.Title>{friend.first_name.charAt(0).toUpperCase() + friend.first_name.slice(1)}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FriendListPage;
