import React from "react";
import "./welcom.css";
import { Link } from 'react-router-dom';
// import facebook from '../../images/facebook.png'
// import google from '../../images/google.png'
// import twitte from '../../images/twitter.png'
import { Button } from "react-bootstrap";
const Welcom = () => {
  return (
    <div className="container mt-4" style={{overflow:"hidden"}}>
      <div className="row">
        <div className="d-flex justify-content-center align-items-center" >
          <iframe
            className="border border-0 d-none d-md-block col-md-6"
            src="https://lottie.host/embed/1e1231cc-ba34-4106-99f5-62586c0c0329/j8RyB1tDly.json"
          ></iframe>

          <div className=" col-lg-6 text-center text-md-start text-white">
            <h1 className="col-md-12 col-sm-12 ">HELLO, FRIENDS.</h1>
            <h5 className=" mb-4 mt-2  ">We are happy to have you with us and wish you happy time in Quick Post.</h5>
            <h6>Don't have an account ?</h6>

            <Link to="/Sginup"> 
            <Button variant="outline-primary" className=" ps-5 pe-5 mb-5 mt-2">Sgin Up</Button>
            </Link>
            <h6>Already have an Account? </h6>

            <Link className='nav-link' to="/Login" >
            <Button  variant="outline-primary" className="ps-5 pe-5 mb-5 mt-3 d-lg-block ">Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcom;
