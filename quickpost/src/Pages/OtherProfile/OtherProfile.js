import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form, FormGroup, FormLabel, FormControl, Button, Row, Col, Card, Dropdown, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Posts from '../../Components/Posts/Posts'
import Navbar from '../../Components/Navbar/Navbar'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import MyPost from '../../Components/myPost/Post';
import SharedPost from '../../Components/OthersharedPost/OtherSharedPost';
// import SharedPost from '../../Components/sharedPost/SharedPost';
import MyPost from '../../Components/OtherPost/OtherPost';


function OtherProfile({isAuthenticated, user}) {
    const user_account = useParams();
    console.log(user_account);
    
    const [following, setFollowing] = useState(false); 

    const [profileData, setProfileData] = useState({});
    const [userData, setUserData] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [post, setPost] = useState();
    const [showDropdown, setShowDropdown] = useState(false);
    const [image, setImage] = useState(null)
    const [activePage, setActivePage] = useState('posts');

    const handlePageChange = (page) => {
        setActivePage(page);
    };

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
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };  
    function onUploadFileChange(e) {
        let file = new FileReader();
        file.readAsDataURL(e.target.files[0]);
        file.onload = () => {
            setImage(file.result);
        };
    }
    return (
        <section className="h-100 gradient-custom-2">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="">
                        <div className="card p-0">
                            <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                    <img src={'http://127.0.0.1:8000'+profileData.image} alt="Generic placeholder" className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: '150px', zIndex: 1 }} />
                                    <button type="button" onClick={handleFollow} className="btn btn-outline-dark"   style={{ zIndex: 1 }}>
                                    Follow
                                    </button>
                                </div>
                                <div className="ms-3" style={{ marginTop: '90px' }}>
                                    <h5>{profileData.first_name + " " + profileData.last_name}</h5>
                                    <p>{profileData.birth_date}</p>
                                </div>
                            </div>
                            <div className="bg-dark text-white">
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
                            <div className="card-body p-4 text-black">

<Nav justify variant="tabs" defaultActiveKey="/home">
    <Nav.Item>
        <Nav.Link   onClick={() => handlePageChange('posts')} active={activePage === 'Posts'}>My Posts</Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link onClick={() => handlePageChange('nav')} active={activePage === 'Navbar'}>Shared Posts</Nav.Link>
    </Nav.Item>
</Nav>
{activePage === 'posts' && <MyPost profileid={user_account.id} />}
{activePage === 'nav' && <SharedPost profileid={user_account.id} />}





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
