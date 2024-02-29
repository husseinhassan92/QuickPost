import React, { useCallback, useRef, useState } from "react";
import axios from "axios";
import InifinteScroll from "./InifinteScroll";
import Leftbar from "../LeftSide/LeftSide";
import Rightbar from "../RightSide/RightSide";
import CreatePost from '../CreatePost/CreatePost'
import { Link } from "react-router-dom";

const Posts = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, data: posts, hasMore } = InifinteScroll(pageNumber);
  const observer = useRef();
  const [postComments, setPostComments] = useState([]);

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

  const handleAddComment = (postId, ownerId) => {
    axios
      .post(
        "https://dummyapi.io/data/v1/comment/create",
        {
          owner: ownerId,
          post: postId,
          message: newComment,
        },
        {
          headers: {
            "app-id": "65d08f07b536e68ad8626e8c",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Comment added:", response.data);
        setNewComment("");
        // Fetch comments for the specific post
        axios
          .get(`https://dummyapi.io/data/v1/post/${postId}/comment`)
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
  };

  const handleDeleteComment = (postId, commentId) => {
    axios
      .delete(`https://dummyapi.io/data/v1/comment/${commentId}`, {
        headers: {
          "app-id": "65d08f07b536e68ad8626e8c",
        },
      })
      .then((response) => {
        console.log("Comment deleted:", response.data);
        // Fetch updated comments for the specific post
        axios
          .get(`https://dummyapi.io/data/v1/post/${postId}/comment`, {
            headers: {
              "app-id": "65d08f07b536e68ad8626e8c",
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

  return (
    <div className="container-fluid">
      <div className="row p-0">
        <div className="col-3 p-0">
          <Leftbar />
        </div>
        <div className="col-6">
          <div>
            <CreatePost />

            {posts.map((post, index) => (
              <div
                key={post.id}
                ref={index === posts.length - 1 ? lastPostElementRef : null}
              >
                <div className="container pt-4">
                  <div className="row">
                    <div className="col">
                      <div className="card text-light bg-dark">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-3">
                            <img
                              src={post.owner.picture}
                              alt="Owner"
                              className="rounded-circle me-2 mb-2"
                              style={{ width: "50px", height: "50px" }}
                            />
                            <div className="align-self-center mb-2">
                              {post.owner.firstName} {post.owner.lastName}
                            </div>
                            <div className="ms-auto text-light">
                              {new Date(post.publishDate).toLocaleString()}
                            </div>
                          </div>
                          <Link to={`/post/${post.id}`}>
                            <img
                              src={post.image}
                              alt="Post"
                              className="img-fluid rounded mb-3 ps-1 w-100"
                            />
                          </Link>
                          <h5 className="card-title text-light mt-3">
                            {post.title}
                          </h5>
                          <p className="card-text text-light">{post.text}</p>
                          <div className="row mt-5">
                            <div className="pb-3 col-4 text-start">
                              <i className="bi bi-heart text-light pe-1"></i>{" "}
                              {post.likes} Likes
                            </div>
                            <div
                              className="pb-3 col-4 text-center"
                              onClick={() => {
                                axios
                                  .get(
                                    `https://dummyapi.io/data/v1/post/${post.id}/comment?limit=3`,
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
                              {
                                postComments.filter(
                                  (comment) => comment.post === post.id
                                ).length
                              }{" "}
                              Comments
                            </div>
                            <div className="pb-3 col-4 text-end pe-4">
                              <i className="bi bi-share pe-1"></i> {post.likes}{" "}
                              Share
                            </div>

                            {postComments.map((comment) => (
                              <div
                                key={comment.id}
                                className="card mb-2 bg-dark  "
                              >
                                <div className="card-body border-bottom border-secondary border-3 ">
                                  <div className="d-flex align-items-center pb-2">
                                    <img
                                      src={comment.owner.picture}
                                      alt="Comment Owner"
                                      className="rounded-circle me-2 text-light"
                                      style={{ width: "30px", height: "30px" }}
                                    />
                                    <div className="text-light pt-2">
                                      {comment.owner.firstName}{" "}
                                      {comment.owner.lastName}
                                    </div>
                                  </div>
                                  <div className="container">
                                    <div className="row">
                                      <p className="card-text text-light col-9">
                                        {comment.message}
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
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="card text-light bg-dark">
                          <div className="card-body">
                            <h5 className="card-title text-light mt-3">
                              Add Comment
                            </h5>
                            <textarea
                              className="form-control"
                              placeholder="Enter your comment"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            ></textarea>
                            <button
                              className="btn btn-primary mt-2"
                              onClick={() =>
                                handleAddComment(post.id, post.owner.id)
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
          </div>
        </div>
        <div className="col-3 p-0 m-0">
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default Posts;

// import React, { useCallback, useRef, useState } from 'react'
// import InifinteScroll from './InifinteScroll'
// import Leftbar from '../LeftSide/LeftSide'
// import Rightbar from "../RightSide/RightSide"
// import { Link } from 'react-router-dom/cjs/react-router-dom.min'
// import CreatePost from '../CreatePost/CreatePost'
// import { Button, Form, Dropdown, Modal } from "react-bootstrap";
// import axios from 'axios'

// const Posts = () => {
//   const [pageNumber, setPageNumber] = useState(1)
//   const [post, setPost] = useState();
//   const {loading, data, hasMore} = InifinteScroll(pageNumber)
//   const observer = useRef()

//   const [deleteShow, setdeleteShow] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [editShow, seteditShow] = useState(false);

//   const edithandleClose = () => seteditShow(false);
//   const edithandleShow = () => seteditShow(true);

//   const deletehandleClose = () => {setdeleteShow(false)
//     setShowDropdown(false)};

//   const deletehandleShow = (id) => {
//     data.map((post, index) => {
//       if (post.id === id) {
//         setdeleteShow(true)
//         setPost(id)
//     }
//     })};

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const deletePost = (e, id) => {
//     console.log(id)
//     e.stopPropagation();
//     setdeleteShow(false);
//     setShowDropdown(!showDropdown)
//     axios
//       .delete(`https://dummyapi.io/data/v1/post/${id}`, {
//         headers: {
//           "app-id": "65d08a4661de33117cf6503f",
//         },
//       })
//       .then((response) => {
//         console.log(response);
//         setPost(null);
//         //alert(response.status + ": Post Deleted")
//         //window.location.reload()
//       })
//       .catch((err) => console.log(err));
//   };
//   // const editPost = (e, id) => {
//   //   e.stopPropagation();
//   //   console.log(id);
//   // };

//   const lastPostElementRef = useCallback(node => {
//     if (loading) return
//     if (observer.current) observer.current.disconnect()
//     observer.current = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting && hasMore) {
//         setPageNumber(prevPageNumber => prevPageNumber + 1)
//       }
//     })
//     if (node) observer.current.observe(node)
//   }, [loading, hasMore])

//   return (
//     <>
//       < div className="container-fluid" >
//         <div className="row p-0">
//           <div className="col-3 p-0 ">
//             <Leftbar />
//           </div>
//           <div className="col-6 ">
//             <div>
//                 <CreatePost />
//               {data.map((post, index) => {
//                 if (data.length === index + 1) {
//                   return (
//                     <div className='container  pt-4 ' ref={lastPostElementRef} key={post.id} >
//                       <div className='row '>
//                         <div className='col'>
//                           <div className='card text-light bg-dark' >
//                             <div className='card-body' style={{ width: "30rem", height: "40rem" }}>
//                               <div className='d-flex align-items-center mb-3'>
//                                 <img src={post.owner.picture} alt="Owner" className='rounded-circle me-2 mb-2 ' style={{ width: '50px', height: '50px' }} />
//                                 <div className='align-self-center mb-2 '>{post.owner.firstName} {post.owner.lastName}</div>
//                                 <div className="ms-auto text-light row">
//                       <div className="col-10">
//                         {new Date(post.publishDate).toLocaleString()}
//                       </div>

//                       <div className="col-1">
//                         <i
//                           className="bi bi-three-dots-vertical text-light "
//                           onClick={toggleDropdown}
//                         ></i>
//                         {showDropdown && (
//                           <Dropdown
//                             align="center"
//                             className="mt-0 ms-2"
//                             show={showDropdown}
//                             onClose={() => setShowDropdown(false)}
//                           >
//                             <Dropdown.Menu className="mt-2 txt-center">
//                               <Button
//                                 onClick={edithandleShow}
//                                 className="dropdown-item"
//                               >
//                                 Edit
//                               </Button>
//                               <Button
//                                 onClick={() => deletehandleShow(post.id)}
//                                 className="dropdown-item "
//                               >
//                                 Delete
//                               </Button>
//                             </Dropdown.Menu>
//                           </Dropdown>
//                         )}
//                       </div>
//                     </div>
//                               </div>
//                               <div>
//                                 <Link to={`/post/${post.id}`}>
//                                 <img src={post.image} alt="Post" className='img-fluid rounded mb-3 ps-1 w-100'/>
//                                 </Link>
//                                 <h5 className='card-title text-light mt-3'>{post.title}</h5>
//                                 <p className='card-text text-light'>{post.text}</p>
//                               </div>
//                               <div className='row mt-5'>
//                                 <div className='pb-3 col-4 text-start'><i className="bi bi-heart text-light pe-1"></i>  {post.likes}  Likes</div>
//                                 <div className='pb-3 col-4 text-center'><i className="bi bi-chat-dots-fill pe-1"></i>  {post.likes}  Comments</div>
//                                 <div className='pb-3 col-4 text-end pe-4' ><i className="bi bi-share pe-1"></i>  {post.likes}  Share</div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 } else {
//                   return (
//                     <div className='container pt-4 ' key={post.id}  >
//                       <div className='row '>
//                         <div className='col'>
//                           <div className='card text-light bg-dark'>
//                             <div className='card-body h-50' >
//                               <div className='d-flex align-items-center mb-3 '>
//                                 <img src={post.owner.picture} alt="Owner" className='rounded-circle me-2 mb-2 ' style={{ width: '50px', height: '50px' }} />
//                                 <div className='align-self-center mb-2 '>{post.owner.firstName} {post.owner.lastName}</div>
//                                 <div className="ms-auto text-light row">
//                       <div className="col-10">
//                         {new Date(post.publishDate).toLocaleString()}
//                       </div>

//                       <div className="col-1">
//                         <i
//                           className="bi bi-three-dots-vertical text-light "
//                           onClick={toggleDropdown}
//                         ></i>
//                         {showDropdown && (
//                           <Dropdown
//                             align="center"
//                             className="mt-0 ms-2"
//                             show={showDropdown}
//                             onClose={() => setShowDropdown(false)}
//                           >
//                             <Dropdown.Menu className="mt-2 txt-center">
//                               <Button
//                                 onClick={edithandleShow}
//                                 className="dropdown-item"
//                               >
//                                 Edit
//                               </Button>
//                               <Button
//                                 onClick={() => deletehandleShow(post.id)}
//                                 className="dropdown-item "
//                               >
//                                 Delete
//                               </Button>
//                             </Dropdown.Menu>
//                           </Dropdown>
//                         )}
//                       </div>
//                     </div>
//                               </div>
//                               <div>
//                               <Link to={`/post/${post.id}`}>
//                                 <img src={post.image} alt="Post" className='img-fluid rounded mb-3 ps-1 w-100'/>
//                                 </Link>
//                                 <h5 className='card-title text-light mt-3'>{post.title}</h5>
//                                 <p className='card-text text-light'>{post.text}</p>
//                               </div>
//                               <div className='row mt-5'>
//                                 <div className='pb-3 col-4 text-start'><i className="bi bi-heart text-light pe-1"></i>  {post.likes}  Likes</div>
//                                 <div className='pb-3 col-4 text-center'><i className="bi bi-chat-dots-fill pe-1"></i>  {post.likes}  Comments</div>
//                                 <div className='pb-3 col-4 text-end pe-4' ><i className="bi bi-share pe-1"></i>  {post.likes}  Share</div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 }
//               })}
//               {loading && <div className="d-flex justify-content-center">
//                 <div className="spinner-grow text-secondary text-center" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </div>
//               </div>}
//             </div>
//           </div>
//           <div className="col-3 p-0 m-0 ">
//             <Rightbar />
//           </div>
//         </div>
//       </div >
//       <Modal show={deleteShow} onHide={deletehandleClose}>
//         <Modal.Body>Are You Want to Delete  this Post?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={deletehandleClose}>
//             Close
//           </Button>
//           <Button variant="danger" onClick={(e) => deletePost(e, post)}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       <Modal show={editShow} onHide={edithandleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Post</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Control as="textarea" rows={3} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={edithandleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={edithandleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   )
// }

// export default Posts
