import React, { useRef } from "react";
import { Form, Col, Row, Container, Button } from "react-bootstrap";

const Login = () => {
  const emailInputRef = useRef();
  const pwdInputRef = useRef();
  const confirmedPwdInputRef = useRef();

  const onSubmitHandler = async () => {
    // e.preventDefault();
    const email = emailInputRef.current.value;
    const pwd = pwdInputRef.current.value;
    const confirmPwd = confirmedPwdInputRef.current.value;

    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBhWgo-onnehVfjggey6b2N9Rel6F0txZc";
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
      } else {
        let errorMsg = "Authentication Fail!!";
        throw new Error(errorMsg);
      }
    } catch (error) {
      alert(error);
    }
    emailInputRef.current.value = "";
    pwdInputRef.current.value = "";
    confirmedPwdInputRef.current.value = "";
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col lg="4"></Col>
        <Col lg="6">
          <Form>
            <h4 style={{ textAlign: "center" }}>Sign Up</h4>
            <hr />
            <Form.Group as={Row} className="mb-3" controlId="userEmail">
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="email@example.com"
                  ref={emailInputRef}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="userPassword">
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={pwdInputRef}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="confirmedPassword"
              ref={confirmedPwdInputRef}
            >
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Confirmed Password"
                />
              </Col>
            </Form.Group>
          </Form>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={onSubmitHandler}>
              Sign Up
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
