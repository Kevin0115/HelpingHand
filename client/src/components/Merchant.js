import React from 'react';
import { API_BASE, GET, POST } from '../utils/Const';
import { Card, Form, FormControl, Button, Alert } from 'react-bootstrap';

class Merchant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: null,
      amount: 0,
      mid: null,
      showAlert: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
  }

  componentDidMount() {
    this.fetchBalance();
  }

  fetchBalance() {
    fetch(API_BASE + 'receiver/' + this.props.rid, {
      method: GET
    })
    .then(res => res.json())
    .then(json => {
      this.setState({balance: json.content.balance});
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  renderFinal() {
    const final = this.state.balance - this.state.amount;
    if (final < 0) {
      return 'Insufficient Funds.';
    } else {
      return parseFloat(final).toFixed(2);
    }
  }

  handlePurchase(e) {
    e.preventDefault();
    const { mid, amount } = this.state;
    const { rid } = this.props;
    fetch(API_BASE + 'transaction', {
      method: POST,
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amount,
        rid: rid,
        mid: mid
      })
    })
    .then(res => res.json())
    .then(json => {
      this.fetchBalance();
      if (json.success) {
        this.alert();
      }
      this.clearForm();
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  clearForm() {
    this.setState({
      mid: null,
      amount: 0,
    });
  }

  alert() {
    this.setState({
      showAlert: true,
    });
    setTimeout((() => this.setState({showAlert: false})), 5000);
  }

  render() {
    return(
      <div className="merchant">
        <h5>Checkout</h5>
        <Card className="card">
          <Card.Header className="card-title">Transaction Details</Card.Header>
          <Card.Body className="card-body">
            <Card.Text>Current Balance: {this.state.balance}</Card.Text>
            <div className="amount">
              <Card.Text>Cost: </Card.Text>
              <Form inline>
                <FormControl type="number" name="amount" placeholder="Amount ($)" className="input" onChange={this.handleChange} />
              </Form>
            </div>
            <div className="merchant-input">
              <Card.Text>Merchant ID: </Card.Text>
              <Form inline>
                <FormControl type="text" name="mid" placeholder="111111" className="input" onChange={this.handleChange} />
              </Form>
            </div>
            <Card.Text>Final Balance: {this.renderFinal()}</Card.Text>
            <Button
              variant="success"
              onClick={this.handlePurchase}
              disabled={this.state.amount == null || this.state.amount <= 0 || this.state.balance < this.state.amount}
            >
              Submit
            </Button>
          </Card.Body>
        </Card>
        <Alert className="alert" show={this.state.showAlert} variant="success" onClose={() => this.setState({showAlert: false})} dismissible>
          <Alert.Heading>Success</Alert.Heading>
          <p>Your purchase has been completed!</p>
        </Alert>
      </div>
    );
  }
}

export default Merchant;