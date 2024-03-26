import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from 'react-redux';
// import facebook from "../../images/facebook.png";
// import google from "../../images/google.png";
import signUp from "../../images/signUp.png";
// import twitte from "../../images/twitter.png";
import './sginup.css'
import { signup_user } from '../../Store/Actions/AuthAction';


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Sginup = ({ signup_user, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);

  //const nameRegex = /^[a-zA-Z]+$/;
  const Emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const userNameREGEX = /^\S+$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const { userName, email, password, rePassword } = data;

  const [error, setError] = useState({
    emailError: "",
    usernameError: "",
    passError: "",
    rePassError: "",
  });

  const changeData = (e) => {
    if (e.target.name === "email") {
      setData({ ...data, email: e.target.value });
      setError({
        ...error,
        emailError:
          e.target.value === 0
            ? "Requierd"
            : !Emailregex.test(e.target.value) && "xxxx@xxxx.com",
      });
    }

    if (e.target.name === "userName") {
      setData({ ...data, userName: e.target.value });
      setError({
        ...error,
        usernameError:
          e.target.value === 0
            ? "Requierd"
            : !userNameREGEX.test(e.target.value) && "NO Spaces",
      });
    }
    if (e.target.name === "password") {
      setData({ ...data, password: e.target.value });
      setError({
        ...error,
        passError:
          e.target.value === 0
            ? "Requierd"
            : !passRegex.test(e.target.value) && "EX : P@ssword1234",
      });
    }
    if (e.target.name === "rePassword") {
      setData({ ...data, rePassword: e.target.value });
      setError({
        ...error,
        rePassError:
          e.target.value === 0
            ? "Requierd"
            : e.target.value !== data.password
              ? "Not Match Password"
              : "",
      });
    }
  };

const sumbitdata = e => {
  e.preventDefault();
  if (password === rePassword) {
    signup_user(userName, email, password, rePassword);
    setAccountCreated(true);
    
    
    toast.success('Sign Up Successfully, Check Mail');
    setData({
      userName: '',
      email: '',
      password: '',
      rePassword: '',

      
    });
  }
};

  if (isAuthenticated) {
    return <Redirect to='/' />
  }
 
 


  return (
    <>


    <Container >
      <Row className="  mt-5  p-3 text-white">
        <Col lg={6} >
          <div className=" d-none d-lg-block pe-lg-5 pt-5">
            <img
              className="img w-100"
              src={signUp}
              alt=""
            />
          </div>

        </Col>
        <Col lg={6}  >
          <Form  onSubmit={e => sumbitdata(e)} className="  ms-md-3  p-5 border border-1  text-center shadow">
            <h4 className=" pb-4">SGIN UP</h4>

            <Form.Group className="col col-10 mx-auto" controlId="userName">

              <Form.Control
                type="text"
                name="userName"
                placeholder="Username"
                value={data.userName}
                onChange={(e) => {
                  changeData(e);
                }}
              />
              <p className="text-danger pt-3">{error.usernameError}</p>
            </Form.Group>
            <Form.Group className="col col-10 mx-auto" controlId="email">

              <Form.Control

                type="email"
                placeholder="Email address"
                name="email"
                value={data.email}
                onChange={(e) => changeData(e)}
              />
              <p className="text-danger pt-3">{error.emailError}</p>
            </Form.Group>

            <ToastContainer />


            <Form.Group className="col col-10 mx-auto" controlId="password">

              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => changeData(e)}
              />
              <p className="text-danger pt-3">{error.passError}</p>
            </Form.Group>

            <Form.Group className="col col-10 mx-auto" controlId="rePassword">

              <Form.Control
                type="password"
                placeholder="Re-password"
                name="rePassword"
                value={data.rePassword}
                onChange={(e) => changeData(e)}
              />

              <p className="text-danger pt-3">{error.rePassError}</p>
            </Form.Group>


            <Button
              variant="outline-primary "
              type="submit"
              className=" w-75 "
              onClick={(e) => sumbitdata(e)}
            >
              Register
            </Button>
            <p className="mt-3 mb-4">You have an account?<Link to="/Login"> Login</Link></p>
            {/* <a className="me-4" href="#"><img className="icon" src={facebook} alt="" /></a>
            <a className="me-4" href="#"><img className="icon" src={google} alt="" /></a>
            <a href="#"><img className="icon" src={twitte} alt="" /></a> */}
          </Form>
        </Col>
      </Row>
    </Container>
  </>


  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.AuthRecducer.isAuthenticated
});

export default connect(mapStateToProps, { signup_user })(Sginup);
