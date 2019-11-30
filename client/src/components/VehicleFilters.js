import React from 'react';
import {
  Button,
  Dropdown
} from 'react-bootstrap';
import './Vehicles.css';

import DatetimeRangePicker from 'react-datetime-range-picker';

import { formatDate, formatTime } from '../utils/Utils';

const noFilters = {
  carSize: 'Any',
  carType: 'Any',
  location: 'Any',
  fromDate: formatDate(new Date()),
  fromTime: formatTime(new Date()),
  toDate: formatDate(new Date()),
  toTime: formatTime(new Date()),
};

class VehicleFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = noFilters;
    this.handleIntervalChange = this.handleIntervalChange.bind(this);
    this.handlePickerChange = this.handlePickerChange.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleIntervalChange(e) {
    this.setState({
      fromDate: formatDate(e.start),
      fromTime: formatTime(e.start),
      toDate: formatDate(e.end),
      toTime: formatTime(e.end),
    });
  }

  handlePickerChange(key, value) {
    this.setState({[key]: value});
  }

  handleApply() {
    this.props.handler(this.state);
  }
  
  handleClear() {
    this.props.handler(noFilters);
    this.setState(noFilters);
  }

  render() {
    return(
      <div className="filters">
        <Dropdown className="dropdown">
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Car Size: {this.state.carSize}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onSelect={() => this.handlePickerChange('carSize', 'Any')}>Any</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onSelect={() => this.handlePickerChange('carSize', 'Economy')}>Economy</Dropdown.Item>
            <Dropdown.Item onSelect={() => this.handlePickerChange('carSize', 'Compact')}>Compact</Dropdown.Item>
            <Dropdown.Item onSelect={() => this.handlePickerChange('carSize', 'Midsize')}>Midsize</Dropdown.Item>
            <Dropdown.Item onSelect={() => this.handlePickerChange('carSize', 'Standard')}>Standard</Dropdown.Item>
            <Dropdown.Item onSelect={() => this.handlePickerChange('carSize', 'Fullsize')}>Fullsize</Dropdown.Item>
            <Dropdown.Item onSelect={() => this.handlePickerChange('carSize', 'SUV')}>SUV</Dropdown.Item>
            <Dropdown.Item onSelect={() => this.handlePickerChange('carSize', 'Truck')}>Truck</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="dropdown">
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Engine Type: {this.state.carType}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onSelect={() => this.handlePickerChange('carType', 'Any')}>Any</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onSelect={() => this.handlePickerChange('carType', 'Gas')}>Gas</Dropdown.Item>
            <Dropdown.Item onSelect={() => this.handlePickerChange('carType', 'Electric')}>Electric</Dropdown.Item>
            <Dropdown.Item onSelect={() => this.handlePickerChange('carType', 'Hybrid')}>Hybrid</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="dropdown">
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Location: {this.state.location}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onSelect={() => this.handlePickerChange('location', 'Any')}>Any</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onSelect={() => this.handlePickerChange('location', 'Downtown Vancouver')}>Downtown Vancouver</Dropdown.Item>
            <Dropdown.Item onSelect={() => this.handlePickerChange('location', 'Midtown Vancouver')}>Midtown Vancouver</Dropdown.Item>
            <Dropdown.Item onSelect={() => this.handlePickerChange('location', 'Downtown Burnaby')}>Downtown Burnaby</Dropdown.Item>
            <Dropdown.Item onSelect={() => this.handlePickerChange('location', 'Midtown Burnaby')}>Midtown Burnaby</Dropdown.Item>
            <Dropdown.Item onSelect={() => this.handlePickerChange('location', 'Downtown Surrey')}>Downtown Surrey</Dropdown.Item>
            <Dropdown.Item onSelect={() => this.handlePickerChange('location', 'Midtown Surrey')}>Midtown Surrey</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="dropdown">
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Select Interval
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className="interval">
              <div className="interval-label">
                <p>From</p><p>To</p>
              </div>
              <DatetimeRangePicker
                dateFormat="MMM D, YYYY"
                onChange={this.handleIntervalChange}
              />
            </div>
          </Dropdown.Menu>
        </Dropdown>
        <Button
          className="filter-button"
          variant="success"
          onClick={this.handleApply}
        >
          Apply Filters
        </Button>
        <Button
          className="filter-button"
          variant="outline-danger"
          onClick={this.handleClear}
        >
          Clear Filters
        </Button>
      </div>
    );
  }
}

export default VehicleFilters;