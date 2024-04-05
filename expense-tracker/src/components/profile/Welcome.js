import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Welcome = () => {
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
    </Container>
  );
};

export default Welcome;
