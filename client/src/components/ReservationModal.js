import React from 'react';
import {
  Button,
  Card,
  Modal,
  InputGroup,
  FormControl
} from 'react-bootstrap';
import './Vehicles.css';

import DatetimeRangePicker from 'react-datetime-range-picker';
import { formatDate, formatTime, calculatePrice, capitalizeWord } from '../utils/Utils';

class ReservationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dlicense: null,
      fromDate: formatDate(new Date()),
      fromTime: formatTime(new Date()),
      toDate: formatDate(new Date()),
      toTime: formatTime(new Date()),
      price: 0,
    }
    this.handleLicenseChange = this.handleLicenseChange.bind(this);
    this.handleIntervalChange = this.handleIntervalChange.bind(this);
    this.handleReserve = this.handleReserve.bind(this);
  }

  handleLicenseChange(e) {
    this.setState({dlicense: parseInt(e.target.value)});
  }

  handleIntervalChange(e) {
    const { h_rate, hi_rate, d_rate, di_rate, w_rate, wi_rate } = this.props.reservationProps;
    this.setState({
      fromDate: formatDate(e.start),
      fromTime: formatTime(e.start),
      toDate: formatDate(e.end),
      toTime: formatTime(e.end),
      price: calculatePrice(e.start, e.end, (h_rate + hi_rate), (d_rate + di_rate), (w_rate + wi_rate)),
    });
  }

  handleReserve() {
    this.props.handler(this.state);
  }

  render() {
    const { make, model, year, branch_location, branch_city, color, d_rate, di_rate,
      h_rate, hi_rate, w_rate, wi_rate, features } = this.props.reservationProps;
    return(
      <Modal size="lg" show={this.props.showModal} onHide={this.props.handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reserve the {year} {make} {model} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <Card bg="primary" text="white" className="note">
              <Card.Body>
                <Card.Text>
                  Note: The vehicle you have selected is at the {branch_location} {branch_city} branch.
                </Card.Text>
              </Card.Body>
            </Card>
            <h5>Color: {capitalizeWord(color)}</h5>
            <h5>Features: {features}</h5>
            <h5>Rates (Including Insurance):</h5>
            <p>Hourly: ${h_rate + hi_rate}/hr</p>
            <p>Daily: ${d_rate + di_rate}/day</p>
            <p>Weekly: ${w_rate + wi_rate}/wk</p>
            <h5>Please Confirm your Driver's License Number:</h5>
            <InputGroup>
              <FormControl placeholder="9999999" onChange={this.handleLicenseChange} maxLength="7" />
            </InputGroup>
            <h5>Please Confirm the Reservation Start/End Time and Date:</h5>
            <div className="interval">
              <div className="interval-label">
                <p>From</p><p>To</p>
              </div>
              <DatetimeRangePicker
                dateFormat="MMM D, YYYY"
                onChange={this.handleIntervalChange}
              />
            </div>
            <p>Your Estimated Price: ${this.state.price}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleCloseModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={this.handleReserve} disabled={this.state.dlicense == null || this.state.dlicense.toString().length < 7}>
            Reserve
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ReservationModal;