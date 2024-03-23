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

function HeaderPost({imgprofile,fullname,lastname,postdate,postid}) {


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
    })
    .catch(error => {
      console.error('Error sharing post:', error);
      // Handle error, if needed
    });
}
    return (
        <>

            <div className="d-flex align-items-center mb-3">
                <img
                    src={imgprofile}
                    alt="Owner"
                    className="rounded-circle me-2 mb-2"
                    style={{ width: "50px", height: "50px" }}

                />
                <div className="align-self-center mb-2">
                    {fullname} {lastname}
                </div>
                <div className="ms-auto text-light">
                    {new Date(postdate).toLocaleString()}

                    <i
                        className="bi bi-three-dots-vertical text-light "
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
                                    onClick={() => deletepost(postid)}
                                    className="dropdown-item "
                                >
                                    Report
                                </Button>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}

                </div>
            </div>
        </>
    )
}

export default HeaderPost
