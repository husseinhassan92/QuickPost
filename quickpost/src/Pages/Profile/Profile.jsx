import React, { useEffect, useState } from 'react';
//import { Button, Form, Dropdown, Modal } from "react-bootstrap";
import axios from 'axios';
import { useSelector } from 'react-redux';
import {Form, FormGroup, FormLabel, FormControl, Button, Row, Col, Card , Dropdown, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

function Profile({isAuthenticated, user}) {
    // const user = useSelector(state => state.AuthReducer?.user);
    // console.log(user);
        // const [userData, setUserData] = useState([])
    const [userData, setUserData] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [post, setPost] = useState();
    const [deleteShow, setdeleteShow] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [editShow, seteditShow] = useState(false);
    const [editPostText, setEditPostText] = useState("")
    const [image, setImage] = useState(null)
    const [profileData, setProfileData] = useState({
        first_name: '',
        last_name: '',
        birth_date: '',
        image: null,
      });
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
    
            const response = await axios.get(`http://127.0.0.1:8000/api/profile/user/${user.id}`, config); 
            console.log(response)
            setProfileData(response.data.data);
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
        };
    
        fetchProfileData();
      }, []);
    
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
          formData.append('first_name', profileData.first_name);
          formData.append('last_name', profileData.last_name);
          formData.append('birth_date', profileData.birth_date);
          formData.append('image', profileData.image);
    
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `JWT ${localStorage.getItem('access')}`,
            },
          };
    
          const response = await axios.put(`http://127.0.0.1:8000/api/profile/user/${user.id}/`, formData, config);
          console.log('Profile updated successfully:', response);
          setProfileData(response.data.data);
        } catch (error) {
          console.error('Error updating profile:', error);
        }
      };   
    const edithandleClose = () => {
        seteditShow(false)
        setShowDropdown(false)
    };
    const edithandleShow = (id) => {
        userPosts.map((post, index) => {
            if (post.id === id) {
                seteditShow(true);
                setPost(id)
                setEditPostText(post.text)
            }
        })
    }


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
    // const editPost = (e, id) => {
    //   e.stopPropagation();
    //   console.log(id);
    // };

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

    // const GetData = async () => {
    //     const response = await fetch(`https://dummyapi.io/data/v1/user/60d0fe4f5311236168a10a19`, {
    //         method: "Get",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'app-id': "65d08f07b536e68ad8626e8c"
    //         },
    //     });
    //     const data = await response.json()
    //     setUserData(data);
    //     console.log(data);
    // }


    // const getUserPosts = async () => {
    //     const response = await fetch(`https://dummyapi.io/data/v1/user/60d0fe4f5311236168a10a19/post`, {
    //         method: "Get",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'app-id': "65d08f07b536e68ad8626e8c"
    //         },
    //     })
    //     const data = await response.json()
    //     setUserPosts(data.data);
    //     // console.log(data);
    // }




    function onUploadFileChange(e) {
        let file = new FileReader();
        file.readAsDataURL(e.target.files[0]);
        file.onload = () => {
            setImage(file.result);
        };
    }


    // useEffect(() => {
    //     GetData();
    //     getUserPosts()
    // }, [userPosts])



    return (
        <section className="h-100 gradient-custom-2">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-9 col-xl-7">
                        <div className="card">
                            <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                    <img src={profileData.image} alt="Generic placeholder" className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: '150px', zIndex: 1 }} />
                                    <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ zIndex: 1 }}>
                                        Edit profile
                                    </button>
                                </div>
                                <div className="ms-3" style={{ marginTop: '90px' }}>
                                    <h5>{userData.firstName + " " + userData.lastName}</h5>
                                    <p>{`${userData.location && userData.location.country}, ${userData.location && userData.location.city}`}</p>
                                    <span>{userData.phone}</span>
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
                            <div className="card-body p-4 text-black">
                                <div className="mb-5">
                                    <p className="lead fw-normal mb-1">About</p>
                                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                        <p className="font-italic mb-1">I'm {userData.firstName + " " + userData.lastName} and lives in {`${userData.location && userData.location.country}, ${userData.location && userData.location.city}`}</p>

                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <p className="lead fw-normal mb-0">Recent Posts</p>
                                    <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p>
                                </div>
                                <div className="row g-2 flex-wrap">
                                    {
                                        userPosts.map(post => {
                                            return (
                                                <div className="col-12 mb-2" key={post.id}>
                                                    <div className="card">
                                                        <img src={post.image} className="card-img-top h-50" alt="Fissure in Sandstone" style={{ maxHeigh: '200px', objectFit: 'cover' }} />
                                                        <div className="card-body  h-50">
                                                            <div className='d-flex align-items-center mb-3 '>
                                                                <img src={post.owner.picture} alt="Owner" className='rounded-circle me-2 mb-2 ' style={{ width: '50px', height: '50px' }} />
                                                                <div className='align-self-center mb-2 '>{post.owner.firstName} {post.owner.lastName}</div>
                                                                <div className='ms-auto text-gray '>{new Date(post.publishDate).toLocaleString()}
                                                                    <i
                                                                        className="bi bi-three-dots-vertical"
                                                                        onClick={toggleDropdown}
                                                                    ></i>
                                                                    {showDropdown && (
                                                                        <Dropdown
                                                                            align="center"
                                                                            className="mt-0 ms-2"
                                                                            show={showDropdown}
                                                                            onClose={() => setShowDropdown(false)}
                                                                        >
                                                                            <Dropdown.Menu className="mt-2 txt-center">
                                                                                <Button
                                                                                    onClick={() => edithandleShow(post.id)}
                                                                                    className="dropdown-item"
                                                                                >
                                                                                    Edit
                                                                                </Button>
                                                                                <Button
                                                                                    onClick={() => deletehandleShow(post.id)}
                                                                                    className="dropdown-item "
                                                                                >
                                                                                    Delete
                                                                                </Button>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <p className="card-text">{post.text}</p>
                                                            <p className="card-text"><i className='fas fa-heart'></i>{post.likes}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update user info</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-dark">
                        <Form onSubmit={handleSubmit} className='mt-5'>
          <FormGroup>
            <FormLabel>First Name:</FormLabel>
            <FormControl
              type="text"
              name="first_name"
              value={profileData.first_name}
              onChange={handleInputChange}
            />
            {errors.first_name && <span className="text-danger">{errors.first_name}</span>}
          </FormGroup>
          <FormGroup>
            <FormLabel>Last Name:</FormLabel>
            <FormControl
              type="text"
              name="last_name"
              value={profileData.last_name}
              onChange={handleInputChange}
            />
            {errors.last_name && <span className="text-danger">{errors.last_name}</span>}
          </FormGroup>
          <FormGroup>
            <FormLabel>Birth Date:</FormLabel>
            <FormControl
              type="date"
              name="birth_date"
              value={profileData.birth_date}
              onChange={handleInputChange}
            />
            {errors.birth_date && <span className="text-danger">{errors.birth_date}</span>}
          </FormGroup>
          <FormGroup>
            <FormLabel>Profile Image:</FormLabel>
            <FormControl
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </FormGroup>
          <Button type="submit" variant="primary">Update Profile</Button>
        </Form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary" onClick={() => updateUserData()}>Save changes</button> */}
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
});
export default connect(mapStateToProps)(Profile);
