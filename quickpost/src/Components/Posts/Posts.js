import React, { useCallback, useEffect, useRef, useState } from "react";
import axios, { Axios } from "axios";
import InifinteScroll from "./InifinteScroll";
import CreatePost from "../CreatePost/CreatePost";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import WhatsApp from "../../images/WhatsApp.jpeg";
import Comment from "../Comment/Comment";
import { Alert, Button, Dropdown, Modal } from "react-bootstrap";
import './Posts.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Posts = ({ isAuthenticated, user, userProfile }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, data: posts, hasMore } = InifinteScroll(pageNumber);
  const observer = useRef();
  const [postComments, setPostComments] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [message, setMessage] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [reportText, setReportText] = useState("");
  const [reportPostId, setReportPostId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);


  const handleReportTextChange = (e) => {
    setReportText(e.target.value);
  };

  const handleShowModal = (postId) => {
    setShowModal(true);
    setReportPostId(postId); // Add this line to store the postId in state
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };


  const handleCloseModal = () => {
    setShowModal(false);
    setReportText("");
  };

  const handleAddReport = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/report/report/', {
        post: reportPostId,
        user: user.id,
        reason: reportText,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      });
      toast.success('Report Send Successfully');
      setShowModal(false); // Close the modal
      setReportText("");

    } catch (error) {
      if (error.response) {
        toast.error(`Failed to add report: ${error.response.data.detail}`);
      } else {
        console.error('Error adding report:', error.message);
        toast.error('An error occurred while adding report');
      }
    }
  };

  let [Post, setPost] = useState([]);
  async function getPost() {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      let { data } = await axios.get(
        `http://127.0.0.1:8000/api/post/all/`,
        config
      );
      console.log(data);
      setPost(data.posts);
    }
  }

  let [SharedPost, setSharedPost] = useState([]);
  async function getSharedPost() {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      let { data } = await axios.get(
        `http://127.0.0.1:8000/api/post/all/`,
        config
      );
      // console.log(share);
      setSharedPost(data.shared);
    }
  }

  const sharePost = (postId) => {
    axios
      .post(
        `http://127.0.0.1:8000/api/post/share/`,
        {
          author: user.id,
          profile: userProfile.id,
          post: postId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("access")}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Post shared successfully:", response.data);
        // Update the state to increment the share_count of the shared post
        const updatedPosts = Post.map((post) => {
          if (post.id === postId) {
            return { ...post, share_count: post.share_count + 1 };
          }
          return post;
        });
        setPost(updatedPosts);
        // Set a success message
        toast.success('Post Shared successfully');
      })
      .catch((error) => {
        console.error("Error sharing post:", error);
        // Handle error, if needed
      });
  };

  useEffect(() => {
    getPost();
    getSharedPost();
  }, []);

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const [newComment, setNewComment] = useState("");

  //console.log(Post);
  const handleAddComment = (postId, ownerId) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/comments/all/",
        {
          c_author: user.id,
          post: postId,
          content: newComment,
          profile: userProfile.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("access")}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Comment added:", response.data);
        setNewComment("");
        getPost();
        getSharedPost()
        // Fetch comments for the specific post
        axios
          .get(`http://127.0.0.1:8000/api/comments/comment/${postId}`)
          .then((response) => {
            console.log("Comments for post:", response.data);
            // Update postComments state with the new comment included
            setPostComments((prevComments) => [...prevComments, response.data]);
          })
          .catch((err) => console.log("Error fetching comments:", err));
      })
      .catch((err) => {
        console.log("Error adding comment:", err.response.data);
      });
    // console.log('Salah');
  };

  const handleDeleteComment = (postId, commentId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/comments/comment/${commentId}`, {
        headers: {
          "Content-Type": "multipart/json-data",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("Comment deleted:", response.data);
        getPost();
        getSharedPost()
        // Fetch updated comments for the specific post
        axios
          .get(`http://127.0.0.1:8000/api/comments/comment/${postId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${localStorage.getItem("access")}`,
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log("Comments for post:", response.data);
            setPostComments(response.data.data);
          })
          .catch((err) => console.log("Error fetching comments:", err));
      })
      .catch((err) => {
        console.log("Error deleting comment:", err.response.data);
      });
  };
  const isPostLiked = (postId) => {
    return likedPosts.includes(postId);
  };
  const handleLikePost = (postId) => {
    axios
      .post(
        `http://127.0.0.1:8000/api/reactions/add/`,
        {
          post: postId,
          user: user.id,
          profile: userProfile.id,
          reaction_type: "❤️",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("access")}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        setLikedPosts([...likedPosts, postId]);

        const updatedPosts = Post.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              isLiked: true,
              reaction_count: post.reaction_count + 1,
            };
          }
          return post;
        });
        setPost(updatedPosts);
      })
      .catch((error) => { });
  };

  const handleUnlikePost = (postId) => {
    axios
      .post(
        `http://127.0.0.1:8000/api/reactions/unlike`,
        { post: postId, user: user.id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("access")}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        setLikedPosts(likedPosts.filter((id) => id !== postId));

        const updatedPosts = Post.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              isLiked: false,
              reaction_count: post.reaction_count - 1,
            };
          }
          return post;
        });
        setPost(updatedPosts);
      })
      .catch((error) => { });
  };

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className="row p-0">
        <div className="">
          <div>
            <CreatePost />
            {Post.map((post, index) => (
              <div
                key={post.id}
                ref={index === posts.length - 1 ? lastPostElementRef : null}
              >
                <div className="container pt-4 ">
                  <div className="row">
                    
                      <div
                        className="card  text-dark form-shadow"
                        style={{
                          transform: "translateY(0)",
                          transition: "transform 0.3s",
                        }}
                      >
                        <div className="card-body- p-res p-4">
                          <div className="d-flex align-items-center mb-3">
                            {post.profile.user_account === user.id ? (
                              <img 
                                src={
                                  "http://127.0.0.1:8000" + post.profile.image
                                }
                                alt="Owner"
                                className="rounded-circle me-2 mb-2"
                                style={{ width: "50px", height: "50px" }}
                              />
                            ) : (
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
                            )}
                            <div className="align-self-center mb-2 user_title">
                              {post.profile.first_name} {post.profile.last_name}
                            </div>
                            <div className="ms-auto text-dark">
                              <span className="d-md-inline d-none">{new Date(post.create_at).toLocaleString()}</span>
                              <i
                                className="bi bi-three-dots-vertical text-dark "
                                onClick={toggleDropdown}
                              ></i>
                              {showDropdown && (
                                <Dropdown
                                  align="center"
                                  className="mt-0 ms-2"
                                  show={showDropdown}
                                  onClose={() => setShowDropdown(false)}
                                >
                                  <Dropdown.Menu className="mt-2 p-0 text-center ">
                                    <Button
                                      // <Dropdown.Item onClick={() => handleShowModal(post.id)}>Report</Dropdown.Item>

                                      onClick={() => {
                                        handleShowModal(post.id);
                                        setShowDropdown(false);
                                      }}
                                      className="dropdown-item btn_color"

                                    >
                                      Report
                                    </Button>
                                  </Dropdown.Menu>
                                </Dropdown>
                              )}

                              <Modal show={showModal} onHide={() => setShowModal(false)}>
                                <Modal.Header closeButton className="post">
                                  <Modal.Title>Report Post</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="post">
                                  <textarea
                                    value={reportText}
                                    onChange={handleReportTextChange}
                                    placeholder="Enter your report here..."
                                    className="form-control textarea  post border border-dark"
                                  />
                                </Modal.Body>
                                <Modal.Footer className="post border border-0">
                                  <Button variant="secondary" onClick={() => handleCloseModal()}>
                                    Close
                                  </Button>
                                  <Button className="btn-2" onClick={handleAddReport}>
                                    Send Report
                                  </Button>
                                </Modal.Footer>
                              </Modal>

                            </div>

                          </div>
                          <p className="card-text text-dark">{post.content}</p>
                          <Link to={`/post/${post.id}`} className="post-img">
                            {post.image && (
                              <img
                                src={"http://127.0.0.1:8000" + post.image}
                                alt="Post"
                                className=" imgpost rounded mb-3 w-100 mx-auto"
                              />
                            )}
                          </Link>
                          {/* <h5 className="card-title text-light mt-3">
                            {post.title}
                          </h5> */}
                          <div className="row mt-5">
                            <div
                              className="pb-3 col-4 text-start"
                              onClick={() =>
                                isPostLiked(post.id)
                                  ? handleUnlikePost(post.id)
                                  : handleLikePost(post.id)
                              }
                            >
                              <i
                                className={
                                  isPostLiked(post.id)
                                    ? "bi bi-heart-fill text-danger pe-1"
                                    : "bi bi-heart text-dark pe-1"
                                }
                              ></i>{" "}
                              {post.reaction_count}<span className="d-lg-inline d-none"> Like</span>
                            </div>

                            <div
                              className="pb-3 col-4 text-center"
                              onClick={() => {
                                axios
                                  .get(
                                    `http://127.0.0.1:8000/api/comments/comment/${post.id}/`,
                                    {
                                      headers: {
                                        "app-id": "65d08f07b536e68ad8626e8c",
                                        Authorization: "Bearer your-token",
                                      },
                                    }
                                  )
                                  .then((response) => {
                                    setPostComments(response.data.data);
                                  })
                                  .catch((err) =>
                                    console.log("Error fetching comments:", err)
                                  );
                              }}
                            >
                              <i className="bi bi-chat-dots-fill pe-1"></i>{" "}
                              {/* {
                                postComments.filter(
                                  (comment) => comment.post === post.id
                                ).length
                              }{" "} */}
                              {post.comments_count} <span className="d-lg-inline d-none">Comments</span>
                            </div>

                            <div
                              className="pb-3 col-4 text-end pe-4"
                              onClick={() => sharePost(post.id)}
                            >
                              <i className="bi bi-share pe-1"></i>{" "}
                              {post.share_count} <span className="d-lg-inline d-none">Share</span>
                            </div>
                            {/* {message && (
                              <Alert variant="success">{message}</Alert>
                            )} */}

                            {post.comments.map((comment) => (
                              <div
                                key={Post.id}
                                className="card  post border border-1  "
                              >
                                <div className="card-body post border-bottom border-secondary border-1 ">
                                  <div className="d-flex align-items-center pb-2">
                                    <img
                                      src={
                                        comment.profile.image === null
                                          ? WhatsApp
                                          : "http://127.0.0.1:8000" +
                                          post.profile.image
                                      }
                                      alt="Comment Owner"
                                      className="rounded-circle me-2 text-dark"
                                      style={{ width: "30px", height: "30px" }}
                                    />
                                    <div className="text-dark pt-2">
                                      {post.profile.first_name}{" "}
                                      {post.profile.last_name}{" "}
                                    </div>
                                  </div>
                                  <div className="container">
                                    <div className="row">
                                      <p className="card-text text-dark col-11">
                                        {comment.content}
                                      </p>
                                      {comment.c_author.id === user.id && (
                                        <Button
                                          className=" btn-delete post text-danger border border-0 col-1 h-75"
                                          onClick={() =>
                                            handleDeleteComment(
                                              post.id,
                                              comment.id
                                            )
                                          }
                                        >
                                          <i className="bi bi-trash3-fill"></i>
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="card text-dark post border border-0">
                          <div className="card-body">
                            <h5 className="card-title text-dark mt-3">
                              Add Comment
                            </h5>
                            <textarea
                              className="form-control form_input rounded-2 textarea  mb-3 mt-3"
                              placeholder="Enter your comment"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            ></textarea>
                            {/* <button
                              className="btn1"
                              onClick={() =>
                                handleAddComment(post.id, post.profile.id)
                              }
                            >
                              Add Comment
                            </button> */}
                            <Button
                              className="btn-2"
                              onClick={() =>
                                handleAddComment(post.id, post.profile.id)
                              }
                            >
                              Add Comment
                            </Button>
                          </div>
                        </div>
                        {/* <Comment postid={post.id} profileid={post.profile.id} />{" "} */}
                      </div>
                    
                  </div>
                </div>
                {index === posts.length - 1 && loading && (
                  <div className="d-flex justify-content-center">
                    <div
                      className="spinner-grow text-secondary text-center"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {/* ========================================================================================================== */}

            {SharedPost.map((sharep, index) => (
              <div
                key={sharep.post.id}
                ref={index === posts.length - 1 ? lastPostElementRef : null}
              >
                <div className="container pt-4">
                  <div className="row">
                    <div className="">
                      <div className="card text-dark sharedpost">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-3">
                            <img
                              src={
                                sharep.profile.image === null
                                  ? WhatsApp
                                  : "http://127.0.0.1:8000" +
                                  sharep.profile.image
                              }
                              alt="Owner"
                              className="rounded-circle me-2 mb-2"
                              style={{ width: "50px", height: "50px" }}
                            />
                            <div className="align-self-center mb-2">
                              {sharep.profile.first_name}{" "}
                              {sharep.profile.last_name}
                            </div>
                            <div className="ms-auto text-dark">
                              {new Date(sharep.create_at).toLocaleString()}
                            </div>
                          </div>

                          <div className="card-body form-control post">
                            <div className="d-flex align-items-center mb-3">
                              <img
                                src={
                                  sharep.post.profile.image === null
                                    ? WhatsApp
                                    : "http://127.0.0.1:8000" +
                                    sharep.post.profile.image
                                }
                                alt="Owner"
                                className="rounded-circle me-2 mb-2"
                                style={{ width: "50px", height: "50px" }}
                              />
                              <div className="align-self-center mb-2">
                                {sharep.post.profile.first_name}{" "}
                                {sharep.post.profile.last_name}
                              </div>
                              <div className="ms-auto text-dark">
                                {new Date(
                                  sharep.post.create_at
                                ).toLocaleString()}
                              </div>
                            </div>
                            <p className="card-text text-dark">
                              {sharep.post.content}
                            </p>
                            <Link to={`/post/${sharep.post.id}`}>
                              {sharep.post.image && (
                                <img
                                  src={
                                    "http://127.0.0.1:8000" + sharep.post.image
                                  }
                                  alt="Post"
                                  className="img-fluid rounded mb-3 ps-1 w-100"
                                />
                              )}
                            </Link>

                            <div className="row mt-5">
                              <div className="pb-3 col-4 text-start">
                                <i className="bi text-dark bi-heart text-light pe-1"></i>{" "}
                                {sharep.post.love_count} Likes
                              </div>
                              {/* <div
                                className="pb-3 col-4 text-start"
                                onClick={() =>
                                  isPostLiked(post.id)
                                    ? handleUnlikePost(post.id)
                                    : handleLikePost(post.id)
                                }
                              >
                                <i
                                  className={
                                    isPostLiked(post.id)
                                      ? "bi bi-heart-fill text-danger pe-1"
                                      : "bi bi-heart text-dark pe-1"
                                  }
                                ></i>{" "}
                                {post.love_count}<span className="d-lg-inline d-none"> Like</span>
                              </div> */}






                              <div
                                className="pb-3 col-4 text-center"
                                onClick={() => {
                                  axios
                                    .get(
                                      `http://127.0.0.1:8000/api/comments/comment/${sharep.post.id}/`,
                                      {
                                        headers: {
                                          "app-id": "65d08f07b536e68ad8626e8c",
                                          Authorization: "Bearer your-token",
                                        },
                                      }
                                    )
                                    .then((response) => {
                                      setPostComments(response.data.data);
                                    })
                                    .catch((err) =>
                                      console.log(
                                        "Error fetching comments:",
                                        err
                                      )
                                    );
                                }}
                              >
                                <i className="bi bi-chat-dots-fill pe-1"></i>{" "}
                                {sharep.post.comments_count} Comments
                              </div>

                              <div
                                className="pb-3 col-4 text-end pe-4"
                                onClick={() => sharePost(sharep.post.id)}
                              >
                                <i className="bi bi-share pe-1"></i>{" "}
                                {sharep.post.share_count} Share
                              </div>

                              {sharep.post.comments.map((comment) => (
                                <div
                                  key={Post.id}
                                  className="card mb-2 post "
                                >
                                  <div className="card-body post border-bottom border-secondary border-1 ">
                                    <div className="d-flex align-items-center pb-2">
                                      <img
                                        src={
                                          sharep.post.profile.image === null
                                            ? WhatsApp
                                            : "http://127.0.0.1:8000" +
                                            sharep.post.profile.image
                                        }
                                        alt="Comment Owner"
                                        className="rounded-circle me-2 text-dark"
                                        style={{
                                          width: "30px",
                                          height: "30px",
                                        }}
                                      />
                                      <div className="text-dark pt-2">
                                        {sharep.profile.first_name}{" "}
                                        {sharep.profile.last_name}
                                      </div>
                                    </div>
                                    <div className="container">
                                      <div className="row">
                                        <p className="card-text text-dark col-11">
                                          {comment.content}
                                        </p>
                                        {user.id === comment.c_author.id && (
                                          <Button
                                            className="btn-delete post text-danger border border-0 col-1 h-75"
                                            onClick={() =>
                                              handleDeleteComment(
                                                sharep.post.id,
                                                comment.id
                                              )
                                            }
                                          >
                                            <i className="bi bi-trash3-fill"></i>

                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="card text-dark post border border-0">
                            <div className="card-body">
                              <h5 className="card-title text-dark mt-3">
                                Add Comment
                              </h5>
                              <textarea
                                className="form-control textarea post border border-dark mb-3 mt-3"
                                placeholder="Enter your comment"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                              ></textarea>
                              <Button
                                className="btn1 "
                                onClick={() =>
                                  handleAddComment(
                                    sharep.post.id,
                                    sharep.post.profile.id
                                  )
                                }
                              >
                                Add Comment
                              </Button>
                            </div>
                          </div>
                          {/* <Comment
                            postid={sharep.post.id}
                            profileid={sharep.post.profile.id}
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {index === posts.length - 1 && loading && (
                    <div className="d-flex justify-content-center">
                      <div
                        className="spinner-grow text-secondary text-center"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.AuthRecducer.isAuthenticated,
  user: state.AuthRecducer.user,
  userProfile: state.AuthRecducer.userProfile,
});

export default connect(mapStateToProps)(Posts);
