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
import { Link } from 'react-router-dom';
import { API_BASE, POST } from '../utils/Const';

class Donate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rid: null,
      amount: 0,
      showModal: false,
      showAlert: false,
      name: null,
      cardNumber: null,
      expiryDate: null
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDonate = this.handleDonate.bind(this);
  }

  componentDidMount() {
    this.setState({rid: this.props.rid});
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({amount: e.target.value});
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  clearForm() {
    this.setState({
      name: null,
      cardNumber: null,
      expiryDate: null,
      amount: 0
    });
    this.messageForm.reset();
  }

  alert() {
    this.setState({
      showAlert: true,
      showModal: false
    });
    setTimeout((() => this.setState({showAlert: false})), 5000);
  }

  handleDonate(e) {
    e.preventDefault();
    const { name, cardNumber, expiryDate, rid, amount } = this.state;
    fetch(API_BASE + 'donation', {
      method: POST,
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amount,
        rid: rid
      })
    })
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        this.alert();
      }
      this.clearForm();
    })
    .catch(function(error) {
      console.log(error);
      // this.alert(false);
    })
  }

  render() {
    return(
      <div className="donate">
        <h5>Select a Donation Amount</h5>
        <p>Donations under $1 are not accepted.</p>
        <div className="buttons">
          <Button className="select-button" variant="primary" onClick={this.handleClick} value={2}>$2</Button>
          <Button className="select-button" variant="primary" onClick={this.handleClick} value={5}>$5</Button>
          <Button className="select-button" variant="primary" onClick={this.handleClick} value={10}>$10</Button>
          <Button className="select-button" variant="primary" onClick={this.handleClick} value={20}>$20</Button>
          <Form inline>
            <FormControl type="number" name="amount" placeholder="Custom" className="mr-sm-2" onChange={this.handleChange} />
          </Form>
        </div>
        <h6>Amount: ${this.state.amount}</h6>
        <Button
          className="proceed"
          size="lg"
          variant="success"
          onClick={() => this.setState({showModal: true})}
          disabled={this.state.amount < 1}
        >
          Proceed
        </Button>
        <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
          <Modal.Header>
            <Modal.Title>Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Please enter your credit card information.
            </p>
            <form className="form" ref={ form => this.messageForm = form } onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" onChange={this.handleChange} placeholder="John Appleseed" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Credit Card Number</Form.Label>
                <Form.Control type="number" name="cardNumber" onChange={this.handleChange} placeholder="4800888800008888"/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control type="date" name="expiryDate" onChange={this.handleChange} placeholder="2020-02-02" />
              </Form.Group>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({showModal: false})}>
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={this.handleDonate}
              disabled={this.state.name == null || this.state.cardNumber == null || this.state.expiryDate == null}
            >
              Donate
            </Button>
          </Modal.Footer>
        </Modal>
        <Alert className="alert" show={this.state.showAlert} variant="success" onClose={() => this.setState({showAlert: false})} dismissible>
          <Alert.Heading>Success</Alert.Heading>
          <p>Your donation has been accepted!</p>
        </Alert>
      </div>
    );
  }
}

export default Donate;