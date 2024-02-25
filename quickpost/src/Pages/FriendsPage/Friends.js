import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncFriends, getAllFriends } from '../../Store/friendSlice';
import { Card, Container, Row, Spinner, Alert, Col, Button } from 'react-bootstrap';
import "./Friends.css";
import Leftbar from '../../Components/LeftSide/LeftSide';

const Friend = ({ friend }) => {
  return (
    <Col xs={12} sm={6} md={3} className='mb-5'>
      <Card className="friend-card h-100 " >
        <Card.Img variant="top" src={friend.Images} alt={friend.Name} />
        <Card.Body>
          <Card.Title>{friend.Name}</Card.Title>
          <Card.Text>{friend.email}</Card.Text>
          <Button  variant="danger">
          <i className="fa-solid fa-heart-broken"></i> unfriend
          </Button>        </Card.Body>
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
    <Container fluid>
      <Row>
        <Col sm={3} className="px-0">
          <Leftbar />
        </Col>
        <Col sm={9}>
        <h1 className="text-center my-4">Friends List</h1>

          {friendsStatus === 'LOADING' && <Spinner animation="border" />}
          {friendsStatus === 'FAILED' && <Alert variant="danger">Failed to fetch friends.</Alert>}
          {friendsStatus === 'SUCCEEDED' && (
            <Row className="friend-list">
              {friends.map((friend) => (
                <Friend key={friend.id} friend={friend} />
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FriendListPage;
