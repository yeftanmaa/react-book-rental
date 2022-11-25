import React, { useState } from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken"
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

function Login() {

  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (email, password) => {
    
    //reqres registered sample user
    const loginPayload = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    }

    axios.post("https://reqres.in/api/login", loginPayload)
      .then(response => {
        //get token from response
        const token = response.data.token;

        //set JWT token to local
        localStorage.setItem("token", token);

        //set token to axios common header
        setAuthToken(token);

        //redirect user to home page
        if (emailInput !== loginPayload.email || passInput !== loginPayload.password) {
          setShowAlert(true);

          setTimeout(() => {
            setShowAlert(false);
          }, 3000);

        } else {
          window.location.href = '/home'
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div className="global-wrapper-login">

        <div className="container-login">
            <h2 style={{marginTop: '5px', marginBottom: '2px', textAlign:'center', fontSize:'30px'}}>Welcome back!</h2>
            <p style={{ marginBottom: '15px', textAlign:'center', fontSize:'14px', opacity:0.4}}>Please provide your identity.</p>
            <Form
              onSubmit={(event) => {
                event.preventDefault()
                const [email, password] = event.target.children;
                handleSubmit(email, password);
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" style={{opacity: 0.5}}  placeholder="Enter your email address" id="email" name="email" onChange={(e) => setEmailInput(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" style={{opacity: 0.5}} placeholder="Enter your password" id="password" name="password" onChange={(e) => setPassInput(e.target.value)} />
              </Form.Group>

              <Button className="btn-login" type="submit" variant="primary">Login</Button>
            </Form>

            <Alert show={showAlert} key="danger" variant="danger">Invalid username or password!</Alert>
        </div>
      </div>
    </div>

    
  );
}
export default Login