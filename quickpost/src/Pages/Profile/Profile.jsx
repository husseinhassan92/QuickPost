import React, { useEffect, useState } from 'react';
import { Button, Form, Dropdown, Modal } from "react-bootstrap";
import axios from 'axios';

function Profile() {
    const [userData, setUserData] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birth_date, setBirthDate] = useState('');
    const [post, setPost] = useState();

    const [deleteShow, setdeleteShow] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [editShow, seteditShow] = useState(false);
    const [editPostText, setEditPostText] = useState("")
    const [image, setImage] = useState(null)

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

    const GetData = async () => {
        const response = await fetch(`https://dummyapi.io/data/v1/user/60d0fe4f5311236168a10a19`, {
            method: "Get",
            headers: {
                'Content-Type': 'application/json',
                'app-id': "65d08f07b536e68ad8626e8c"
            },
        });
        const data = await response.json()
        setUserData(data);
        console.log(data);
    }


    const getUserPosts = async () => {
        const response = await fetch(`https://dummyapi.io/data/v1/user/60d0fe4f5311236168a10a19/post`, {
            method: "Get",
            headers: {
                'Content-Type': 'application/json',
                'app-id': "65d08f07b536e68ad8626e8c"
            },
        })
        const data = await response.json()
        setUserPosts(data.data);
        // console.log(data);
    }


    const updateUserData = async () => {
        const token = localStorage.getItem('token');

        const profileData = new FormData();
            profileData.append('first_name', firstName);
            profileData.append('last_name', lastName);
            profileData.append('birth_date', birth_date);
            profileData.append('image', image);
        try {
        
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                    Accept: 'application/json',
                },
            };
    
            
    
            const response = await axios.put('http://127.0.0.1:8000/api/profile/15/', profileData, config);
            console.log(response.data);
            alert('Your info updated successfully');
            // Additional actions after successful update
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle unauthorized access (e.g., redirect to login page)
                console.error('Unauthorized access:', error.response.data);
            } else {
                // Handle other errors
                console.error('Error updating profile:', error);
            }
        }
    };
    
    const onUploadFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
        };
    };

    useEffect(() => {
        GetData();
        getUserPosts()
    }, [userPosts])



    return (
        <section className="h-100 gradient-custom-2">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-9 col-xl-7">
                        <div className="card">
                            <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                    <img src={userData.picture} alt="Generic placeholder" className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: '150px', zIndex: 1 }} />
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
            <input type="file" onChange={onUploadFileChange} />
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update user info</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-dark">
                            <form>
                                <div class="row gap-3">
                                    <div class="col-12">
                                        <input type="text" class="form-control" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div class="col-12">
                                        <input type="text" class="form-control" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                    <div class="col-12">
                                    <input type="text" class="form-control" placeholder="Birth date" value={birth_date} onChange={(e) => setBirthDate(e.target.value)} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => updateUserData()}>Save changes</button>
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

export default Profile
