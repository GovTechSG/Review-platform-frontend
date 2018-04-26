import React from 'react';
import {
  Button,
  Nav,
  Navbar,
  NavItem,
} from 'react-bootstrap';

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
      <img width={200} src={require("../../../assets/img/govt.png")} alt=''/>
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
      <Nav pullRight>
        <NavItem className="logout" eventKey={1} href="#">
          <Button bsStyle="primary">Logout</Button>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);