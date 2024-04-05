import React, { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Welcome = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const onClickHandler = async () => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBhWgo-onnehVfjggey6b2N9Rel6F0txZc";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
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
        let errorMsg = "Varification Fail!!";
        throw new Error(errorMsg);
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2>Welcome To Expense-Tracker!!</h2>
        </Col>
        <Col>
          <div className="d-grid gap-2">
            <Button variant="secondary">
              <span> Your Profile is Incomplete.</span>
              <span>
                <NavLink to="/profile" style={{ color: "white" }}>
                  Complete Now
                </NavLink>
              </span>
            </Button>
          </div>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <div className="d-grid gap-2">
            <Button variant="secondary" onClick={onClickHandler}>
              Verify Email Id.
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
