import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CartSideBar from "./CartSideBar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const AppNavBar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    const tokenValue = localStorage.getItem("token");
    if (tokenValue) {
      setShow(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            Dielmi Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/purchases">
                Products
              </Nav.Link>
              <Nav.Link onClick={handleShow}>SideBar</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CartSideBar show={show} handleClose={handleClose} />
    </>
  );
};

export default AppNavBar;
