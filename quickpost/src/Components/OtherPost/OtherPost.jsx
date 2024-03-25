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



function MyPost({isAuthenticated, user, userProfile , profileid}) {
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

  return (
    <>
      {Post.map((post, index) => (
        <div
          key={post.id}
        >
          <div className="container pt-4">
            <div className="row">
              <div className="col">
                <div className="card text-light bg-dark">
                  <div className="card-body">
                     <HeaderPost imgprofile={post.profile.image === null ? WhatsApp : "http://127.0.0.1:8000"+post.profile.image} 
                     fullname={post.profile.first_name}
                     lastname={post.profile.last_name}
                     postdate={post.create_at}
                     postid={post.id} profile={post.profile} />




                    <Link to={`/post/${post.id}`}>
                      <img
                        src={'http://127.0.0.1:8000' + post.image}
                        alt="Post"
                        className="img-fluid rounded mb-3 ps-1 w-100"

                      />
                    </Link>
                   
                    <p className="card-text text-light">{post.content}</p>
                    <div className="row mt-5">
                      <div className="pb-3 col-4 text-start">
                        <i className="bi bi-heart text-light pe-1"></i>{" "}
                        {post.love_count} Likes
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
                        Comments
                      </div>







                      {post.comments.map((comment) => (
                        <div
                          key={Post.id}
                          className="card mb-2 bg-dark  "
                        >
                          <div className="card-body border-bottom border-secondary border-3 ">
                            <div className="d-flex align-items-center pb-2">
                            <img
    src={post.profile.image === null ? WhatsApp : 'http://127.0.0.1:8000' + post.profile.image}
    alt="Comment Owner"
    className="rounded-circle me-2 text-light"
    style={{ width: "30px", height: "30px" }}
/>
                              <div className="text-light pt-2">
                                {comment.c_author.username}{" "}
                              </div>
                            </div>
                            <div className="container">
                              <div className="row">
                                <p className="card-text text-light col-9">
                                  {comment.content}
                                </p>
                                <button
                                  className="btn btn-danger col-3 h-75"
                                  onClick={() =>
                                    handleDeleteComment(
                                      post.id,
                                      comment.id
                                    )
                                  }
                                >
                                  Report
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Comment
                  postid={post.id}
                  profileid={post.profile.id}
                  
                  />
               
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
