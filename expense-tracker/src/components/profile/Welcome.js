import { Button, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ExpenseForm from "../expenses/ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Welcome = () => {
  const dispatch = useDispatch();
  const expenseTotal = useSelector((state) => state.expense.totalAmount);
  const token = useSelector((state) => state.auth.token);

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

  const onLogoutHandler = () => {
    dispatch(authActions.logout());
  };

  const activateMembershipHandler=()=>{
    
  }

  return (
    <Container className="my-5">
      <Row>
        <Col xs={6}>
          <h2>Welcome To Expense-Tracker!!</h2>
        </Col>
        <Col xs={5}>
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
        <Col>
          <Button variant="success" onClick={onLogoutHandler}>
            Logout
          </Button>
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
      {expenseTotal > 10000 && (
        <Row className="my-2">
          <Col>
            <div className="d-grid gap-2">
              <Button variant="secondary" onClick={activateMembershipHandler}>
                Activate Prime Membership.
              </Button>
            </div>
          </Col>
        </Row>
      )}

      <ExpenseForm />
    </Container>
  );
};

export default Welcome;
