import React, { Component } from 'react';
import {
  Row,
  Col,
  Glyphicon,
  Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';
import { API_URL_PREFIX } from '../utilities/helper';

class Entity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entity: null,
      reviews: [],
      monthNames: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]
    };
  }

  _fetchEntityData(id) {
    // Fetch entity data
    let url = API_URL_PREFIX + `/${this.props.match.params.entity}/${id}`;
    fetch(url)
    .then((results) => {
      return results.json();
    }).then((data) => {
      this.setState({entity: data});
    });
  }

  _fetchReviewsData(id) {
    // Fetch reviews for entity
    let url = API_URL_PREFIX + `/${this.props.match.params.entity}/${id}/reviews`;
    fetch(url)
    .then((results) => {
      return results.json();
    }).then((data) => {
      this.setState({ reviews: data });
    });
  }

  componentDidMount() {
    let id = parseInt(this.props.match.params.id, 10);
    this._fetchEntityData(id);
    this._fetchReviewsData(id);
  }

  _formatDateTime(dateTime) {
    let dt = new Date(dateTime);
    return this.state.monthNames[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();
  }

  _renderSidebar() {
    const entity = this.state.entity;
    if (entity === null) return null;
    let type = this.props.match.params.entity;
    let name = entity.name.toLowerCase().replace(/ /g, "_");
    return (
      <div className='left-sidebar'>
        <div>
          <img width={125} src={require(`../img/${type}/${name}.png`)} alt="" />
          {/* <img width={300} src={require('../img/0.png')} alt="" /> */}
        </div>
        <h4><b>{entity.name}</b></h4>
        <div className='sidebar-stars-div'>
          <ReactStars
            count={5}
            value={parseFloat(entity.aggregate_score)}
            edit={false} />
        </div>
        <div className='sidebar-text-div'>
          {entity.reviews_count} {entity.reviews_count === 1 ? "Review" : "Reviews"}
        </div>
        <br/>
        <br/>
        <p><b>Company: </b>{this.state.entity.company_name}</p>
        <p><b>Description: </b><br/>{entity.description}</p>
        <Button bsStyle='primary'>Write a Review</Button>
      </div>
    );
  }

  _renderReviews() {
    return this.state.reviews.map((review, i) => {
      let name = review.company.name.toLowerCase().replace(/ /g, "_");
      return (
        <Link key={i} to={`/${this.props.match.params.entity}/${this.state.entity.id}/reviews/${review.id}`}>
          <Row>
            <Col xs={2}>
              <img width={125} src={require(`../img/companies/${name}.png`)} alt="" />
            </Col>
            <Col xs={10}>
              <div className='main-content-stars-div'>
                <p style={{color: "black"}}><b>{review.company.name}</b></p>
                <ReactStars
                  count={5}
                  value={parseFloat(review.score)}
                  edit={false} />
              </div>
              <div className='main-content-text-div'>
                <p>
                  {this._formatDateTime(review.updated_at)}
                  <span style={{float: "right"}}>
                    {review.likes_count + " "}<Glyphicon glyph='thumbs-up' />
                    {" " + review.comments_count + " "}<Glyphicon glyph='comment' />
                  </span>
                </p>
              </div>
              {
                review.strengths.map((strength, i) => {
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
              <p style={{color: "grey"}}>{review.content}</p>
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
            {this._renderReviews()}
        </div>
      </div>
    );
  }
}

export default Entity;
