import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";

const Register = () => {
    const [registerData, setRegisterData] = useState({});
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!registerData.user_name || !registerData.user_email || !registerData.user_password ) {
            alert("Please fill in all the fields");
            return;
        }
        const formData = new FormData();
        formData.append('user_name', registerData.user_name);
        formData.append('user_email', registerData.user_email);
        formData.append('user_password', registerData.user_password);
        try {
            const response = await axios.post("http://127.0.0.1:5000/registeruser", formData);
            console.log(response, "res");
            if (response.status === 200) {
              navigate("/")
              alert("Register sucessfully")
            }
        } catch (error) {
            console.error("There was an error registering the user!", error);
        }
    }

    return (
        <>
            <h1>Welcome to the Register</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter the Name" onChange={(e) =>
                        setRegisterData({ ...registerData, user_name: e.target.value })
                    } />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) =>
                        setRegisterData({ ...registerData, user_email: e.target.value })
                    } />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" onChange={(e) =>
                        setRegisterData({ ...registerData, user_password: e.target.value })
                    } />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default Register;
