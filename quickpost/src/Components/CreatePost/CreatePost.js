import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Dropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from 'react-redux';

const CreatePost = ({isAuthenticated, user, loadUserProfileById, userProfile}) => {
  const [postText, setPostText] = useState("");
  const [post, setPost] = useState();
  const [postCount, setPostCount] = useState(0);
  const [disablePostButton, setDisablePostButton] = useState(true);
  //const [user, setUser] = useState();
  const [deleteShow, setdeleteShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [editShow, seteditShow] = useState(false);
  const [uploadShow, setUploadShow] = useState(false);
  const [editPostText, setEditPostText] = useState("")
  const [image , setImage] = useState(null)

  //if (user){console.log(user.id)}


  const uploadhandleClose = () => {
    setUploadShow(false)
    setImage(null)
  };
  const uploadhandle = () => {
    setUploadShow(false)
  };
  const uploadhandleShow = () => setUploadShow(true);

  const edithandleClose = () => {
    seteditShow(false)
    setShowDropdown(false);
  };
  const edithandleShow = () => seteditShow(true);

  const deletehandleClose = () => {
    setdeleteShow(false);
    setShowDropdown(false);
  };
  const deletehandleShow = () => setdeleteShow(true);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // useEffect(() => {
  //   axios
  //     .get(`https://dummyapi.io/data/v1/user/60d0fe4f5311236168a10a19`, {
  //       headers: {
  //         "app-id": "65d08a4661de33117cf6503f",
  //       },
  //     })
  //     .then((response) => {
  //       //setUser(response.data);
  //     })
  //     .catch((err) => console.log("Error:", err));
  // }, []);

  const handleContentChange = (e) => {
    setPostText(e.target.value);
    setEditPostText(e.target.value)
    setPostCount(e.target.value.length);
    if (postCount === 0 || postCount > 300) {
      setDisablePostButton(true);
    } else {
      setDisablePostButton(false);
    }
  };
  const handleCreatePost = (event) => {
    console.log(postText)
    let form_data = new FormData();
    if (image) {
      form_data.append('image', image);
    }
    form_data.append('content', postText);
    form_data.append('p_author', user.id);
    form_data.append('profile', userProfile.id);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    // const Body = JSON.stringify({
    //   content: postText,
    //   image: image,
    //   p_author: user.id,
    //   profile: 1,
    // });
    axios
      .post(`http://localhost:8000/api/post/add/`, form_data, config)
      .then((response) => {
        setPostText("");
        setPostCount(0);
        setDisablePostButton(true);
        setPost(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (e, id) => {
    e.stopPropagation();
    setdeleteShow(false);
    setShowDropdown(!showDropdown);
    axios
      .delete(`https://dummyapi.io/data/v1/post/${id}`, {
        headers: {
          "app-id": "65d08f07b536e68ad8626e8c",
        },
      })
      .then((response) => {
        console.log(response);
        setPost(null);
      })
      .catch((err) => console.log(err));
  };

  const onChangeHandler = (e) =>{
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
      .put(`https://dummyapi.io/data/v1/post/${id}`,Body, {
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
    setImage(e.target.files[0])
    // let file = new FileReader();
    // file.readAsDataURL(e.target.files[0]);
    // file.onload = () => {
    //   setImage(file.result);
    // };
  }



  return (
    <>
      <div className="container  pt-4 ">
        <div className="row ">
          <div className="col">
            <div className="border rounded-3 border-success p-3 shadow mt-2 bg-dark ms-2 me-2">
              
              <Form className="d-flex flex-column mt-0">
                <Form.Group className="mb-3 ">
                  <Form.Label>
                    <div className="d-flex align-items-center mb-1">
                      <div className="mx-3"></div>
                    </div>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    row={4}
                    value={postText}
                    onChange={handleContentChange}
                    placeholder="What is happening?"
                    style={{ resize: "none", height: "7rem" }}
                  />
                </Form.Group>
                <div className="d-flex justify-content-end align-items-center">
                  <span className="text-light">
                    {postCount}/300
                  </span>
                  <Button className="btn btn-dark text-danger ms-2" onClick={uploadhandleShow}>
                  <i className="bi bi-image"></i>
                  </Button>
                  <Button
                    onClick={handleCreatePost}
                    disabled={disablePostButton}
                    variant="primary"
                    className="col-2 mx-3"
                  >
                    Post
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {post && (
        <div className="container  pt-4 ">
          <div className="row ">
            <div className="col">
              <div className="card text-light bg-dark">
                <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                            <Link
                              to={`/OtherProfile/${post.profile.user_account}`}
                            >
                              <img
                                src={
                                  "http://127.0.0.1:8000" + post.profile.image
                                }
                                alt="Owner"
                                className="rounded-circle me-2 mb-2"
                                style={{ width: "50px", height: "50px" }}
                              />
                            </Link>
                            <div className="align-self-center mb-2">
                              {post.profile.first_name} {post.profile.last_name}
                            </div>
                            <div className="ms-auto text-light">
                              {new Date(post.create_at).toLocaleString()}
                            </div>
                          </div>
                  <div>
                    {post.image && (
                      <Link to={`/post/${post.id}`}>
                        <img
                          src={'http://127.0.0.1:8000'+ post.image}
                          alt="Post"
                          className="img-fluid rounded mb-3 ps-1 w-100"
                        />
                      </Link>
                    )}
                    <p className="card-text text-light">{post.content}</p>
                  </div>
                  <div className="row mt-5">
                    <div className="pb-3 col-4 text-start">
                      <i className="bi bi-heart text-light pe-1"></i>{" "}
                      {post.likes} Likes
                    </div>
                    <div className="pb-3 col-4 text-center">
                      <i className="bi bi-chat-dots-fill pe-1"></i> {post.likes}{" "}
                      Comments
                    </div>
                    <div className="pb-3 col-4 text-end pe-4">
                      <i className="bi bi-share pe-1"></i> {post.likes} Share
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal show={deleteShow} onHide={deletehandleClose}>
        <Modal.Body>Are You Want to Delete this Post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deletehandleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={(e) => deletePost(e, post.id)}>
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
          <Button variant="primary" onClick={(e) => editPost(e, post.id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={uploadShow} onHide={uploadhandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload  Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={onUploadFileChange}
            />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={uploadhandleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={uploadhandle}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.AuthRecducer.isAuthenticated,
  user: state.AuthRecducer.user,
  userProfile: state.AuthRecducer.userProfile,
});
export default connect(mapStateToProps)(CreatePost);

// (e) => editPost(e, post.id)
