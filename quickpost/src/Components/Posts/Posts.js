// import React, { useCallback, useEffect, useRef, useState } from "react";
// import axios from "axios";
// import InifinteScroll from "./InifinteScroll";
// import Leftbar from "../LeftSide/LeftSide";
// import Rightbar from "../RightSide/RightSide";
// import CreatePost from "../CreatePost/CreatePost";
// import { Link , Redirect} from "react-router-dom";
// import { connect } from 'react-redux';
// //import { useSelector } from 'react-redux';

// const Posts = ({isAuthenticated, user}) => {
//   const [data, setData] = useState([])
//   //const [loading, setLoading] = useState(true)
//   //const [hasMore, setHasMore] = useState(false)


//   useEffect(() => {
//     //setLoading(true)
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `JWT ${localStorage.getItem("access")}`,
//         Accept: "application/json",
//       },
//     };
//     axios.get(`http://localhost:8000/api/post/all/`, config)
//       .then(response => {
//         console.log(response.data.posts);
//         setData(response.data.posts)
//         //setHasMore(response.data.posts.length > 0)
//         //setLoading(false)
//         //console.log(response.data.posts)
//       })
//       .catch(err => console.log('Error:', err))
//   }, [])
//   //const [pageNumber, setPageNumber] = useState(1);
//   //const {  data: posts} = InifinteScroll();
//   //const observer = useRef();
//   const [postComments, setPostComments] = useState([]);
//   // let user = useSelector(state => state.AuthReducer.user)
//   // console.log(user);
//   if (user){console.log(user.id)}
//   // const lastPostElementRef = useCallback(
//   //   (node) => {
//   //     //if (loading) return;
//   //     if (observer.current) observer.current.disconnect();
//   //     observer.current = new IntersectionObserver((entries) => {
//   //       if (entries[0].isIntersecting && hasMore) {
//   //         setPageNumber((prevPageNumber) => prevPageNumber + 1);
//   //       }
//   //     });
//   //     if (node) observer.current.observe(node);
//   //   },
//   //   [loading, hasMore]
//   // );

//   const [newComment, setNewComment] = useState("");

