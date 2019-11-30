import React from 'react';
import {
  Button,
  Form,
  Alert,
} from 'react-bootstrap';
import './Customer.css';

import { API_BASE, POST } from '../utils/Const';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Registration Info
      name: null,
      address: null,
      phone: null,
      dlicense: null,
      // Alert Info
      showAlert: false,
      alertMessage: null,
      alertTitle: null,
      alertColor: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, address, phone, dlicense } = this.state;
    fetch(API_BASE + 'customer', {
      method: POST,
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "dlicense": dlicense,
        "cellphone": phone,
        "name": name,
        "address": address
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      this.alert(json.success)
      this.clearForm();
    })
    .catch(function(error) {
      console.log(error);
      this.alert(false);
    })
  }

  alert(success) {
    if (success) {
      this.setState({
        showAlert: true,
        alertTitle: 'Success!',
        alertMessage: 'You have been successfully registered for SuperRent.',
        alertColor: 'success'
      });
    } else {
      this.setState({
        showAlert: true,
        alertTitle: 'Sorry...',
        alertMessage: 'There was an issue processing your registration.',
        alertColor: 'danger'
      });
    }
    setTimeout((() => this.setState({showAlert: false})), 3000);
  }

  clearForm() {
    this.setState({
      name: null,
      address: null,
      phone: null,
      dlicense: null,
    });
    this.messageForm.reset();
  }

  render() {
    return(
      <div className="register">
        <h2>Register for SuperRent</h2>
        <form className="form" ref={ form => this.messageForm = form } onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" onChange={this.handleChange} placeholder="John Appleseed" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" onChange={this.handleChange} placeholder="1 Hacker Way" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="number" name="phone" onChange={this.handleChange} placeholder="6048882424"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Driver's License Number</Form.Label>
            <Form.Control type="number" name="dlicense" onChange={this.handleChange} placeholder="9779800" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
        <Alert className="alert" show={this.state.showAlert} variant={this.state.alertColor} onClose={() => this.setState({showAlert: false})} dismissible>
          <Alert.Heading>{this.state.alertTitle}</Alert.Heading>
          <p>{this.state.alertMessage}</p>
        </Alert>
      </div>
    );
  }
}

export default Register;