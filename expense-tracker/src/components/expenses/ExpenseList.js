import React, { Fragment } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";

import { useSelector } from "react-redux";

const ExpenseList = (props) => {
  const expenses = useSelector((state) => state.expense.expenses);
  // console.log(expenses);
  return (
    <Container>
      {expenses.map((item) => {
        return (
          <Fragment key={item.id}>
            <Row className="my-4">
              <Col>{item.category}</Col>
              <Col>{item.description}</Col>
              <Col>{item.money}</Col>
              <Col>
                <Button variant="success" onClick={() => props.onEdit(item)}>
                  Edit
                </Button>
              </Col>
              <Col>
                <Button
                  variant="danger"
                  onClick={() => props.onDelete(item.id)}
                >
                  Remove
                </Button>
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
