import React from 'react';
import {
  Accordion,
  Card,
  Badge
} from 'react-bootstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './Clerk.css';
import moment from 'moment';

import { API_BASE, GET } from '../utils/Const';
import { processColumns } from '../utils/Utils';

class ReportAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rentalsPerBranch: null,
      rentalsPerCategory: null,
      rentalsTotalCount: null,
      allRentals: null,
      returnsPerBranch: null,
      returnsPerCategory: null,
      returnsTotalCount: null,
      returnsTotalRevenue: null,
      allReturns: null,
    }
  }

  componentDidMount() {
    fetch(API_BASE + 'report/rental', {
      method: GET,
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        rentalsPerBranch: json.content.rentals_per_branch,
        rentalsPerCategory: json.content.rentals_per_category,
        rentalsTotalCount: json.content.total_rentals_count[0].total_rentals_today,
        allRentals: json.content.all_rentals
      })
    })
    .catch(function(error) {
      console.log(error);
    })
    fetch(API_BASE + 'report/return', {
      method: GET,
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        returnsPerBranch: json.content.returns_per_branch,
        returnsPerCategory: json.content.returns_per_category,
        returnsTotalCount: json.content.total_returns_count[0].total_returns_today,
        returnsTotalRevenue: json.content.total_returns_count[0].total_revenue_today,
        allReturns: json.content.all_returns
      })
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  render() {
    const { rentalsPerBranch, rentalsPerCategory, rentalsTotalCount, allRentals,
            returnsPerBranch, returnsPerCategory, returnsTotalCount, allReturns, returnsTotalRevenue } = this.state;
    return (
      <div className="report">
        <h2>Rental and Return Reports for All Branches</h2>
        <Card bg="primary" text="white" className="report-note">
          <Card.Body>
            <Card.Text>
              Welcome to the reports page. Today's reports have been automatically fetched. Click on either 'Rental Reports' or 'Return Reports' to view either report(s) in table format.
            </Card.Text>
          </Card.Body>
        </Card>
        <Accordion className="accordion">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Rental Reports for {moment().format('YYYY-MM-DD')}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <div className="table-wrapper">
                <h3>Total Rentals (All Branches): <Badge variant="info">{rentalsTotalCount}</Badge></h3>
                <h5>All Rental Details</h5>
                <ReactTable
                  className="table"
                  defaultPageSize={10}
                  columns={processColumns(allRentals)}
                  data={allRentals == null ? [] : allRentals}
                />
                <h5>Rentals by Branch</h5>
                <ReactTable
                  className="table"
                  defaultPageSize={6}
                  columns={processColumns(rentalsPerBranch)}
                  data={rentalsPerBranch == null ? [] : rentalsPerBranch}
                />
                <h5>Rentals by Category</h5>
                <ReactTable
                  className="table"
                  defaultPageSize={10}
                  columns={processColumns(rentalsPerCategory)}
                  data={rentalsPerCategory == null ? [] : rentalsPerCategory}
                />
              </div>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Return Reports for {moment().format('YYYY-MM-DD')}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <div className="table-wrapper">
                <h3>Total Returns (All Branches): <Badge variant="info">{returnsTotalCount}</Badge></h3>
                <h3>Total Revenue (All Branches): <Badge variant="info">${returnsTotalRevenue}</Badge></h3>
                <h5>All Return Details</h5>
                <ReactTable
                  className="table"
                  defaultPageSize={10}
                  columns={processColumns(allReturns)}
                  data={allReturns == null ? [] : allReturns}
                />
                <h5>Returns by Branch</h5>
                <ReactTable
                  className="table"
                  defaultPageSize={6}
                  columns={processColumns(returnsPerBranch)}
                  data={returnsPerBranch == null ? [] : returnsPerBranch}
                />
                <h5>Returns by Category</h5>
                <ReactTable
                  className="table"
                  defaultPageSize={10}
                  columns={processColumns(returnsPerCategory)}
                  data={returnsPerCategory == null ? [] : returnsPerCategory}
                />
              </div>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    )
  }
}

export default ReportAll;