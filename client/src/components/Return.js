import React from 'react';
import {
  Button,
  Form,
  Alert,
} from 'react-bootstrap';
import './Clerk.css';

import { noNullState, formatDate, formatTime, capitalizeWord } from '../utils/Utils';
import { API_BASE, POST } from '../utils/Const';

class Return extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rid: null,
      dlicense: null,
      vlicense: null,
      branchLocation: null,
      branchCity: null,
      odometer: null,
      fulltank: null,
      tankValue: null,
      showAlert: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { rid, dlicense, vlicense, branchCity, branchLocation, odometer, fulltank, tankValue } = this.state;
    fetch(API_BASE + 'return', {
      method: POST,
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rid: rid,
        dlicense: dlicense,
        vlicense: vlicense,
        branch_location: branchLocation,
        branch_city: branchCity,
        odometer: odometer,
        fulltank: fulltank,
        tank_value: tankValue,
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      this.alert(json.success, json.content);
      this.clearForm();
    })
    .catch(function(error) {
      console.log(error);
      this.alert(false);
    })
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  alert(success, content) {
    if (success) {
      this.setState({
        alertTitle: 'All Done!',
        alertMessage: (
          <div className="message">
            <b>Your return has been successfully processed!</b>
            <p>Your Rental ID is #{content.rid}</p>
            <p>Return Date: {formatDate(content.to_date)} at {formatTime(content.to_time)}</p>
            {/* <p>Returned at Branch: {content.branch_location} {content.branch_city}</p> */}
            <h5>Cost Breakdown:</h5>
            <p>Rate Type: {capitalizeWord(content.cost_struct.rate_type)}</p>
            <p>{capitalizeWord(content.cost_struct.rate_type)}: ${content.cost_struct.rate}</p>
            <p>Quantity: {content.cost_struct.quantity}</p>
            <p>Base Price: ${content.cost_struct.rate} x {content.cost_struct.quantity} = ${content.cost_struct.base_price}</p>
            <p>Late Fees: ${content.cost_struct.late_fee}</p>
            <p>Total Price: ${content.cost_struct.total_price}</p>
            <b>*Please save this information*</b>
          </div>
        ),
        alertColor: 'success',
        showAlert: true,
      })
    } else {
      this.setState({
        alertTitle: 'Something went wrong.',
        alertMessage: content,
        alertColor: 'danger',
        showAlert: true,
        showModal: false,
        confNo: null,
      })
    }
    setTimeout((() => this.setState({showAlert: false})), 120000);
  }

  clearForm() {
    this.setState({
      rid: null,
      dlicense: null,
      vlicense: null,
      branchLocation: null,
      branchCity: null,
      odometer: null,
      fulltank: null,
      tankValue: null,
    });
    this.messageForm.reset();
  }

  render() {
    return(
      <div className="return">
        <h2>Complete a Vehicle Return</h2>
        <form className="form" ref={ form => this.messageForm = form } onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Rental ID</Form.Label>
            <Form.Control type="number" name="rid" onChange={this.handleChange} placeholder="9999999" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Driver's License Number</Form.Label>
            <Form.Control type="number" name="dlicense" onChange={this.handleChange} placeholder="9999999" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Vehicle License Number</Form.Label>
            <Form.Control type="number" name="vlicense" onChange={this.handleChange} placeholder="9999999" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Full Tank?</Form.Label>
            <Form.Control type="boolean" name="fulltank" onChange={this.handleChange} placeholder="true" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tank Value</Form.Label>
            <Form.Control type="number" name="tankValue" onChange={this.handleChange} placeholder="30" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Odometer</Form.Label>
            <Form.Control type="number" name="odometer" onChange={this.handleChange} placeholder="130000" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Branch Location</Form.Label>
            <Form.Control type="text" name="branchLocation" onChange={this.handleChange} placeholder="Downtown"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Branch City</Form.Label>
            <Form.Control type="text" name="branchCity" onChange={this.handleChange} placeholder="Vancouver"/>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!noNullState(this.state)}>
            Submit
          </Button>
        </form>
        <Alert className="alert" show={this.state.showAlert} variant={this.state.alertColor} onClose={() => this.setState({showAlert: false})} dismissible>
          <Alert.Heading>{this.state.alertTitle}</Alert.Heading>
          {this.state.alertMessage}
        </Alert>
      </div>
    );
  }
}

export default Return;