import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeFavList } from '../../Store/Actions/FavListAction';

function Following({ isAuthenticated, user }) {
    const [following, setFollowing] = useState([]);
    const FavList = useSelector((state) => state.FavListReduce.FavList);
    const dispatch = useDispatch();

    async function getFollowing() {
        try {
            const { data } = await axios.get(`http://127.0.0.1:8000/api/follow/following/${user.id}/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                    Accept: "application/json",
                }
            });
            setFollowing(data);
        } catch (error) {
            console.error("Error fetching following:", error);
        }
    }

    async function unfollow(otherId) {
        try {
            await axios.post(`http://127.0.0.1:8000/api/follow/unfollow/`, {
                user: user.id,
                otherUser: otherId,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                    Accept: "application/json",
                }
            });
            getFollowing();
            const updatedFavList = FavList.filter(profileId => profileId !== otherId);
            dispatch(changeFavList(updatedFavList));
        } catch (error) {
            console.error("Error unfollowing:", error);
        }
    }

    useEffect(() => {
        getFollowing();
    }, []);

    return (
        <Container>
            <Row>
                {following.map((follower) => (
                    <Col key={follower.user_account} xs={12} sm={6} md={3} className='mb-5 mt-3'>
                        <Card className="friend-card h-100">
                            <Link to={`/OtherProfile/${follower.user_account}`}>
                                <Card.Img variant="top" src={'http://127.0.0.1:8000' + follower.image} alt="Friend" style={{ height: "13rem" }} />
                            </Link>
                            <Card.Body>
                                <Card.Title>{follower.first_name} {follower.last_name}</Card.Title>
                                <Button className="btn-2 text-light mt-3 px-5" onClick={() => unfollow(follower.user_account)}>
                                    Unfollow
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.AuthRecducer.isAuthenticated,
    user: state.AuthRecducer.user,
});

export default connect(mapStateToProps)(Following);
