import React, { useContext, useRef } from "react";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const LoginForm = () => {
  const emailInputRef = useRef();
  const pwdInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const pwd = pwdInputRef.current.value;

    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBhWgo-onnehVfjggey6b2N9Rel6F0txZc";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: pwd,
          returnSecureToken: true,
        }),
        header: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        authCtx.login(data.idToken);
      } else {
        let errorMsg = "Authentication Fail!!";
        throw new Error(errorMsg);
      }
    } catch (error) {
      alert(error);
    }
    emailInputRef.current.value = "";
    pwdInputRef.current.value = "";
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={4} className="mx-auto">
          <div style={{ background: "white" }}>
            <div className="card border-primary">
              <div className="card-body">
                <h4 className="card-title text-center">Sign In</h4>
                <hr />
                <Form onSubmit={onSubmitHandler}>
                  <Form.Group className="mb-3" controlId="userEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="email@example.com"
                      ref={emailInputRef}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="userPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      ref={pwdInputRef}
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Sign In
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center my-2">
        <Col md={4} className="mx-auto">
          <div className="card-body">
            <div className="d-grid gap-2">
              <Button
                type="submit"
                style={{ background: "#24A6AB", border: "#24A6AB" }}
              >
                <NavLink
                  to="/signup"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Don't have an Account? Sign Up
                </NavLink>
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
