import React, { Component } from 'react';
import './App.scss';
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
import CompanyIndexPage from './components/company/index/CompanyIndexPage';

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
      <img width={200} src={require("./assets/img/govt.png")} alt=''/>
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
    <img className="img-responsive footer-image" src={require("./assets/img/footer-img.png")} alt=""/>
  </div>
);

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className='container-fluid'>
          <Switch>
            <Route exact path='/' component={CompanyIndexPage}/>
            <Route exact path='/companies' component={CompanyIndexPage}/>
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}


export default App;
