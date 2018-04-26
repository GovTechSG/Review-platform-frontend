import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default class HalfWidthMessage extends React.Component {
  render() {
    return (
      <Row className="eligibility-advice">
        <Col sm={6} smOffset={6}>
          <span>
            {this.props.label}
          </span>
        </Col>
      </Row>
    );
  }
}
