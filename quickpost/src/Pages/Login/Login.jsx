import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./login.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import facebook from "../../images/facebook.png";
import google from "../../images/google.png";
import twitte from "../../images/twitter.png";
import login from "../../images/login.png";
function Login() {
  const Emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const Passregex = /^.{8,}$/;

  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({ email: "", password: "" });
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
          e.target.value.lenght == 0
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
          e.target.value.lenght == 0
            ? "This field is required"
            : !Passregex.test(e.target.value) && "Invalid password format",
      });
    }
  };

  const sumbitdata = (e) => {
    if (!error.emailError || !error.passError) {
      e.preventDefault();      
    }
  };

  const storage = () => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedEmail === data.email && storedPassword === data.password) {
      // Redirect the user to the welcome page or perform any other action
      window.location.href = '/'; // Replace '/welcome' with your actual welcome page URL
    } else {
      alert("Your Email or Password are not valid");
    }
  }

  return (
    <>
      <div className="container-fluid   ">
        <div className="row">
          <img
            className="col col-lg-6  me-5 ms-5 ps-5 pt-5 img"
            src={login}
            alt=""
          />

          <Form
            onSubmit={(e) => sumbitdata(e)}
            className="col col-lg-4   border border-1 pt-4 mt-5 ms-5 text-center  form "
          >
            <h3 className="mb-4 mt-5">LOGIN</h3>
            <Form.Group
              className="mb-3 col-8 mx-auto  "
              controlId="formGroupEmail"
            >
              <Form.Control
                value={data.email}
                name="email"
                type="email"
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
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => cahangeData(e)}
              />

              <p className="text-danger pt-2"> {error.passError} </p>
            </Form.Group>
            <Button
              disabled={error.emailError || (error.passError && "disabled")}
              className="w-50   but "
              variant="outline-dark "
              onClick={storage}
            >
              Login
            </Button>{" "}
            <p className="mt-3 mb-4">
              You haven't an account?<Link> Sign Up</Link>
            </p>
            <a className="me-4" href="#">
              <img className="icon" src={facebook} alt="" />
            </a>
            <a className="me-4" href="#">
              <img className="icon" src={google} alt="" />
            </a>
            <a href="#">
              <img className="icon" src={twitte} alt="" />
            </a>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
