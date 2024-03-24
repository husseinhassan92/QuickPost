import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Button, Card, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

function Following({isAuthenticated, user}) {
    let [following, setFollowing] = useState([])
    async function getFollowing() {
        let { data } = await axios.get(`http://127.0.0.1:8000/api/follow/follower/${user.id}/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.getItem("access")}`,
                Accept: "application/json",
            }
        })
        console.log(data);
        setFollowing(data)
    }

    useEffect(() => {
        getFollowing();
    }, [])
  return (
   <>
<div className='row'>
{following.map((following) => (

<div xs={12} sm={6} md={3} className='d-flex  mb-5'>

    <Card className="friend-card h-100 col-3 " >
        <Card.Img variant="top" src={'http://127.0.0.1:8000'+following.image} alt={following.first_name} />
        <Card.Body>
            <Card.Title>{following.first_name} {following.last_name}</Card.Title>
            <Button variant="danger">
                 unfollow
            </Button>
        </Card.Body>
    </Card>
</div>

))}
</div>
   </>
  )
}
const mapStateToProps = state => ({
    isAuthenticated: state.AuthRecducer.isAuthenticated,
    user: state.AuthRecducer.user,
    userProfile: state.AuthRecducer.userProfile,
  });
  export default connect(mapStateToProps)(Following);