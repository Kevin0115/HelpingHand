import React from 'react';
import {
  Button,
  Form,
  Alert
} from 'react-bootstrap';
import './Clerk.css';

import { API_BASE, POST } from '../utils/Const';
import { capitalizeWord, noNullState } from '../utils/Utils';

class RentalNoReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNo: null,
      cardName: null,
      expDate: null,
      dlicense: null,
      toDate: null,
      toTime: null,
      branchLocation: null,
      branchCity: null,
      vtname: null,
      showAlert: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { cardNo, cardName, expDate, dlicense, toDate, toTime,
            branchLocation, branchCity, vtname } = this.state;
    fetch(API_BASE + 'rental', {
      method: POST,
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        card_no: cardNo,
        card_name: cardName,
        exp_date: expDate,
        dlicense: dlicense,
        to_date: toDate,
        to_time: toTime,
        branch_location: capitalizeWord(branchLocation),
        branch_city: capitalizeWord(branchCity),
        vtname: vtname.toLowerCase()
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

  alert(success, content) {
    if (success) {
      this.setState({
        alertTitle: 'All Done!',
        alertMessage: (
          <div className="message">
            <b>Your rental has been successfully started!</b>
            <p>Your Rental ID is #{content.rid}</p>
            <p>Your Vehicle Plate Number Is {content.vlicense}</p>
            <p>Start Date: {content.from_date} at {content.from_time}</p>
            <p>End Date: {content.to_date} at {content.to_time}</p>
            <p>Pick-up Branch: {content.branch_location} {content.branch_city}</p>
            <b>*Please save this information, as you will need it upon return.*</b>
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
    setTimeout((() => this.setState({showAlert: false})), 30000);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  clearForm() {
    this.setState({
      cardNo: null,
      cardName: null,
      expDate: null,
      dlicense: null,
      toDate: null,
      toTime: null,
      branchLocation: null,
      branchCity: null,
      vtname: null
    });
    this.messageForm.reset();
  }

  render() {
    return(
      <div className="rental-reservation">
        <h2>Book a Rental</h2>
        <form className="form" ref={ form => this.messageForm = form } onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Branch Location</Form.Label>
            <Form.Control type="text" name="branchLocation" onChange={this.handleChange} placeholder="Downtown" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Branch City</Form.Label>
            <Form.Control type="text" name="branchCity" onChange={this.handleChange} placeholder="Vancouver" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rental End Date</Form.Label>
            <Form.Control type="date" name="toDate" onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rental End Time</Form.Label>
            <Form.Control type="time" name="toTime" onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Vehicle Type (Format: size_enginetype)</Form.Label>
            <Form.Control type="text" name="vtname" onChange={this.handleChange} placeholder="compact_electric" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Driver's License Number</Form.Label>
            <Form.Control type="number" name="dlicense" onChange={this.handleChange} placeholder="9999999" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name on Credit Card</Form.Label>
            <Form.Control type="text" name="cardName" onChange={this.handleChange} placeholder="John Appleseed"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Credit Card Number</Form.Label>
            <Form.Control type="number" name="cardNo" onChange={this.handleChange} placeholder="4800888800008888" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Credit Card Expiration Date</Form.Label>
            <Form.Control type="date" name="expDate" onChange={this.handleChange} placeholder="2020-02-02" />
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

export default RentalNoReservation;