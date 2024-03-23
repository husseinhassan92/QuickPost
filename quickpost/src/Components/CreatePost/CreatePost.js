import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
// import { createPost } from '../../Store/Reducers/postSlice';
// import postReducer from './postSlice';
const CreatePost = () => {
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState(null);
  const [uploadShow, setUploadShow] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthRecducer.user);

  const handleContentChange = (e) => {
    setPostText(e.target.value);
  };

  const handleCreatePost = () => {
    const postData = {
      content: postText,
      image: image,
      p_author: user.id,
      profile: 2,
    };
    dispatch(createPost(postData)); // Dispatch createPost action with postData
    setPostText(""); // Clear postText after submitting
    setUploadShow(false); // Close modal after submitting
  };

  const onUploadFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      {/* Your JSX for Create Post Component */}
      <Modal show={uploadShow} onHide={() => setUploadShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={onUploadFileChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setUploadShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreatePost}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreatePost;
