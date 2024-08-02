import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const navigate = useNavigate();
  

  const [loginData, setLoginData] = useState({
    user_email: "",
    user_password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginData.user_email === " " || loginData.user_password === " ") {
      alert("please fill all data");
    }
    const data = new FormData();
    data.append("Emaildata", loginData.user_email);
    data.append("Passworddata", loginData.user_password);
    await axios
      .post("http://127.0.0.1:5000/loginUserData", data)
      .then((res) => {
        console.log("res", res.data);

        if (res.data.user_email == loginData.user_email) {
          
          alert("login sucessfully");
          localStorage.setItem("user_name", res.data.user_name);
          localStorage.setItem("user_Id", res.data.user_Id);
          localStorage.setItem("user_email", res.data.user_email);
          navigate("/view");
        } else {
          alert("Invalid email or password");
        }
      });
  };
  const handlePrevious = () => navigate("/register");
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) =>
              setLoginData({ ...loginData, user_email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="current-password"
            placeholder=" Enter Password"
            onChange={(e) =>
              setLoginData({ ...loginData, user_password: e.target.value })
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      <p> yours not Registered?</p>
      <Button variant="primary" type="button" onClick={handlePrevious}>
        Register
      </Button>
    </div>
  );
};

export default Login;
