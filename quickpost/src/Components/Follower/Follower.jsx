import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

function Follower({isAuthenticated, user}) {

    let [follower, setFollower] = useState([])
    async function getFollower() {
        let { data } = await axios.get(`http://127.0.0.1:8000/api/follow/following/${user.id}/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.getItem("access")}`,
                Accept: "application/json",
            }
        })
        console.log("Salah");
        setFollower(data)
    }

    useEffect(() => {
        getFollower();
    }, [])
    return (
        <>
            {follower.map((follower) => (

                <Col xs={12} sm={6} md={3} className='mb-5'>
                    <Card className="friend-card h-100 " >
                        <Card.Img variant="top" src={'http://127.0.0.1:8000'+follower.image} alt={follower.first_name} />
                        <Card.Body>
                            <Card.Title>{follower.first_name} {follower.last_name}</Card.Title>
                           
                        </Card.Body>
                    </Card>
                </Col>
            ))}

        </>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.AuthRecducer.isAuthenticated,
    user: state.AuthRecducer.user,
    userProfile: state.AuthRecducer.userProfile,
  });
  export default connect(mapStateToProps)(Follower);
