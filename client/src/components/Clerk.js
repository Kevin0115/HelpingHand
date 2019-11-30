import React from 'react';
import {
  Tabs,
  Tab
} from 'react-bootstrap';
import './Clerk.css';

import RentalReservation from './RentalReservation';
import RentalNoReservation from './RentalNoReservation';
import Return from './Return';
import Console from './Console';
import ReportAll from './ReportAll';
import ReportBranch from './ReportBranch';

class Clerk extends React.Component {
  render() {
    return(
      <div className="clerk">
        <Tabs defaultActiveKey="rental" className="tabs">
          <Tab eventKey="rental" title="Rental (no Reservation)" className="tab">
            <RentalNoReservation />
          </Tab>
          <Tab eventKey="rental-reservation" title="Rental (with Reservation)" className="tab">
            <RentalReservation />
          </Tab>
          <Tab eventKey="return" title="Return">
            <Return />
          </Tab>
          <Tab eventKey="report-all" title="Reports (All)">
            <ReportAll />
          </Tab>
          <Tab eventKey="report-branch" title="Reports (Branch)">
            <ReportBranch />
          </Tab>
          <Tab eventKey="console" title="Console">
            <Console />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Clerk;