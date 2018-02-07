import React, { Component } from 'react';
import './App.css';
import {
  Row,
  Col,
  Button,
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import CompaniesIndex from './companies/CompaniesIndex';
import Company from './companies/Company';
import Entity from './entities/Entity';
import Review from './reviews/Review';

const Header = () => (
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
      <img width={200} src={require("./img/govt.png")} alt=''/>
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
          <span>Logout</span>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const Footer = () => (
  <div style={{textAlign: "center"}}>
    <img src={require("./img/footer-img.png")} alt=""/>
  </div>
);

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className='container-fluid'>
          <Switch>
            <Route exact path='/' component={CompaniesIndex}/>
            <Route exact path='/companies' component={CompaniesIndex}/>
            <Route exact path='/companies/:id' component={Company}/>

            <Route exact path='/:entity/:id' component={Entity} />

            <Route exact path='/:entity/:entity_id/reviews/:id' component={Review} />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}


export default App;
