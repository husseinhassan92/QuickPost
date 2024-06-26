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
import HeaderPost from '../HeaderPost/HeaderPost';
import Comment from '../Comment/Comment';



function MyPost({isAuthenticated, user, userProfile}) {

 
  const [postComments, setPostComments] = useState([]);

  const [postText, setPostText] = useState("");
  const [postCount, setPostCount] = useState(0);
  const [disablePostButton, setDisablePostButton] = useState(true);
  //const [user, setUser] = useState();
  const [deleteShow, setdeleteShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [editShow, seteditShow] = useState(false);
  const [uploadShow, setUploadShow] = useState(false);
  const [editPostText, setEditPostText] = useState("")
  const [image , setImage] = useState(null)

  let [Post, setPost] = useState([])
  
  async function getPost() {
    if (user){
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
    
  }




  useEffect(() => {
    getPost();
  }, [])





  // const lastPostElementRef = useCallback(
  //   (node) => {
  //     if (loading) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasMore) {
  //         setPageNumber((prevPageNumber) => prevPageNumber + 1);
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [loading, hasMore]
  // );

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
        getPost();
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
          'Content-Type': 'multipart/json-data',
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        }
      })
      .then((response) => {
        console.log("Comment deleted:", response.data);
        getPost()
        // Fetch updated comments for the specific post
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
      // Handle success, if needed
      getPost()
      setShowDropdown(!showDropdown);
    })
    .catch(error => {
      console.error('Error sharing post:', error);
      // Handle error, if needed
    });
}
 
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

const edithandleClose = () => {
  seteditShow(false)
  setShowDropdown(false);
};
const edithandleShow = () => seteditShow(true);

const deletehandleClose = () => {
  setdeleteShow(false);
  setShowDropdown(false);
};


  return (
    <>
    
      {Post.map((post, index) => (

        <div
          key={post.id}
          //ref={index === posts.length - 1 ? lastPostElementRef : null}
           >
          <div className="container-fluid mb-2">
            <div className="row">
              <div className="p-0">
                <div className="card text-dark">
                  <div className="card-body">

                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={post.profile.image === null ? WhatsApp : 'http://127.0.0.1:8000' +post.profile.image}
                        alt="Owner"
                        className="rounded-circle me-2 mb-2"
                        style={{ width: "50px", height: "50px" }}

                      />
                      <div className="align-self-center mb-2">
                        {post.profile.first_name} {post.profile.last_name}
                      </div>
                      <div className="ms-auto text-dark">
                        {new Date(post.create_at).toLocaleString()}

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
                            <Dropdown.Menu className="mt-2 txt-center">

                              <Button
                                onClick={() => deletepost(post.id)}
                                className="dropdown-item "
                              >
                                Delete Post
                              </Button>
                            </Dropdown.Menu>
                          </Dropdown>
                        )}

                      </div>
                    </div>




                     {/* <HeaderPost imgprofile={post.profile.image === null ? WhatsApp : post.profile.image} 
                     fullname={post.profile.first_name}
                     lastname={post.profile.last_name}
                     postdate={post.create_at}
                     postid={post.id}
                     deletepost={deletepost}

                     
                     
                     /> */}




                    {post.image && <Link to={`/post/${post.id}`}>
                      <img
                        src={'http://127.0.0.1:8000' + post.image}
                        alt="Post"
                        className="img-fluid rounded mb-3 ps-1 w-100"

                      />
                    </Link>}
                    {/* <h5 className="card-title text-light mt-3">
                            {post.title}
                          </h5> */}
                    <p className="card-text text-dark">{post.content}</p>
                    <div className="row mt-5">
                      <div className="pb-3 col-4 text-start">
                        <i className="bi bi-heart text-dark pe-1"></i>{" "}
                        {post.love_count}
                        <span className='d-md-line d-none'>Likes</span>
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
                        {post.comments_count}{' '}
                        <span className='d-md-line d-none'>Comments</span>
                      </div>







                      {post.comments.map((comment) => (
                        <div
                          key={Post.id}
                          className="card mb-2"
                        >
                          <div className="card-body border-bottom border-secondary border-3 ">
                            <div className="d-flex align-items-center pb-2">
                              <img
                                src={comment.profile.image === null ? WhatsApp : 'http://127.0.0.1:8000' +post.profile.image}
                                alt="Comment Owner"
                                className="rounded-circle me-2 text-dark"
                                style={{ width: "30px", height: "30px" }}
                              />
                              <div className="text-dark pt-2">
                              {comment.profile.first_name}{" "}
                              {comment.profile.last_name}{" "}
                                {/* {comment.data.profile.last_name} */}
                              </div>
                            </div>
                            <div className="container">
                              <div className="row">
                                <p className="card-text text-dark col-9">
                                  {comment.content}
                                </p>
                                <button
                                  className="btn  col-3 h-75"
                                  onClick={() =>
                                    handleDeleteComment(
                                      post.id,
                                      comment.id
                                    )
                                  }
                                >
                                  Delete
                                </button>
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
                  <div className="card text-dark">
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
                      <button
                        className="btn-2"
                        onClick={() =>
                          handleAddComment(post.id, post.profile.id)
                        }
                      >
                        Add Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* {index === posts.length - 1 && loading && (
            <div className="d-flex justify-content-center">
              <div
                className="spinner-grow text-secondary text-center"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )} */}
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
