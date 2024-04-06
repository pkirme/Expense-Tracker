import React, { useRef, useState } from "react";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import ExpenseList from "./ExpenseList";

const ExpenseForm = () => {
  const [expenses, setExpenses] = useState([]);

  const spentMoneyInputRef = useRef();
  const descriptionInputRef = useRef();
  const selectInputRef = useRef("select");

  const onFormSubmit = (e) => {
    e.preventDefault();
    const money = spentMoneyInputRef.current.value;
    const description = descriptionInputRef.current.value;
    const category = selectInputRef.current.value;
    if (!money || !description) {
      alert("One of field is empty!");
      return;
    }
    const expense = {
      money,
      description,
      category,
    };
    setExpenses((prevData) => [...prevData, expense]);
    alert("Expense added successfully!!");
    spentMoneyInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    selectInputRef.current.value = "Select";
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10} className="mx-auto">
          <div style={{ background: "white" }}>
            <div className="card border-primary">
              <div className="card-body">
                <h4 className="card-title text-center">Expense</h4>
                <hr />
                <Form onSubmit={onFormSubmit}>
                  <Form.Group className="mb-3" controlId="spentMoney">
                    <Form.Label>Money</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Add Expense money."
                      ref={spentMoneyInputRef}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Add Description here."
                      ref={descriptionInputRef}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      ref={selectInputRef}
                    >
                      <option>Select</option>
                      <option value="petrol">Petrol</option>
                      <option value="rent">Rent</option>
                      <option value="food">Food</option>
                      <option value="shopping">Shopping</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="d-grid gap-2 my-2">
                    <Button variant="primary" type="submit">
                      Add Expense
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10} className="mx-auto">
          <div style={{ background: "white" }}>
            <div className="card border-primary">
              <div className="card-body">
                <ExpenseList data={expenses} />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ExpenseForm;
