import React, { useEffect, useState } from "react";
import { NavLink, Route, useHistory } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";

const Login = () => {
  return (
    <>
      <div className=" mt-3 mx-md-5">
        <div className="row p-0 mx-5 justify-content-between">
          <NavLink to="/" className="text-decoration-none">
            <h4 className="m-0 pt-2">SHOPAY</h4>
          </NavLink>
        </div>
        <div className="row my-3 justify-content-center align-items-center mx-lg-5">
          <div className="col-lg-7">
            <img
              className="img-fluid"
              width="650px"
              src={`${process.env.PUBLIC_URL}/images/assests/login.jpg`}
              alt="logo"
            />
          </div>
          <div className="col-lg-5 ">
            <div className="d-flex text-center justify-content-center align-items-center">
              <div className="col-xl-9 col-12">
                <div className="card p-4  border-0">
                  <button className="btn btn-dark rounded">
                    
                    <Nav.Link href="http://localhost:8000">Login</Nav.Link>
                  </button>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
