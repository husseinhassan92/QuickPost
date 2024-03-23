import React from 'react'
import {  useState } from "react";
import axios, { Axios } from "axios";


function Comment({postid,profileid}) {
    const [newComment, setNewComment] = useState("");
    const [postComments, setPostComments] = useState([]);


    // console.log(Post);
    const handleAddComment = (postId, ownerId) => {
      axios
        .post(
          "http://127.0.0.1:8000/api/comments/all/",
          {
            c_author: ownerId,
            post: postId,
            content: newComment,
            profile: 1
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
  return (
<>
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
                          handleAddComment(postid, profileid)
                        }
                      >
                        Add Comment
                      </button>
                    </div>
                  </div>

</>
  )
}

export default Comment
