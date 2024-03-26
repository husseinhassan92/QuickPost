import React, { useEffect, useState } from 'react';
//import { Button, Form, Dropdown, Modal } from "react-bootstrap";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Form, FormGroup, FormLabel, FormControl, Button, Row, Col, Card, Dropdown, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Posts from '../../Components/Posts/Posts'
import Navbar from '../../Components/Navbar/Navbar'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import MyPost from '../../Components/myPost/Post';
import SharedPost from '../../Components/sharedPost/SharedPost';
import Follower from '../../Components/Follower/Follower';
import Following from '../../Components/Following/Following';
import { useDispatch } from 'react-redux';
import { logout } from "../../Store/Actions/AuthAction";




function Profile({ isAuthenticated, user, userProfile, logout }) {

    const [userData, setUserData] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [post, setPost] = useState();
    const [deleteShow, setdeleteShow] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [editShow, seteditShow] = useState(false);
    const [editPostText, setEditPostText] = useState("")
    const [image, setImage] = useState(null)
    const [activePage, setActivePage] = useState('posts');
    const [confirm, setConfirm] = useState(false);
    const[current_password, setCurrent_password]=useState("");
    const[message,setMessage]=useState("");

    const cahangePassword = (e)=>{
        setCurrent_password(e.target.value);
    };

    const handlePageChange = (page) => {
        setActivePage(page);
    };
    const [profileData, setProfileData] = useState({
        first_name: '',
        last_name: '',
        birth_date: '',
        image: null,
    });
    console.log("profile", profileData)
    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        birth_date: '',
        image: null, // Initialize image with a default value

    });
    const history = useHistory();

    const fetchProfileData = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `JWT ${localStorage.getItem('access')}`,
                },

            };

            const response = await axios.get(`http://127.0.0.1:8000/api/profile/user/${user.id}`, config);
            //console.log(response)
            setProfileData(response.data.data);

        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);
    console.log("profile1", profileData)
    const handleInputChange = event => {
        const { name, value } = event.target;
        setProfileData({ ...profileData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    if (!user) {
        return <Redirect to='/' />
    }

    const handledelete = () => {
        console.log("delete", user.id)
        if (confirm === true) {
            setConfirm(false)
        } else {
            setConfirm(true)
        }
        
        //logout()
        //history.push('/home');
    }
    console.error(current_password);
    // const handleconfirm = ()=>{
    //     console.error(current_password);
    //     if (localStorage.getItem("access")) {
    //         const config = {
    //           headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `JWT ${localStorage.getItem("access")}`,
    //             Accept: "application/json",
    //           },
    //         };
    //         //const body = JSON.stringify({current_password});
    //         const body = {current_password :current_password};
    //         try {
    //             axios.delete(
    //             `${process.env.REACT_APP_API_URL}/auth/users/me/`,config,body
    //           ).then(
                
    //                 //logout(),
    //                 history.push("/")
                
    //           )
              
    //         } catch (err) {
    //             setMessage("password is incorrect")
    //         }
    //       }
    // }
    const handledeleteuser = async () => {
        console.error(current_password);
      
        if (localStorage.getItem("access")) {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${localStorage.getItem("access")}`,
              Accept: "application/json",
            },
            data: { current_password: current_password }, // Move body to 'data' property
          };
      
          try {
            const response = await axios.delete(
              `${process.env.REACT_APP_API_URL}/auth/users/me/`,
              config
            );
      
            // Check response status and handle accordingly
            if (response.status === 204) {
              // Successful deletion
              logout();
              history.push("/");
            } else {
              // Handle other status codes
              setMessage("An error occurred while processing your request.");
            }
          } catch (err) {
            // Handle Axios error
            if (err.response) {
              // Server responded with a non-2xx status code
              setMessage(err.response.data.detail || "An error occurred.");
            } else if (err.request) {
              // The request was made but no response was received
              setMessage("No response received from the server.");
            } else {
              // Something else went wrong
              setMessage("An error occurred while processing your request.");
            }
          }
        }
      };
    const handleconfirm = ()=>{
        handledeleteuser();
    }
      
    // const handleconfirm = () => {
    //     axios.delete(`http://127.0.0.1:8000/auth/users/me/`,{}
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `JWT ${localStorage.getItem("access")}`,
    //         Accept: "application/json",
    //       }
    //     })
    //     .then(response => {
    //       console.log('Post Unshared successfully:', response.data);
    //       // Handle success, if needed
    //     })
    //     .catch(error => {
    //       console.error('Error sharing post:', error);
    //       // Handle error, if needed
    //     });
    // }
    


    const handleImageChange = event => {
        const imageFile = event.target.files[0];
        setProfileData({ ...profileData, image: imageFile });
    };

    const handleImageClick = () => {
        history.push('/navbar', { image: profileData.image });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const validationErrors = {};
            if (profileData.first_name.trim().length < 3) {
                validationErrors.first_name = 'First name must be at least 3 characters long.';
            }
            if (profileData.last_name.trim().length < 3) {
                validationErrors.last_name = 'Last name must be at least 3 characters long.';
            }
            const currentDate = new Date();
            const selectedDate = new Date(profileData.birth_date);
            if (selectedDate >= currentDate) {
                validationErrors.birth_date = 'Birth date must be before today.';
            }

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            const formData = new FormData();
            formData.append('user_account', user.id);
            formData.append('first_name', profileData.first_name);
            formData.append('last_name', profileData.last_name);
            formData.append('birth_date', profileData.birth_date);
            formData.append('image', profileData.image);

            // if (profileData.image) {
            //     formData.append('image', profileData.image);
            // }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `JWT ${localStorage.getItem('access')}`,
                },
                
            };

            await axios.put(`http://127.0.0.1:8000/api/profile/${userProfile.id}/`,formData, config)
                .then((response) => {
                    console.log('Profile updated successfully:', response);
                    fetchProfileData();
                })
            //setProfileData(response.data.data);
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.response && error.response.status === 400 && error.response.data.image) {
                history.push('/profile');
            }
        }
    };
    const edithandleClose = () => {
        seteditShow(false)
        setShowDropdown(false)
    };


    const deletehandleClose = () => {
        setdeleteShow(false)
        setShowDropdown(false)
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const deletehandleShow = (id) => {
        userPosts.map((post, index) => {
            if (post.id === id) {
                setdeleteShow(true)
                setPost(id)
            }
        })
    };

    const deletePost = (e, id) => {
        console.log(id)
        e.stopPropagation();
        setdeleteShow(false);
        setShowDropdown(!showDropdown)
        axios
            .delete(`https://dummyapi.io/data/v1/post/${id}`, {
                headers: {
                    "app-id": "65d08f07b536e68ad8626e8c",
                },
            })
            .then((response) => {
                console.log(response);
                setPost(null);
                //alert(response.status + ": Post Deleted")
                //window.location.reload()
            })
            .catch((err) => console.log(err));
    };


    const onChangeHandler = (e) => {
        setEditPostText(e.target.value)
    }
    const editPost = (e, id) => {
        e.stopPropagation();
        console.log(id);
        console.log(editPostText)
        seteditShow(false);
        setShowDropdown(!showDropdown);
        const Body = {
            text: editPostText,
            image: image,
            likes: 0,
            tags: [],
        };
        axios
            .put(`https://dummyapi.io/data/v1/post/${id}`, Body, {
                headers: {
                    "app-id": "65d08f07b536e68ad8626e8c",
                },
            })
            .then((response) => {
                console.log(response);
                setPost(response.data);
            })
            .catch((err) => console.log(err));
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
                        <div className="card">
                            <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                    <img src={'http://127.0.0.1:8000' + profileData.image} alt="Generic placeholder" className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: '150px', zIndex: 1 }} />

                                </div>
                                <div className="ms-3" style={{ marginTop: '90px' }}>
                                    <h2 style={{ color: 'white', textShadow: '2px 2px 4px rgba(255, 0, 0, 0.5)' }}>
                                        {profileData.first_name.charAt(0).toUpperCase() + profileData.first_name.slice(1)} {profileData.last_name.charAt(0).toUpperCase() + profileData.last_name.slice(1)}
                                    </h2>
                                    <p>{profileData.birth_date}</p>
                                    {/* <span>{userData.phone}</span> */}

                                </div>

                            </div>
                            <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>

                                <div className="d-flex justify-content-end text-center py-1">
                                    <div><Button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ zIndex: 1 }}>
                                        Update Profile
                                    </Button></div>

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
                                        <Nav.Link onClick={() => handlePageChange('posts')} active={activePage === 'Posts'}>My Posts</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link onClick={() => handlePageChange('nav')} active={activePage === 'Navbar'}>Shared Posts</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link onClick={() => handlePageChange('follower')} active={activePage === 'Navbar'}>Follower</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link onClick={() => handlePageChange('following')} active={activePage === 'Navbar'}>Following</Nav.Link>
                                    </Nav.Item>

                                </Nav>
                                {activePage === 'posts' && <MyPost />}
                                {activePage === 'nav' && <SharedPost />}
                                {activePage === 'follower' && <Follower />}
                                {activePage === 'following' && <Following />}




                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog " style={{ maxWidth: '50rem' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update user info</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-dark">
                            <form onSubmit={handleSubmit} className='mt-5'>
                                <div className="mb-3 d-flex align-items-center">
                                    <label className="me-3 mb-0" style={{ width: '100px' }}>First Name:</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={profileData.first_name}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                    {errors.first_name && <span className="text-danger">{errors.first_name}</span>}
                                </div>
                                <div className="mb-3 d-flex align-items-center">
                                    <label className="me-3 mb-0" style={{ width: '100px' }}>Last Name:</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={profileData.last_name}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                    {errors.last_name && <span className="text-danger">{errors.last_name}</span>}
                                </div>
                                <div className="mb-3 d-flex align-items-center">
                                    <label className="me-3 mb-0" style={{ width: '100px' }}>Birth Date:</label>
                                    <input
                                        type="date"
                                        name="birth_date"
                                        value={profileData.birth_date}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                    {errors.birth_date && <span className="text-danger">{errors.birth_date}</span>}
                                </div>
                                <div className="mb-3 d-flex align-items-center">
                                    <label className="me-3 mb-0" style={{ width: '100px' }}>Profile Image:</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="form-control"
                                        style={{ marginTop: '0.5rem' }}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update Profile</button>
                            </form>
                            <button onClick={handledelete} className="btn btn-danger ">Delete Profile</button>
                            {confirm && <div>
                                <label className="me-3 mb-0" style={{ width: '100px' }}>confirm password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={current_password}
                                        onChange={(e) => cahangePassword(e)}
                                        className="form-control"
                                    />
                                    <button onClick={handleconfirm} className="btn btn-danger" data-bs-dismiss="modal">Confirm</button>
                                    {message !== '' ? (<p>{message}</p>) : ('')}

                            </div>}


                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            {/* <button type="submit" className="btn btn-primary">Update Profile</button> */}

                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>





            </div>
            <Modal show={deleteShow} onHide={deletehandleClose}>
                <Modal.Body>Are You Want to Delete  this Post?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={deletehandleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={(e) => deletePost(e, post)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={editShow} onHide={edithandleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control as="textarea" rows={3} style={{ resize: "none", height: "7rem" }} value={editPostText} onChange={onChangeHandler} />
                            <Form.Control
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                onChange={onUploadFileChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={edithandleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => editPost(e, post)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </section>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.AuthRecducer.isAuthenticated,
    user: state.AuthRecducer.user,
    userProfile: state.AuthRecducer.userProfile,

});
export default connect(mapStateToProps, { logout })(Profile);

