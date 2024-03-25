import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";

function Follower({isAuthenticated, user}) {

    let [follower, setFollower] = useState([])
    async function getFollower() {
        let { data } = await axios.get(`http://127.0.0.1:8000/api/follow/follower/${user.id}/`, {
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
        <div className='container mt-5'>
            <div className='row'>
                {follower.map((follower) => (
                    <div key={follower.id} className='col-xs-12 col-sm-6 col-md-3 mb-5' >
                        <div className='card friend-card h-100'>
                            <Link to={`/OtherProfile/${follower.id}`}>
  
                              <img className='card-img-top' src={'http://127.0.0.1:8000' + follower.image} alt={follower.first_name} />

</Link>
                            <div className='card-body'>
                                <h5 className='card-title'>{follower.first_name} {follower.last_name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.AuthRecducer.isAuthenticated,
    user: state.AuthRecducer.user,
  });
  export default connect(mapStateToProps)(Follower);
