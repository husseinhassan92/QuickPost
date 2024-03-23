import React, { useEffect, useState } from 'react';
//import { Button, Form, Dropdown, Modal } from "react-bootstrap";
import axios from 'axios';
import { useSelector } from 'react-redux';
import {Form, FormGroup, FormLabel, FormControl, Button, Row, Col, Card , Dropdown, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

function OtherProfile({isAuthenticated, user}) {
    // const user = useSelector(state => state.AuthReducer?.user);
    // console.log(user);
        // const [userData, setUserData] = useState([])
    const user_account = useParams();
    console.log(user_account);
    const [userData, setUserData] = useState([])
    const [image, setImage] = useState(null)
    const [following, setFollowing] = useState(false); 

    const [profileData, setProfileData] = useState({});

    console.log("profile", profileData)
      const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        birth_date: '',
      });
      const history = useHistory();

      useEffect(() => {
        const fetchProfileData = async () => {
          try {
            const config = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('access')}`,
              },
            };
    
            const response = await axios.get(`http://127.0.0.1:8000/api/profile/user/${user_account.id}`, config); 
            //console.log(response)
            setProfileData(response.data.data);

          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
        };
        
        fetchProfileData();
      }, []);
      console.log("profile1", profileData)
      const handleInputChange = event => {
        const { name, value } = event.target;
        setProfileData({ ...profileData, [name]: value });
        setErrors({ ...errors, [name]: '' });
      };
    
      const handleImageChange = event => {
        const imageFile = event.target.files[0];
        setProfileData({ ...profileData, image: imageFile });
      };
      
      const handleImageClick = () => {
        history.push('/navbar', { image: profileData.image });
      };
    
    const handleFollow = () => {
        const data = {
            follower: user.id,
            following: user_account.id,
        };
        const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.getItem('access')}`,
            },
          };
        axios.post(`http://127.0.0.1:8000/api/follow/follow/`, data ,config)
            .then(response => {
                // Handle successful response, update UI to reflect the follow action
                console.log('Followed successfully');
                setFollowing(true); // Update state to indicate following
            })
            .catch(error => {
                // Handle errors
                console.error('Error following user:', error);
            });
    };

    return (
        <section className="h-100 gradient-custom-2">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-9 col-xl-7">
                        <div className="card">
                            <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                    <img src={'http://127.0.0.1:8000'+profileData.image} alt="Generic placeholder" className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: '150px', zIndex: 1 }} />
                                    <button type="button" onClick={handleFollow}  >
                                    Follow
                                    </button>
                                </div>
                                <div className="ms-3" style={{ marginTop: '90px' }}>
                                    <h5>{profileData.first_name + " " + profileData.last_name}</h5>
                                    <p>{profileData.birth_date}</p>
                                        {/* <span>{userData.phone}</span> */}
                                </div>
                            </div>
                            <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                <div className="d-flex justify-content-end text-center py-1">
                                    <div>
                                        <p className="mb-1 h5">18</p>
                                        <p className="small text-muted mb-0">Posts</p>
                                    </div>
                                    <div className="px-3">
                                        <p className="mb-1 h5">1026</p>
                                        <p className="small text-muted mb-0">Followers</p>
                                    </div>
                                    <div>
                                        <p className="mb-1 h5">478</p>
                                        <p className="small text-muted mb-0">Following</p>
                                    </div>
                                </div>
                            </div>
                         
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.AuthRecducer.isAuthenticated,
    user: state.AuthRecducer.user,
});
export default connect(mapStateToProps)(OtherProfile);
