import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const CreatePost = () => {
  const [post, setPost] = useState("");
  const [postCount, setPostCount] = useState(0);
  const [disablePostButton, setDisablePostButton] = useState(true);

   const handleContentChange = (e) => {
    setPost(e.target.value);
    setPostCount(e.target.value.length);
    if (postCount === 0 || postCount > 300) {
      setDisablePostButton(true);
    } else {
      setDisablePostButton(false);
    }
  }
console.log()
//   async function createPost(post) {
//     try {
//       const response = await axios({
//         method: "post",
//         url: "https://dummyapi.io/data/v1/post/create",
//         headers: {
//           "app-id": "65d08a4661de33117cf6503f",
//         },
//         Body: JSON.stringify({
//             text: post,
//             image:"https://img.dummyapi.io/photo-1546975554-31053113e977.jpg",
//             likes:0,
//             owner: "60d0fe4f5311236168a10a19",
//             tags: [],
//         }),
//       });
//       console.log("hello")
//       console.log(response.data);
//       if (response.data !== null && response.data.status === "success") {
//         setPost("");
//         setPostCount(0);
//         setDisablePostButton(true);
//       }
//     } catch (error) {
//       console.log("Post failed. Please try again later!");
//     }
//   }

//   async function handleCreatePost(e) {
//     e.preventDefault();
//     createPost(post);
//   }
  const handleCreatePost = (event) =>{
    event.preventDefault();
    const Body ={
        text: post,
            image:"https://img.dummyapi.io/photo-1546975554-31053113e977.jpg",
            likes:0,
            owner: "60d0fe4f5311236168a10a19",
            tags: [],
        }
        axios.post("https://dummyapi.io/data/v1/post/create", Body,{
            headers: {
                "app-id": "65d08a4661de33117cf6503f"}
        })
        .then((response)=>{
            setPost("");
            setPostCount(0);
            setDisablePostButton(true)
            console.log(response)
        })
        .catch((err)=>console.log(err))

    }



  return (
    <div>
      <div>
        {/* <h1>PostCompose component</h1> */}
        <div className="border rounded-3 border-success p-3 shadow mt-2 bg-dark ms-2 me-2">
          <Form className="d-flex flex-column">
            <Form.Group className="mb-3">
              <Form.Label>
                <div className="d-flex align-items-center mb-1">
                  <div className="mx-3"></div>
                </div>
              </Form.Label>
              <Form.Control
                as="textarea"
                row={4}
                value={post}
                onChange={handleContentChange}
                placeholder="What is happening?"
                style={{ resize: "none", height: "7rem" }}
              />
            </Form.Group>
            <div className="d-flex justify-content-end align-items-center">
              <span className="text-light">Characters: {postCount}/300</span>
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
  );
};

export default CreatePost;
