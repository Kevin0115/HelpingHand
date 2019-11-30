import React from 'react';
import {
  Accordion,
  Card,
  Badge,
  Form,
  Button,
  Alert
} from 'react-bootstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './Clerk.css';
import moment from 'moment';

import { API_BASE, GET } from '../utils/Const';
import { processColumns } from '../utils/Utils';

class ReportBranch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Branch Specs
      branchLocation: null,
      branchCity: null,
      showAlert: false,
      // Received Content
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
    this.getBranchReports = this.getBranchReports.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  getBranchReports(e) {
    e.preventDefault();
    const { branchLocation, branchCity } = this.state;
    fetch(API_BASE + 'report/rental/' + branchCity + '/' + branchLocation, {
      method: GET,
    })
    .then(res => res.json())
    .then(json => {
      if (!json.success) {
        this.setState({
          showAlert: true,
          alertMessage: 'The branch you entered does not exist.'
        })
        setTimeout((() => this.setState({showAlert: false})), 10000);
      }
      this.setState({
        rentalsPerCategory: json.content.branch_rentals_per_category,
        rentalsTotalCount: json.content.branch_total_rentals_count[0].total_rentals_today,
        allRentals: json.content.branch_all_rentals
      })
    })
    .catch(function(error) {
      console.log(error);
    })
    fetch(API_BASE + 'report/return/' + branchCity + '/' + branchLocation, {
      method: GET,
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        returnsPerCategory: json.content.branch_returns_per_category,
        returnsTotalCount: json.content.branch_total_returns_count[0].total_returns_today,
        returnsTotalRevenue: json.content.branch_total_returns_count[0].branch_revenue_today,
        allReturns: json.content.branch_all_returns
      })
      this.clearForm();
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  clearForm() {
    this.setState({
      branchLocation: null,
      branchCity: null,
    });
    this.messageForm.reset();
  }

  render() {
    const { rentalsPerCategory, rentalsTotalCount, allRentals,
            returnsPerCategory, returnsTotalCount, allReturns, returnsTotalRevenue } = this.state;
    return (
      <div className="report">
        <h2>Rental and Return Reports for Branch</h2>
        <Card bg="primary" text="white" className="report-note">
          <Card.Body>
            <Card.Text>
              Welcome to the reports page. Specify your branch to get started. Click on either 'Rental Reports' or 'Return Reports' to view either report(s) in table format.
            </Card.Text>
          </Card.Body>
        </Card>
        <form className="form" ref={ form => this.messageForm = form } onSubmit={this.getBranchReports}>
          <Form.Group>
            <Form.Label>Branch Location</Form.Label>
            <Form.Control type="text" name="branchLocation" onChange={this.handleChange} placeholder="Downtown"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Branch City</Form.Label>
            <Form.Control type="text" name="branchCity" onChange={this.handleChange} placeholder="Vancouver"/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
        <Accordion className="accordion">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Rental Reports for {moment().format('YYYY-MM-DD')}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <div className="table-wrapper">
                <h3>Total Rentals for Branch: <Badge variant="info">{rentalsTotalCount}</Badge></h3>
                <h5>All Rental Details</h5>
                <ReactTable
                  className="table"
                  defaultPageSize={10}
                  columns={processColumns(allRentals)}
                  data={allRentals == null ? [] : allRentals}
                />
                {/* <h5>Rentals by Branch</h5>
                <ReactTable
                  className="table"
                  defaultPageSize={6}
                  columns={processColumns(rentalsPerBranch)}
                  data={rentalsPerBranch == null ? [] : rentalsPerBranch}
                /> */}
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
                <h3>Total Returns for Branch: <Badge variant="info">{returnsTotalCount}</Badge></h3>
                <h3>Total Revenue for Branch: <Badge variant="info">${returnsTotalRevenue}</Badge></h3>
                <h5>All Return Details</h5>
                <ReactTable
                  className="table"
                  defaultPageSize={10}
                  columns={processColumns(allReturns)}
                  data={allReturns == null ? [] : allReturns}
                />
                {/* <h5>Returns by Branch</h5>
                <ReactTable
                  className="table"
                  defaultPageSize={6}
                  columns={processColumns(returnsPerBranch)}
                  data={returnsPerBranch == null ? [] : returnsPerBranch}
                /> */}
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
        <Alert className="alert" show={this.state.showAlert} variant="danger" onClose={() => this.setState({showAlert: false})} dismissible>
          <Alert.Heading>Something went wrong...</Alert.Heading>
          {this.state.alertMessage}
        </Alert>
      </div>
    )
  }
}

export default ReportBranch;