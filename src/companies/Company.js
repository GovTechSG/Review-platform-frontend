import React, { Component } from 'react';
import {
  Row,
  Col,
  Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';
import { API_URL_PREFIX } from '../utilities/helper';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: null,
      products: [],
      services: []
    };
  }

  _fetchCompanyData(id) {
    // Fetch company data
    let url = API_URL_PREFIX + `/companies/${id}`;
    fetch(url)
    .then((results) => {
      return results.json();
    }).then((data) => {
      this.setState({company: data});
    });
  }

  _fetchEntityData(id, type) {
    // Fetch products/services by company
    let url = API_URL_PREFIX + `/companies/${id}/${type}`;
    fetch(url)
    .then((results) => {
      return results.json();
    }).then((data) => {
      if (type === 'products') {
        this.setState({products: data});
      } else {
        this.setState({services: data});
      }
    });
  }

  componentWillMount() {
    let id = parseInt(this.props.match.params.id, 10);
    this._fetchCompanyData(id);
    this._fetchEntityData(id, 'products');
    this._fetchEntityData(id, 'services');
  }

  _renderSidebar() {
    let id = parseInt(this.props.match.params.id, 10);
    if (this.state.company === null) return null;
    let name = this.state.company.name.toLowerCase().replace(/ /g, "_");
    return (
      <div className='left-sidebar'>
        <div>
          <img width={200} src={require(`../img/companies/${name}.png`)} alt=""/>
        </div>
        <h4><b>{this.state.company.name}</b></h4>
        <div className='sidebar-stars-div'>
          <ReactStars
            count={5}
            value={parseFloat(this.state.company.aggregate_score)}
            edit={false} />
        </div>
        <div className='sidebar-text-div'>
          {this.state.company.reviews_count} Reviews
        </div>
        <br/>
        <br/>
        <p><b>Company: </b>{this.state.company.name}</p>
        <p><b>Products: </b>{this.state.products.length}</p>
        <p><b>Services: </b>{this.state.services.length}</p>
        <p><b>Description: </b><br/>{this.state.company.description}</p>
        <br/>
        <Button bsStyle='primary'>Write a Review</Button>
      </div>
    );
  }

  _renderEntities(type) {
    return this.state[type].map((entity, i) => {
      let name = entity.name.toLowerCase().replace(/ /g, "_");
      return (
        <Link key={i} to={`/${type}/${entity.id}`}>
          <Row>
            <Col xs={2}>
              <img width={125} src={require(`../img/${type}/${name}.png`)} alt="" />
            </Col>
            <Col xs={10}>
              <div className='main-content-stars-div'>
                <p style={{color: "black"}}><b>{entity.name}</b></p>
                <ReactStars
                  count={5}
                  value={parseFloat(entity.aggregate_score)}
                  edit={false} />
              </div>
              <div className='main-content-text-div'>
                {entity.reviews_count} {entity.reviews_count === 1 ? "Review" : "Reviews"}
              </div>
              <p style={{ color: "grey" }}>{entity.description}</p>
            </Col>
          </Row>
          <hr />
        </Link>
      );
    });
  }

  render() {
    return (
      <div>
        {this._renderSidebar()}
        <div className='main-content'>
          {this._renderEntities('products')}
          {this._renderEntities('services')}
        </div>
      </div>
    );
  }
}

export default Company;
