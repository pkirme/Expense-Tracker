import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const ExpenseList = (props) => {
  return (
    <>
      {props.data.map((item) => {
        return (
          <Row className="my-4">
            <Col>{item.category}</Col>
            <Col>{item.description}</Col>
            <Col>{item.money}</Col>
            <Col>
              <Button variant="danger">Remove</Button>
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default ExpenseList;