//   const handleAddComment = (postId, ownerId) => {
//     axios
//       .post(
//         "https://dummyapi.io/data/v1/comment/create",
//         {
//           owner: ownerId,
//           post: postId,
//           message: newComment,
//         },
//         {
//           headers: {
//             "app-id": "65d08f07b536e68ad8626e8c",
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then((response) => {
//         console.log("Comment added:", response.data);
//         setNewComment("");
//         // Fetch comments for the specific post
//         axios
//           .get(`https://dummyapi.io/data/v1/post/${postId}/comment`)
//           .then((response) => {
//             console.log("Comments for post:", response.data);
//             // Update postComments state with the new comment included
//             setPostComments((prevComments) => [...prevComments, response.data]);
//           })
//           .catch((err) => console.log("Error fetching comments:", err));
//       })
//       .catch((err) => {
//         console.log("Error adding comment:", err.response.data);
//       });
//   };

//   const handleDeleteComment = (postId, commentId) => {
//     axios
//       .delete(`https://dummyapi.io/data/v1/comment/${commentId}`, {
//         headers: {
//           "app-id": "65d08f07b536e68ad8626e8c",
//         },
//       })
//       .then((response) => {
//         console.log("Comment deleted:", response.data);
//         // Fetch updated comments for the specific post
//         axios
//           .get(`https://dummyapi.io/data/v1/post/${postId}/comment`, {
//             headers: {
//               "app-id": "65d08f07b536e68ad8626e8c",
//             },
//           })
//           .then((response) => {
//             console.log("Comments for post:", response.data);
//             setPostComments(response.data.data);
//           })
//           .catch((err) => console.log("Error fetching comments:", err));
//       })
//       .catch((err) => {
//         console.log("Error deleting comment:", err.response.data);
//       });
//   };

//   if (!isAuthenticated) {
//     return <Redirect to='/' />
// }

//   return (
//     <div className="container-fluid">
//       <div className="row p-0">
//         <div className="col-3 p-0">
//         <Leftbar isHomePage={true}/>
//         </div>
//         <div className="col-6">
//           <div>
//             <CreatePost />
//             {data.map((post, index) => (
//               <div
//                 key={post.id}
//                 //ref={index === posts.length - 1 ? lastPostElementRef : null}
//               >
//                 <div className="container pt-4">
//                   <div className="row">
//                     <div className="col">
//                       <div className="card text-light bg-dark">
//                         <div className="card-body">
//                           <div className="d-flex align-items-center mb-3">
//                             <div className="align-self-center mb-2">
                              
//                             </div>
//                             <div className="ms-auto text-light">
                              
//                             </div>
//                           </div>
                          
//                             <img
//                               src={post.image}
//                               alt="Post"
//                               className="img-fluid rounded mb-3 ps-1 w-100"
//                             />
                          
//                           <p className="card-text text-light">{post.text}</p>
//                           <div className="row mt-5">
//                             <div className="pb-3 col-4 text-start">
//                               <i className="bi bi-heart text-light pe-1"></i>{" "}
//                                Likes
//                             </div>

//                             <div
//                               className="pb-3 col-4 text-center"
//                               onClick={() => {
//                                 axios
//                                   .get(
//                                     `https://dummyapi.io/data/v1/post/${post.id}/comment?limit=3`,
//                                     {
//                                       headers: {
//                                         "app-id": "65d08f07b536e68ad8626e8c",
//                                         Authorization: "Bearer your-token",
//                                       },
//                                     }
//                                   )
//                                   .then((response) => {
//                                     setPostComments(response.data.data);
//                                   })
//                                   .catch((err) =>
//                                     console.log("Error fetching comments:", err)
//                                   );
//                               }}
//                             >
//                               <i className="bi bi-chat-dots-fill pe-1"></i>{" "}
//                               {
//                                 postComments.filter(
//                                   (comment) => comment.post === post.id
//                                 ).length
//                               }{" "}
//                               Comments
//                             </div>
//                             <div className="pb-3 col-4 text-end pe-4">
//                               <i className="bi bi-share pe-1"></i> {post.likes}{" "}
//                               Share
//                             </div>

//                             {postComments.map((comment) => (
//                               <div
//                                 key={comment.id}
//                                 className="card mb-2 bg-dark  "
//                               >
//                                 <div className="card-body border-bottom border-secondary border-3 ">
//                                   <div className="d-flex align-items-center pb-2">
//                                     <img
//                                       src={comment.owner.picture}
//                                       alt="Comment Owner"
//                                       className="rounded-circle me-2 text-light"
//                                       style={{ width: "30px", height: "30px" }}
//                                     />
//                                     <div className="text-light pt-2">
//                                       {comment.owner.firstName}{" "}
//                                       {comment.owner.lastName}
//                                     </div>
//                                   </div>
//                                   <div className="container">
//                                     <div className="row">
//                                       <p className="card-text text-light col-9">
//                                         {comment.message}
//                                       </p>
//                                       <button
//                                         className="btn btn-danger col-3 h-75"
//                                         onClick={() =>
//                                           handleDeleteComment(
//                                             post.id,
//                                             comment.id
//                                           )
//                                         }
//                                       >
//                                         Delete
//                                       </button>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="card text-light bg-dark">
//                           <div className="card-body">
//                             <h5 className="card-title text-light mt-3">
//                               Add Comment
//                             </h5>
//                             <textarea
//                               className="form-control"
//                               placeholder="Enter your comment"
//                               value={newComment}
//                               onChange={(e) => setNewComment(e.target.value)}
//                             ></textarea>
//                             <button
//                               className="btn btn-primary mt-2"
//                               onClick={() =>
//                                 handleAddComment(post.id, post.owner.id)
//                               }
//                             >
//                               Add Comment
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* {index === posts.length - 1 && loading && (
//                   <div className="d-flex justify-content-center">
//                     <div
//                       className="spinner-grow text-secondary text-center"
//                       role="status"
//                     >
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                   </div>
//                 )} */}
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="col-3 p-0 m-0">
//           <Rightbar />
//         </div>
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = state => ({
//   isAuthenticated: state.AuthRecducer.isAuthenticated,
//   user: state.AuthRecducer.user,
// });

// export default connect(mapStateToProps)(Posts);



// {/* <img
//                               src={post.owner.picture}
//                               alt="Owner"
//                               className="rounded-circle me-2 mb-2"
//                               style={{ width: "50px", height: "50px" }}
//                             /> */}


import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from 'axios'
import InifinteScroll from "./InifinteScroll";
import Leftbar from "../LeftSide/LeftSide";
import Rightbar from "../RightSide/RightSide";
import CreatePost from "../CreatePost/CreatePost";
import { Link , Redirect} from "react-router-dom";
import { connect } from 'react-redux';
import WhatsApp from  '../../images/WhatsApp.jpeg'

const Posts = ({isAuthenticated, user}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, data: posts, hasMore } = InifinteScroll(pageNumber);
  const observer = useRef();
  const [postComments, setPostComments] = useState([]);
  
  let [Post , setPost] = useState([])
  async function getPost() {
      let {data} = await axios.get(`http://127.0.0.1:8000/api/post/all/` , {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        }
      })
      console.log(data.posts);
      setPost(data.posts)
    }
    useEffect(()=>{
      getPost();
    },[]) 
  
   
  
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
          profile:1
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
        // Fetch comments for the specific post
        axios
          .get(`http://127.0.0.1:8000/api/comments/comment/${postId}` )
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

  if (!isAuthenticated) {
    return <Redirect to='/Posts' />
}



  return (
    <div className="container-fluid">
      <div className="row p-0">
        <div className="col-3 p-0">
        <Leftbar isHomePage={true}/>
        </div>
        <div className="col-6">
          <div>
            <CreatePost />
            {Post.map((post, index) => (
             
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
                              src={post.profile.image === null ? WhatsApp : post.profile.image  }
                              alt="Owner"
                              className="rounded-circle me-2 mb-2"
                              style={{ width: "50px", height: "50px" }}
                               
                            />
                            <div className="align-self-center mb-2">
                              {post.profile.first_name} {post.profile.last_name}
                            </div>
                            <div className="ms-auto text-light">
                              {new Date(post.create_at).toLocaleString()}
                            </div>
                          </div>
                          <Link to={`/post/${post.id}`}>
                            <img
                              src={'http://127.0.0.1:8000'+post.image}
                              alt="Post"
                              className="img-fluid rounded mb-3 ps-1 w-100"
                              
                            />
                          </Link>
                          {/* <h5 className="card-title text-light mt-3">
                            {post.title}
                          </h5> */}
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
                              {/* {
                                postComments.filter(
                                  (comment) => comment.post === post.id
                                ).length
                              }{" "} */}
                              {post.comments_count}{' '}
                              Comments
                            </div>



                            <div className="pb-3 col-4 text-end pe-4">
                              <i className="bi bi-share pe-1"></i> {post.share_count}{" "}
                              Share
                            </div>



                            {post.comments.map((comment) => (
                              <div
                                key={Post.id}
                                className="card mb-2 bg-dark  "
                              >
                                <div className="card-body border-bottom border-secondary border-3 ">
                                  <div className="d-flex align-items-center pb-2">
                                    <img
                                      src={post.profile.image === null ? WhatsApp : post.profile.image}
                                      alt="Comment Owner"
                                      className="rounded-circle me-2 text-light"
                                      style={{ width: "30px", height: "30px" }}
                                    />
                                    <div className="text-light pt-2">
                                      {comment.c_author.username}{" "}
                                      {/* {comment.data.profile.last_name} */}
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

const mapStateToProps = state => ({
  isAuthenticated: state.AuthRecducer.isAuthenticated,
  user: state.AuthRecducer.user,
});

export default connect(mapStateToProps)(Posts);