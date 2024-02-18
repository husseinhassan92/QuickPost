import React from "react";
import "./welcom.css";
import { Link } from 'react-router-dom';
import facebook from '../../images/facebook.png'
import google from '../../images/google.png'
import twitte from '../../images/twitter.png'
import { Button } from "react-bootstrap";
const Welcom = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <iframe
          className="border border-0   col-lg-6 col-sm-12 mt-4 "
          src="https://lottie.host/embed/1e1231cc-ba34-4106-99f5-62586c0c0329/j8RyB1tDly.json"
        ></iframe>

        <div className=" col-lg-6 col-md-12 col-sm-12  mt-5 pt-5 ps-5 text-lg-start text-md-center  ">
          <h1 className="col-md-12 col-sm-12 ">HELLO, FRIENDS.</h1>
          <h5 className=" col-lg-5 col-md-12 w-md-50 w-sm-100 mb-4 mt-2 ">We are happy to have you with us and wish you happy times in our Smart System.</h5>
          <h6>Don't have an account ?</h6>

          <Link to="/Sginup"> 
          <Button variant="outline-dark" className="btn btn-outline-dark ps-5 pe-5  mb-5 mt-2">Sgin Up</Button>
          </Link>
          <h6>Already have an Account? </h6>

          <Link className='nav-link' to="/Login" >
          <Button  variant="outline-dark" className="ps-5 pe-5 mb-5 mt-3 d-lg-block ">Login</Button>
          </Link>
            <a className="me-4"  href="#"><img  className="icon" src={facebook} alt="" /></a>
            <a className="me-4"   href="#"><img className="icon" src={google} alt="" /></a>
            <a   href="#"><img className="icon" src={twitte} alt="" /></a>
        </div>
      </div>
    </div>
  );
};

export default Welcom;
