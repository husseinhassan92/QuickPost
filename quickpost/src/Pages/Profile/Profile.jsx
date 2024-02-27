import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
    const [userData, setUserData] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')

    const GetData = async () => {
        const response = await fetch(`https://dummyapi.io/data/v1/user/60d0fe4f5311236168a109f4`, {
            method: "Get",
            headers: {
                'Content-Type': 'application/json',
                'app-id': "65dc82396559d35e36b90287"
            },
        });
        const data = await response.json()
        setUserData(data);
        console.log(data);
    }


    const getUserPosts = async () => {
        const response = await fetch(`https://dummyapi.io/data/v1/user/60d0fe4f5311236168a109f4/post`, {
            method: "Get",
            headers: {
                'Content-Type': 'application/json',
                'app-id': "65dc82396559d35e36b90287"
            },
        })
        const data = await response.json()
        setUserPosts(data.data);
        // console.log(data);
    }


    const updateUserData = async () => {
        axios.put("https:/dummyapi.io/data/v1/user/60d0fe4f5311236168a109f4",
            {
                firstName: firstName,
                lastName: lastName,
                phone: phone,
            }, {
            headers: {
                'app-id': "65dc82396559d35e36b90287",
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                // console.log(response);
                alert("Your Info updated succesfully")
                GetData();
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    useEffect(() => {
        GetData();
        getUserPosts()
    }, [])
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
                                                        <img src={post.image} className="card-img-top h-50" alt="Fissure in Sandstone" style={{maxHeigh:'200px',objectFit:'cover'}} />
                                                        <div className="card-body  h-50">
                                                            <div className='d-flex align-items-center mb-3 '>
                                                                <img src={post.owner.picture} alt="Owner" className='rounded-circle me-2 mb-2 ' style={{ width: '50px', height: '50px' }} />
                                                                <div className='align-self-center mb-2 '>{post.owner.firstName} {post.owner.lastName}</div>
                                                                <div className='ms-auto text-gray '>{new Date(post.publishDate).toLocaleString()}</div>
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
                            <form>
                                <div class="row gap-3">
                                    <div class="col-12">
                                        <input type="text" class="form-control" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div class="col-12">
                                        <input type="text" class="form-control" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                    <div class="col-12">
                                        <input type="text" class="form-control" placeholder="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
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

        </section>
    );
}

export default Profile