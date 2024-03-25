import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Button, Card, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
function Following({isAuthenticated, user}) {
    let [following, setFollowing] = useState([])
    async function getFollowing() {
        let { data } = await axios.get(`http://127.0.0.1:8000/api/follow/following/${user.id}/`, {
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

{following.map((following) => (

<Col xs={12} sm={6} md={3} className='mb-5'>
    <Card className="friend-card h-100 " >
    <Link to={`/OtherProfile/${following.id}`}> <Card.Img variant="top" src={'http://127.0.0.1:8000'+following.image} alt={following.first_name} /></Link>
        <Card.Body>
            <Card.Title>{following.first_name} {following.last_name}</Card.Title>
            <Button variant="danger">
                 unfollow
            </Button>
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
  });
  export default connect(mapStateToProps)(Following);