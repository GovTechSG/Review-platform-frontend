import React, { Component } from 'react';
import { Footer } from './Footer'
import { Header } from './Header'
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import CompanyIndexPage from '../../company/index/CompanyIndexPage';

class App extends Component {
  render() {
    return (
      <div className='base-container'>
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
