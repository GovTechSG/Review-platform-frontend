import React from 'react';
import {
  Nav,
  Navbar,
  NavItem,
} from 'react-bootstrap';
import govtLogo from './govt-logo.svg';


export const Header = () => (
  <Navbar collapseOnSelect fluid>
    <Navbar.Header className="col-md-3">
      <Navbar.Brand>
        <a href="/">
          <h1>WRP</h1>
          <p>WOG Review Platform</p>
        </a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <div className="pull-right">
      <img width={200} src="../../../assets/img/govt.png" alt="" />
    </div>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#">
          Home
        </NavItem>
        <NavItem eventKey={2} href="#">
          Write a Review
        </NavItem>
        <NavItem eventKey={3} href="#">
          FAQ
        </NavItem>
      </Nav>
      <div className="pull-right">
        <div id="bgp-gvt-logo-container">
          <div className="govt-logo">
            <a target="_blank" href="https://www.gov.sg">
              <img src={govtLogo} alt="gov.sg" />
            </a>
          </div>

          <div className="lion-link">
            <a href="/feedback">Contact Us/Feedback</a>
            <a href="/about_us">About Us</a>
          </div>
        </div>
      </div>
    </Navbar.Collapse>
  </Navbar>
);
