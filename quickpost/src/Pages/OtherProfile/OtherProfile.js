import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import { changeFavList } from '../../Store/Actions/FavListAction';
//import { changeFavList } from '../Store/Actions/FavListAction';


function OtherProfile({ isAuthenticated, user, FavList }) {
    const user_account = useParams();
    console.log(user_account);

    const [following, setFollowing] = useState();
    //let FavList = useSelector((state) => state.FavListReduce.FavList)
    const dispatch = useDispatch();

    const [profileData, setProfileData] = useState({});
    const [userData, setUserData] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [post, setPost] = useState();
    const [showDropdown, setShowDropdown] = useState(false);
    const [image, setImage] = useState(null)
    const [activePage, setActivePage] = useState('posts');
    //const [following, setFollowing] = useState(false);

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
        const checkFollowingStatus = () => {
            if (FavList.includes(+user_account.id)) {
                setFollowing(true);
            } else {
                setFollowing(false);
            }
        };

        checkFollowingStatus();
        fetchProfileData();
        console.log(FavList)
        console.log(user_account.id, typeof(+user_account.id));
        //console.log(profileData.user_account)
        // if (FavList.indexOf(user_account.id) !== -1) {
        //     console.log("ins")
        //     setFollowing(true);
        // }else{
        //     console.log("out")
        // }
    }, []);
    // const handleFollow = () => {
    //     const data = {
    //         follower: user.id,
    //         following: user_account.id,
    //     };
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `JWT ${localStorage.getItem('access')}`,
    //         },
    //     };
    //     axios.post(`http://127.0.0.1:8000/api/follow/follow/`, data, config)
    //         .then(response => {
    //             // Handle successful response, update UI to reflect the follow action
    //             console.log('Followed successfully');
    //             setFollowing(true); // Update state to indicate following
    //         })
    //         .catch(error => {
    //             // Handle errors
    //             console.error('Error following user:', error);
    //         });
    // };

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
        axios.post(`http://127.0.0.1:8000/api/follow/follow/`, data, config)
            .then(response => {
                // Handle successful response, update UI to reflect the follow action
                console.log('Followed successfully');
                setFollowing(true);
                dispatch(changeFavList(FavList.push(+user_account.id))) // Update state to indicate following
            })
            .catch(error => {
                // Handle errors
                console.error('Error following user:', error);
            });
    };

    async function unfollow() {
        await axios.post(`http://127.0.0.1:8000/api/follow/unfollow/`,
            {
                user: user.id,
                otherUser: user_account.id,
            },

            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                    Accept: "application/json",
                }
            }).then(response => {
                const indexOfObject = FavList.findIndex(profileId => {
                    return profileId === user_account.id;
                  });
                  FavList.splice(indexOfObject, 1);
                  dispatch(changeFavList(FavList))
                setFollowing(false);
            })

    }
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
            <div className="vh-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="">
                        <div className="card p-0">
                            <div className="rounded-top  text-white d-flex flex-row" style={{ height: '200px' }}>
                                <div className="ms-4 mt-5 d-flex flex-column " style={{ width: '150px' }}>
                                    <img src={'http://127.0.0.1:8000' + profileData.image} alt="Generic placeholder" className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: '150px', height:'150px',zIndex: 1 }} />
                                </div>
                                <div className="ms-3" style={{ marginTop: '90px' }}>
                                    <h5>{profileData.first_name + " " + profileData.last_name}</h5>
                                    <p>{profileData.birth_date}</p>
                                </div>
                            </div>
                            <div className=" text-white">
                                <div className="d-flex justify-content-start ms-4 py-3">
                                    {/* <div>
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
                                    </div> */}
                                    {/* <button type="button" onClick={handleFollow} className="btn btn-primary mt-3  px-5" style={{ zIndex: 1 }}>
                                        Follow
                                    </button> */}
                                    {following ? (
                                        <button
                                            type="button"
                                            onClick={unfollow}
                                            className="btn-2 mt-5 px-5"
                                            style={{ zIndex: 1} }
                                        >
                                            Unfollow
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleFollow}
                                            className="btn-2 mt-5 px-5"
                                            style={{ zIndex: 1 }}
                                        >
                                            Follow
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="card-body ">
                                <Nav justify variant="tabs" defaultActiveKey="/home">
                                    <Nav.Item className='navitem'>
                                        <Nav.Link onClick={() => handlePageChange('posts')} active={activePage === 'Posts'}><span className='links'>Posts</span></Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className='navitem'>
                                        <Nav.Link onClick={() => handlePageChange('nav')} active={activePage === 'Navbar'}><span className='links'>Shared</span></Nav.Link>
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
    FavList:state.FavListReduce.FavList,
});
export default connect(mapStateToProps)(OtherProfile);
