import React, { useRef, useState , useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import facebook from "../../images/facebook.png";
import google from "../../images/google.png";
import signUp from "../../images/signUp.png";
import twitte from "../../images/twitter.png";
import './sginup.css'

const Sginup = () => {
  const nameRegex = /^[a-zA-Z]+$/;
  const Emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const userNameREGEX = /^\S+$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  const [data, setData] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
    rePassword: "",
  });

  const [error, setError] = useState({
    nameError: "",
    emailError: "",
    usernameError: "",
    passError: "",
    rePassError: "",
  });

  const changeData = (e) => {
    if (e.target.name == "Name") {
      setData({ ...data, name: e.target.value });
      setError({
        ...error,
        nameError:
          e.target.value == 0
            ? "Requierd"
            : !nameRegex.test(e.target.value) && "Only Letters",
      });
    }

    if (e.target.name == "email") {
      setData({ ...data, email: e.target.value });
      setError({
        ...error,
        emailError:
          e.target.value == 0
            ? "Requierd"
            : !Emailregex.test(e.target.value) && "xxxx@xxxx.com",
      });
    }

    if (e.target.name == "userName") {
      setData({ ...data, userName: e.target.value });
      setError({
        ...error,
        usernameError:
          e.target.value == 0
            ? "Requierd"
            : !userNameREGEX.test(e.target.value) && "NO Spaces",
      });
    }
    if (e.target.name == "password") {
      setData({ ...data, password: e.target.value });
      setError({
        ...error,
        passError:
          e.target.value == 0
            ? "Requierd"
            : !passRegex.test(e.target.value) && "EX : P@ssword1234",
      });
    }
    if (e.target.name == "rePassword") {
      setData({ ...data, rePassword: e.target.value });
      setError({
        ...error,
        rePassError:
          e.target.value == 0
            ? "Requierd"
            : e.target.value != data.password
            ? "Not Match Password"
            : "",
      });
    }
  };

  const sumbitdata = (e) => {
    if (!error.emailError || !error.passError) {
      e.preventDefault();
    }
  };

  const name = useRef();
  const email = useRef();
  const user_name = useRef();
  const password = useRef();
  const [showHome , setshowHome] = useState(false)
  const localSginup = localStorage.getItem("sginup")
 
  useEffect(() => {
    if (localSginup) {
      setshowHome(true)
    }
  }, [])


const  registry=()=>{
  console.log(name , email , password , user_name);
  if (name.current.value && email.current.value && password.current.value && user_name.current.value ) {
    localStorage.setItem('name' , name.current.value);
    localStorage.setItem('email' , email.current.value);
    localStorage.setItem('password' , password.current.value);
    localStorage.setItem('user Name' , user_name.current.value);
    localStorage.setItem('sginup' , email.current.value);
    window.location.reload()

  }
}

  return (
    <>
   
      
      <Container >
        <Row className="  mt-5  p-3 ">
            <Col lg={7}  md={6}>
            <img
            className="col col-4 me-5 pe-lg-5 w-md-25 pt-5 img "
            src={signUp}
            alt=""
          />

            </Col>
          <Col lg={5}  >
            <Form onSubmit={(e) => sumbitdata(e)} className="bg-body   ms-md-3  p-5 border border-1  text-center shadow">
              <h4 className=" pb-4">SGIN UP</h4>
              <Form.Group className="col col-10 mx-auto" controlId="Name">
     
                <Form.Control
                  type="text"
                  name="Name"
                  value={data.name}
                  onChange={(e) => changeData(e)}
                  placeholder="Enter Your Full Name"
                  ref={name}
                  />
                <p className="text-danger pt-3">{error.nameError}</p>
              </Form.Group>

              <Form.Group className="col col-10 mx-auto" controlId="email">
                
                <Form.Control
                
                  type="text"
                  placeholder="Email address"
                  name="email"
                  value={data.email}
                  onChange={(e) => changeData(e)}
                  ref={email}
                  />
                <p className="text-danger pt-3">{error.emailError}</p>
              </Form.Group>

              <Form.Group className="col col-10 mx-auto" controlId="userName">
         
                <Form.Control
                  type="text"
                  name="userName"
                  placeholder="Username"
                  ref={user_name}
                  value={data.userName}
                  onChange={(e) => {
                    changeData(e);
                  }}
                  />
                <p className="text-danger pt-3">{error.usernameError}</p>
              </Form.Group>

              <Form.Group className="col col-10 mx-auto" controlId="password">
     
                <Form.Control
                  type="text"
                  name="password"
                  placeholder="Password"
                  ref={password}
                  value={data.password}
                  onChange={(e) => changeData(e)}
                  />
                <p className="text-danger pt-3">{error.passError}</p>
              </Form.Group>

              <Form.Group className="col col-10 mx-auto" controlId="rePassword">
             
                <Form.Control
                  type="text"
                  placeholder="Re-password"
                  name="rePassword"
                  value={data.rePassword}
                  onChange={(e) => changeData(e)}
                  />

                <p className="text-danger pt-3">{error.rePassError}</p>
              </Form.Group>
              

              <Button
                variant="outline-dark "
                type="submit"
                className=" w-75 "
                onClick={registry}
                >
                Register
              </Button>
              <p className="mt-3 mb-4">You have an account?<Link> Login</Link></p>
              <a className="me-4"  href="#"><img  className="icon" src={facebook} alt="" /></a>
            <a className="me-4"   href="#"><img className="icon" src={google} alt="" /></a>
            <a   href="#"><img className="icon" src={twitte} alt="" /></a>
            </Form>
          </Col>
        </Row>
      </Container>
      </>
    
 
  );
};

export default Sginup;
