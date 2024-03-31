import React from 'react'

import { useCallback, useEffect, useRef, useState } from "react";
import axios, { Axios } from "axios";
import InifinteScroll from "../Posts/InifinteScroll";
import Leftbar from "../LeftSide/LeftSide";
import Rightbar from "../RightSide/RightSide";
import CreatePost from "../CreatePost/CreatePost";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import WhatsApp from '../../images/WhatsApp.jpeg'
import { Button, Dropdown } from 'react-bootstrap';
import Comment from '../Comment/Comment';
import HeaderShared from '../OtherHeaderShared/HeaderShared';

function SharedPost({ isAuthenticated, user, userProfile, profileid }) {
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, data: posts, hasMore } = InifinteScroll(pageNumber);
  const observer = useRef();
  const [postComments, setPostComments] = useState([]);

  let [Post, setPost] = useState([])
  async function getPost() {

    let { data } = await axios.get(`http://127.0.0.1:8000/api/post/user/${user.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      }
    })
    console.log(data);
    setPost(data.posts)
  }

  let [SharedPost, setSharedPost] = useState([])
  console.log('props line :', profileid);

  async function getSharedPost() {
    let { data } = await axios.get(`http://127.0.0.1:8000/api/post/user/${profileid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      }
    })
    // console.log(share);
    setSharedPost(data.shared)
  }

  useEffect(() => {
    getPost();
    getSharedPost();
  }, [])





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


  console.log(Post);
  const handleAddComment = (postId, ownerId) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/comments/all/",
        {
          c_author: ownerId,
          post: postId,
          content: newComment,
          profile: userProfile.id
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("access")}`,
            Accept: "application/json",
          }
        }
      )
      .then((response) => {
        console.log("Comment added:", response.data);
        setNewComment("");
        axios
          .get(`http://127.0.0.1:8000/api/comments/comment/${postId}`)
          .then((response) => {
            console.log("Comments for post:", response.data);
            setPostComments((prevComments) => [...prevComments, response.data]);
          })
          .catch((err) => console.log("Error fetching comments:", err));
      })
      .catch((err) => {
        console.log("Error adding comment:", err.response.data);
      });
  };









  const sharePost = (postId) => {
    axios.post(`http://127.0.0.1:8000/api/post/share/`,
      {
        //note
        author: user.id,
        profile: userProfile.id,
        post: postId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        }
      })
      .then(response => {
        console.log('Post shared successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sharing post:', error);
      });
  };

  const handleDeleteComment = (postId, commentId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/comments/comment/${commentId}`, {
        headers: {
          'Content-Type': 'multipart/json-data',
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        }
      })
      .then((response) => {
        console.log("Comment deleted:", response.data);
        axios
          .get(`http://127.0.0.1:8000/api/comments/comment/${postId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${localStorage.getItem("access")}`,
              Accept: "application/json",
            }
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



  const [postText, setPostText] = useState("");
  const [postCount, setPostCount] = useState(0);
  const [disablePostButton, setDisablePostButton] = useState(true);
  const [deleteShow, setdeleteShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [editShow, seteditShow] = useState(false);
  const [uploadShow, setUploadShow] = useState(false);
  const [editPostText, setEditPostText] = useState("")
  const [image, setImage] = useState(null)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const uploadhandleClose = () => {
    setUploadShow(false)
    setImage(null)
  };
  const uploadhandle = () => {
    setUploadShow(false)
  };
  const uploadhandleShow = () => setUploadShow(true);
  return (
    <>

      {SharedPost.map((sharep, index) => (
        <div
          key={sharep.post.id}
          ref={index === posts.length - 1 ? lastPostElementRef : null}
        >
          <div className="container pt-4">
            <div className="row">
              <div className="">
                <div className="card text-dark bg-card">
                  <div className="card-body">


                    <HeaderShared
                      profileimg={sharep.profile.image === null ? WhatsApp : "http://127.0.0.1:8000" + sharep.profile.image}
                      firstNmae={sharep.profile.first_name}
                      lastName={sharep.profile.last_name}
                      sharedDate={sharep.create_at}
                      Shareid={sharep.post.id}
                    />
                    <div className="card-body form-control">
                      <div className="d-flex align-items-center mb-3">
                        <img
                          src={sharep.post.profile.image === null ? WhatsApp : "http://127.0.0.1:8000" +sharep.post.profile.image}
                          alt="Owner"
                          className="rounded-circle me-2 mb-2"
                          style={{ width: "50px", height: "50px" }}

                        />
                        <div className="align-self-center mb-2 text-dark">
                          {sharep.post.profile.first_name} {sharep.post.profile.last_name}
                        </div>
                        <div className="ms-auto text-dark">
                          {new Date(sharep.post.create_at).toLocaleString()}
                        </div>
                      </div>
                      <p className="card-text text-dark">{sharep.post.content}</p>
                      <Link to={`/post/${sharep.post.id}`}>
                        <img
                          src={'http://127.0.0.1:8000' + sharep.post.image}
                          alt="Post"
                          className="imgpost rounded mb-3  w-100 mx-auto"

                        />
                      </Link>
                      <div className="row mt-5">
                        <div className="pb-3 col-4 text-start">
                          <i className="bi text-dark bi-heart text-light pe-1"></i>{" "}
                          {sharep.post.love_count}
                          Likes
                        </div>



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
                                console.log("Error fetching comments:", err)
                              );
                          }}
                        >
                          <i className="bi bi-chat-dots-fill pe-1"></i>{" "}

                          {sharep.post.comments_count}{' '}
                          <span className="d-lg-inline d-none">Comments</span>
                        </div>



                        <div className="pb-3 col-4 text-end pe-4" onClick={() => sharePost(sharep.post.id)}>
                          <i className="bi bi-share pe-1"></i> {sharep.post.share_count}{" "}
                          Share
                        </div>






                      </div>
                    </div>
                    {sharep.post.comments.map((comment) => (
                      <div
                        key={Post.id}
                        className="card mb-2   "
                      >
                        <div className="card-body  border-1 ">
                          <div className="d-flex align-items-center pb-2">
                            <img
                              src={sharep.post.profile.image === null ? WhatsApp : "http://127.0.0.1:8000"+sharep.post.profile.image}
                              alt="Comment Owner"
                              className="rounded-circle me-2 text-dark"
                              style={{ width: "30px", height: "30px" }}
                            />
                            <div className="text-dark  pt-2">
                              {comment.c_author.username}{" "}
                              {/* {comment.data.profile.last_name} */}
                            </div>
                          </div>
                          <div className="container">
                            <div className="row">
                              <p className="card-text text-dark col-11">
                                {comment.content}

                              </p>
                              <Button
                                className="bg-card  border border-0 col-1 h-75"
                                onClick={() =>
                                  handleDeleteComment(
                                    sharep.post.id,
                                    comment.id
                                  )
                                }
                              >
                                <i className="text-danger bi bi-trash3-fill"></i>

                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* <Comment
                      postid={sharep.post.id}
                      profileid={sharep.post.profile.id}

                    /> */}
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
                        <Button
                          className="btn-2"
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
    </>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.AuthRecducer.isAuthenticated,
  user: state.AuthRecducer.user,
  userProfile: state.AuthRecducer.userProfile,
});

export default connect(mapStateToProps)(SharedPost);
