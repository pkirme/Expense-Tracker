import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import ExpenseList from "./ExpenseList";

import ExpenseDatabaseContext from "../../context/ExpenseDatabaseContext";

const ExpenseForm = () => {
  const spentMoneyInputRef = useRef();
  const descriptionInputRef = useRef();
  const selectInputRef = useRef("select");
  const [id, setId] = useState(null);

  const expenseCtx = useContext(ExpenseDatabaseContext);

  useEffect(() => {
    expenseCtx.fetchDataFromDatabase();
  }, []);

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();
    const money = spentMoneyInputRef.current.value;
    const description = descriptionInputRef.current.value;
    const category = selectInputRef.current.value;
    if (!money || !description) {
      alert("One of field is empty!");
      return;
    }
    if (id !== null) {
      console.log(id);
      const expense = {
        id,
        money,
        description,
        category,
      };
      expenseCtx.addExpense(expense, "update");
    } else {
      const expense = {
        money,
        description,
        category,
      };
      expenseCtx.addExpense(expense, "add");
    }

    spentMoneyInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    selectInputRef.current.value = "Select";
  };

  const onEditHandler = (expense) => {
    spentMoneyInputRef.current.value = expense.money;
    descriptionInputRef.current.value = expense.description;
    selectInputRef.current.value = expense.category;

    setId(expense.id);
  };

  const onDeleteHandler = async (id) => {
    expenseCtx.deleteExpense(id);
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
                <Form onSubmit={onFormSubmitHandler}>
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
                <ExpenseList
                  data={expenseCtx.data}
                  onEdit={onEditHandler}
                  onDelete={onDeleteHandler}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ExpenseForm;
