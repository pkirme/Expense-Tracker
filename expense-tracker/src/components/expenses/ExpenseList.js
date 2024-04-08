import React, { Fragment } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const ExpenseList = (props) => {
  return (
    <Container>
      {props.data.map((item) => {
        return (
          <Fragment key={item.id}>
            <Row className="my-4">
              <Col>{item.category}</Col>
              <Col>{item.description}</Col>
              <Col>{item.money}</Col>
              <Col>
                <Button variant="danger">Remove</Button>
              </Col>
            </Row>
            <hr />
          </Fragment>
        );
      })}
    </Container>
  );
};

export default ExpenseList;
