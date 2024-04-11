import React, { useCallback, useEffect, useRef } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import AuthContext from "../../context/AuthContext";

const Profile = () => {
  const fullNameInputRef = useRef();
  const profilePhotoUrlRef = useRef();

  const token = useSelector((state) => state.auth.token);

  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBhWgo-onnehVfjggey6b2N9Rel6F0txZc";

  const fetchData = useCallback(async () => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBhWgo-onnehVfjggey6b2N9Rel6F0txZc";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          returnSecureToken: true,
        }),
        header: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.users[0]);
        fullNameInputRef.current.value = data.users[0].displayName;
        profilePhotoUrlRef.current.value = data.users[0].photoUrl;
      } else {
        let errorMsg = "Fail!!";
        throw new Error(errorMsg);
      }
    } catch (error) {
      alert(error);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const fullName = fullNameInputRef.current.value;
    const photoUrl = profilePhotoUrlRef.current.value;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: fullName,
          photoUrl: photoUrl,
          returnSecureToken: true,
        }),
        header: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        alert("Successfully Updated!!!");
      } else {
        let errorMsg = "Data Updation Fail!!";
        throw new Error(errorMsg);
      }
    } catch (error) {
      alert(error);
    }
    fullNameInputRef.current.value = "";
    profilePhotoUrlRef.current.value = "";
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h4>Winners never quite,Quitters never win!!!</h4>
        </Col>
        <Col>
          <div className="d-grid gap-2">
            <Button variant="secondary">
              <span>
                Your Profile is 64% completed.A complete Profile has higher
                chances of landing a Job.
              </span>
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
      <h4>Contact Details</h4>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            ref={fullNameInputRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="profilePhotoUrl">
          <Form.Label>Profile Photo URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="URL"
            ref={profilePhotoUrlRef}
          />
        </Form.Group>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="primary" type="submit" className="mx-4">
            Update
          </Button>

          <Button variant="danger" type="submit">
            <NavLink to="/" style={{ color: "white", textDecoration: "none" }}>
              Cancel
            </NavLink>
          </Button>
        </div>
      </Form>
      <hr />
    </Container>
  );
};

export default Profile;
