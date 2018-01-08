import React, { Component } from 'react';
import {
  Row,
  Col,
  Glyphicon,
  Button
} from 'react-bootstrap';
import ReactStars from 'react-stars';
import { API_URL_PREFIX } from '../utilities/helper';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entity: null,
      review: null,
      comments: [],
      monthNames: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]
    };
  }

  _fetchEntityData(entityId) {
    const entity = this.props.match.params.entity;
    // Fetch entity data
    let url = API_URL_PREFIX + `/${entity}/${entityId}`;
    fetch(url)
      .then((results) => {
        return results.json();
      }).then((data) => {
        this.setState({ entity: data });
      });
  }

  _fetchReviewData(id) {
    // Fetch review data
    let url = API_URL_PREFIX + `/reviews/${id}`;
    fetch(url)
      .then((results) => {
        return results.json();
      }).then((data) => {
        this.setState({ review: data });
      });
  }

  _fetchCommentsData(id) {
    let url = API_URL_PREFIX + `/reviews/${id}/comments`;
    fetch(url)
      .then((results) => {
        return results.json();
      }).then((data) => {
        this.setState({ comments: data });
      });
  }

  componentWillMount() {
    const id = parseInt(this.props.match.params.id, 10);
    const entityId = parseInt(this.props.match.params.entity_id, 10);
    this._fetchEntityData(entityId);
    this._fetchReviewData(id);
    this._fetchCommentsData(id);
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

  _renderReview() {
    const review = this.state.review;
    if (review === null) return null;
    let name = review.company.name.toLowerCase().replace(/ /g, "_");
    return (
      <div>
        <Row>
          <Col xs={2}>
            <img width={125} src={require(`../img/companies/${name}.png`)} alt="" />
          </Col>
          <Col xs={10}>
            <div className='main-content-stars-div'>
              <p><b>{review.company.name}</b></p>
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
            <p style={{color: "grey"}}>{review.content}</p>
          </Col>
        </Row>
        <hr />
      </div>
    );
  }

  _renderComments() {
    return this.state.comments.map((comment, i) => {
      let name = comment.agency.name.toLowerCase().replace(/ /g, "_");
      return (
        <div key={i}>
          <Row>
            <Col xs={2}>
              <img width={125} src={require(`../img/agencies/${name}.png`)} alt="" />
            </Col>
            <Col xs={10}>
              <p><b>{comment.agency.name}</b></p>
              {this._formatDateTime(comment.updated_at)}
              <p>{comment.content}</p>
            </Col>
          </Row>
          <hr />
        </div>
      )
    });
  }

  render() {
    return (
      <div>
        {this._renderSidebar()}
        <div className='main-content'>
          {this.state.review && this._renderReview()}
          <h5>
            <b>Comments</b>
            <hr/>
          </h5>
          {this._renderComments()}
        </div>
      </div>
    );
  }
}

export default Review;
