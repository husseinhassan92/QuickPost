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
import HeaderPost from '../OtherHeaderPost/HeaderPost';
import Comment from '../Comment/Comment';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function MyPost({ isAuthenticated, user, userProfile, profileid }) {
  const [postComments, setPostComments] = useState([]);
  // const user_account = useParams();

  let [Post, setPost] = useState([])
  console.log('props line 1 :', profileid);
  async function getPost() {

    if (profileid) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/post/user/${profileid}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("access")}`,
            Accept: "application/json",
          }
        });
        setPost(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
  }

  useEffect(() => {
    getPost();
  }, []);
  const [newComment, setNewComment] = useState("");


  console.log(Post);
  const handleAddComment = (postId, ownerId) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/comments/all/",
        {
          c_author: user.id,
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
        setNewComment("") ;
        getPost();
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


  const deletepost = (postId) => {
    console.log(postId);
    axios.delete(`http://127.0.0.1:8000/api/post/del/${postId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        }
      })
      .then(response => {
        console.log('Post Unshared successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sharing post:', error);
      });
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
  return (
    <>
      {Post.map((post, index) => (
        <div
          key={post.id}
        >
          <div className="container">
            <div className="row">
              <div className="">
                <div className="card text-dark ">
                  <div className="card-body p-res p-4">
                    <HeaderPost imgprofile={post.profile.image === null ? WhatsApp : "http://127.0.0.1:8000" + post.profile.image}
                      fullname={post.profile.first_name}
                      lastname={post.profile.last_name}
                      postdate={post.create_at}
                      postid={post.id} profile={post.profile} />


                    <p className="card-text text-dark">{post.content}</p>
                    {post.image && <Link to={`/post/${post.id}`}>
                      <img
                        src={'http://127.0.0.1:8000' + post.image}
                        alt="Post"
                        className="imgpost rounded mb-3 w-100 mx-auto"

                      />
                    </Link>}

                    <div className="row mt-5">
                      <div className="pb-3 col-4 text-start">
                        <i className="bi bi-heart text-dark pe-1"></i>{" "}
                        {post.love_count}
                        <span className="d-lg-inline d-none">Likes</span>
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

                        {post.comments_count}{' '}
                        <span className="d-lg-inline d-none">Comments</span>
                      </div>
                      <div
                        className="pb-3 col-4 text-end pe-4"
                        onClick={() => sharePost(post.id)}
                      >
                        <i className="bi bi-share pe-1"></i>{" "}
                        {post.share_count} <span className="d-lg-inline d-none">Share</span>
                      </div>







                      {post.comments.map((comment) => (
                        <div
                          key={Post.id}
                          className="card   "
                        >
                          <div className="card-body border-bottom border-secondary border-1 ">
                            <div className="d-flex align-items-center pb-2">
                              <img
                                src={comment.profile.image === null ? WhatsApp : 'http://127.0.0.1:8000' + comment.profile.image}
                                alt="Comment Owner"
                                className="rounded-circle me-2 text-dark"
                                style={{ width: "30px", height: "30px" }}
                              />
                              <div className="text-dark pt-2">
                              {comment.profile.first_name}{" "}
                                      {comment.profile.last_name}{" "}
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
                                      post.id,
                                      comment.id
                                    )
                                  }
                                >
                                  <i className=" text-danger bi bi-trash3-fill"></i>

                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* <Comment
                    postid={post.id}
                    profileid={post.profile.id}

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

                </div>
              </div>
            </div>
          </div>

        </div>
      ))}
    </>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.AuthRecducer.isAuthenticated,
  user: state.AuthRecducer.user,
  userProfile: state.AuthRecducer.userProfile,
});
export default connect(mapStateToProps)(MyPost);
