import React from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Alert,
  Button,
  Form,
  FormControl,
  Modal,
} from 'react-bootstrap';
import './Components.css';
import QR from './QR';
import { Link } from 'react-router-dom';
import { API_BASE, POST } from '../utils/Const';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      pin: null,
      question: null,
      answer: null,
      rid: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleRegister(e) {
    e.preventDefault();
    const { name, pin, question, answer } = this.state;
    fetch(API_BASE + 'receiver', {
      method: POST,
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uname: name,
        pin: pin,
        question: question,
        answer: answer,
      })
    })
    .then(res => res.json())
    .then(json => {
      this.setState({rid: json.content});
    })
    .catch(function(error) {
      console.log(error);
      // this.alert(false);
    })
  }

  renderQR() {
    if (this.state.rid == null) {
      return null;
    } else {
      return(
        <div className="qr">
          <QR rid={this.state.rid} />
          <p>Print this and give to Receiver.</p>
        </div>
      );
    }
  }

  render() {
    return(
      <div className="register">
        <h5>Register new Receiver</h5>
        <form className="form" ref={ form => this.messageForm = form } onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" onChange={this.handleChange} placeholder="John Appleseed" />
          </Form.Group>
          <Form.Group>
            <Form.Label>PIN</Form.Label>
            <Form.Control type="number" name="pin" onChange={this.handleChange} placeholder="1234"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Security Question (optional)</Form.Label>
            <Form.Control type="text" name="question" onChange={this.handleChange} placeholder="" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Security Answer (optional)</Form.Label>
            <Form.Control type="text" name="answer" onChange={this.handleChange} placeholder="" />
          </Form.Group>
        </form>
        <Button
          variant="success"
          onClick={this.handleRegister}
          disabled={this.state.name == null || this.state.pin == null}
        >
          Register
        </Button>
        {this.renderQR()}
      </div>
    );
  }
}

export default Register;