import React from 'react';
import {
  Tabs,
  Tab
} from 'react-bootstrap';
import './Customer.css';

import Register from './Register';
import Vehicles from './Vehicles';
import Reservation from './Reservation';
import ViewReservation from './ViewReservation';

class Customer extends React.Component {
  render() {
    return(
      <div className="customer">
        <Tabs defaultActiveKey="vehicles" className="tabs">
          <Tab eventKey="vehicles" title="Vehicles">
            <Vehicles />
          </Tab>
          <Tab eventKey="reserve" title="Reservation">
            <Reservation />
          </Tab>
          <Tab eventKey="register" title="Register">
            <Register />
          </Tab>
          <Tab eventKey="viewcancel" title="View/Cancel Reservation">
            <ViewReservation />
          </Tab>
        </Tabs>
        
      </div>
    );
  }
}

export default Customer;