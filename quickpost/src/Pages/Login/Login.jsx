import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./login.css";
import { Link, Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from 'react-redux';
// import facebook from "../../images/facebook.png";
// import google from "../../images/google.png";
// import twitte from "../../images/twitter.png";
import loginimg from "../../images/loginimg.png";
import { login_user } from "../../Store/Actions/AuthAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({login_user, isAuthenticated, user, msg}) {
  const Emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const Passregex = /^.{8,}$/;
  const [loginError, setLoginError] = useState("");
  //console.log(user)
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({ email: "", password: "" });
  const { email, password } = data;
  const [error, setError] = useState({
    emailError: "",
    passError: "",
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const cahangeData = (e) => {
    if (e.target.name === "email") {
      setData({
        ...data,
        email: e.target.value,
      });

      setError({
        ...error,
        emailError:
          e.target.value.lenght === 0
            ? "This field is required"
            : !Emailregex.test(e.target.value) && "Invalid email format",
      });
    } else {
      setData({
        ...data,
        password: e.target.value,
      });

      setError({
        ...error,
        passError:
          e.target.value.lenght === 0
            ? "This field is required"
            : !Passregex.test(e.target.value) && "Invalid password format",
      });
    }
  };


  const sumbitdata = (e) => {
    e.preventDefault();
    
    if (!error.emailError && !error.passError) {
      if (!isAuthenticated) {
        //setLoginError("Invalid email or password.");
      }
      
      login_user(email, password);
      if (msg === "Login Failed") {
        toast.error('Invalid email or Password');
      }
      setData({
        email: '',
        password: '',
      })
    } else {
      // Email or password is invalid, show message
      setLoginError("Invalid email or password.");

    }
  };

  

  if (isAuthenticated) {
    toast.success('Login Successfully');
    return <Redirect to='/createprofile' />
  }


  return (
    <>
    <ToastContainer />
      <div className="container">
        <div className="row ">
          <div className=" d-flex justify-content-center align-items-center gap-4">
            <div className="col-md-6 d-md-block d-none">
              <img 
                className=" img w-100" 
                src={loginimg}
                alt=""
              />
            </div>

            <div className=" col-md-6 col-12 text-center">
              <Form
                onSubmit={(e) => sumbitdata(e)}
                className=" form form-shadow border border-1 mx-auto py-5"
              >
                <h2 className="mb-4 mt-5 main-title">LOGIN</h2>
                {loginError && <Alert variant="danger">{loginError}</Alert>}
                <Form.Group
                  className="mb-3 col-8 mx-auto  "
                  controlId="formGroupEmail"
                >
                  <Form.Control
                    value={data.email}
                    name="email"
                    type="email"
                    className="form_input"
                    placeholder="Enter Your Email"
                    onChange={(e) => cahangeData(e)}
                  />
                  <p className="text-danger pt-2"> {error.emailError} </p>
                </Form.Group>
                <Form.Group
                  className="mb-3  col-8 mx-auto"
                  controlId="formGroupPassword"
                >
                  <Form.Control
                    value={data.password}
                    name="password"
                    className="form_input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => cahangeData(e)}
                  />

                  <p className="text-danger pt-2"> {error.passError} </p>
                </Form.Group>
                <Button
                  disabled={error.emailError || (error.passError && "disabled")}
                  className="w-50 btn-2 "
              
                  onClick={(e) => sumbitdata(e)}
                >
                  Login
                </Button>{" "}
                <p className="mt-3 mb-4">
                  You haven't an account?<Link className="main-color" to="/Sginup"> Sign Up</Link>
                </p>
                <p className="mt-3 mb-4">
                  You haven't an account?<Link className="main-color" to="/reset-password"> Forget Password</Link>
                </p>
                {/* <a className="me-4" href="#">
                  <img className="icon" src={facebook} alt="" />
                </a>
                <a className="me-4" href="#">
                  <img className="icon" src={google} alt="" />
                </a>
                <a href="#">
                  <img className="icon" src={twitte} alt="" />
                </a> */}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = state => ({
  isAuthenticated: state.AuthRecducer.isAuthenticated,
  user: state.AuthRecducer.user,
  msg: state.AuthRecducer.msg,
});


export default connect(mapStateToProps, { login_user })(Login);
