import React, { Component } from 'react';
import {
  Row,
  Col,
  Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';
import { API_URL_PREFIX } from '../utilities/helper';

class CompaniesIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      statistics: {}
    };
  }

  _fetchCompaniesData() {
    let url = API_URL_PREFIX + '/companies';
    fetch(url)
    .then((results) => {
      return results.json();
    }).then((data) => {
      this.setState({ companies: data });
    });
  }

  _fetchStatistics() {
    let url = API_URL_PREFIX + '/statistics';
    fetch(url)
    .then((results) => {
      return results.json();
    }).then((statistics) => {
      this.setState({statistics});
    });
  }

  componentWillMount() {
    this._fetchCompaniesData();
    this._fetchStatistics();
  }

  _renderSidebar() {
    return (
      <div className='left-sidebar'>
        <div style={{marginBottom: "1em"}}>
          <input style={{
            borderRadius: "5px",
            padding: "3.5px",
            width: "80%"
          }} type="text" placeholder="Input UEN or name" />
        </div>
        <div><Button bsStyle="primary" style={{width:"30%"}}>Search</Button></div>
        <br/>

        <h4><b>Statistics</b></h4>
        <h5><b>Reviews:</b> {this.state.statistics.reviews}</h5>
        <h5><b>Companies:</b> {this.state.statistics.companies}</h5>
        <h5><b>Products:</b> {this.state.statistics.products}</h5>
        <h5><b>Services:</b> {this.state.statistics.services}</h5>
      </div>
    );
  }

  _renderCompanies() {
    return this.state.companies.map((company, i) => {
      let name = company.name.toLowerCase().replace(/ /g, "_");
      return (
        <Link key={i} to={`/companies/${company.id}`}>
          <Row>
            <Col xs={2}>
              <img width={125} src={require(`../img/companies/${name}.png`)} alt=""/>
            </Col>
            <Col xs={10}>
              <p style={{ color: 'black' }}><b>{company.name} | UEN: {company.UEN}</b></p>
              <div className='main-content-stars-div'>
                <ReactStars
                  count={5}
                  value={parseFloat(company.aggregate_score)}
                  edit={false} />
              </div>
              <div className="main-content-text-div">
                {company.reviews_count + ' ' + (company.reviews_count === 1 ? 'Review' : 'Reviews')}
              </div>
              {
                company.strengths.map((strength, i) => {
                  return (
                    <Button
                      style={{
                        borderColor: '#4A8EE0',
                        color: '#4A8EE0'
                      }}
                      key={i}>{strength}
                    </Button>
                  );
                })
              }
              <br/>
              <br/>
              <p style={{ color: "grey" }}>{company.description}</p>
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
          {this._renderCompanies()}
        </div>
      </div>
    );
  }
}

export default CompaniesIndex;
