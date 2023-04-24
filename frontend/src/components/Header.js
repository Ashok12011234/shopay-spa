import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";

const Header = () => {
  const [email, setEmail] = useState("signin");

  useEffect(() => {
    Axios.get("http://localhost:8000/oauth2/userinfo").then((response) => {
      setEmail(response.data["email"]);
      //console.log(response.data);
    });
  }, []);

  const [isLoggedin, setIsLoggedIn] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:8000/oauth2/auth").then((response) => {
      if (response.status === 202) {
        setIsLoggedIn(true);
      }

      console.log(response.data);
    });
  }, []);

  

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/home">
            <Navbar.Brand>ShoPay</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>

              {isLoggedin ? (
                <Nav.Link>
                  <i class="fas fa-envelope"></i>
                  {email}
                </Nav.Link>
              ) : (
                <Nav.Link href="http://localhost:8000/oauth2/sign_in?rd=/home">
                  <i className="fas fa-user"></i> {email}
                </Nav.Link>
              )}

              {isLoggedin ? (
                <>
                  <LinkContainer to="/orders">
                    <Nav.Link>
                      <i class="fas fa-list-alt"></i> MyOrders
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/offer" >
                    <Nav.Link>
                      <i class="fas fa-tag"></i>
                      Offer
                    </Nav.Link>
                  </LinkContainer>

                 
                    <Nav.Link href="http://localhost:8000/oauth2/sign_out?rd=/home">
                      <i class="fas fa-sign-out-alt"></i>
                      Logout
                    </Nav.Link>
                 
                </>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
