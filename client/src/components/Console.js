import React from 'react';
import {
  Button,
  Modal,
  Alert
} from 'react-bootstrap';
import './Clerk.css';

import { API_BASE, DELETE } from '../utils/Const';

class Console extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showAlert: false,
    }
    this.handleResetDatabase = this.handleResetDatabase.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleDeleteRs = this.handleDeleteRs.bind(this);
  }

  handleCloseModal() {
    this.setState({showModal: false});
  }

  handleOpenModal() {
    this.setState({showModal: true});
  }

  handleResetDatabase() {
    fetch(API_BASE + 'admin', {
      method: DELETE,
      headers: {
      'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      this.handleCloseModal();
      this.alert();
    })
    .catch(function(error) {
      console.log('Error posting session: ' + error);
    })
  }

  handleDeleteRs() {
    fetch(API_BASE + 'admin/r', {
      method: DELETE,
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      this.handleCloseModal();
      this.alert();
    })
    .catch(function(error) {
      console.log('Error posting session: ' + error);
    })
  }

  alert() {
    this.setState({showAlert: true});
    setTimeout((() => this.setState({showAlert: false})), 3000);
  }

  render() {
    return(
      <div className="console">
        <h2>System Administration Console</h2>
        <Button variant="danger" size="lg" onClick={this.handleOpenModal}>Reset Database</Button>
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Reset Database</Modal.Title>
          </Modal.Header>
          <Modal.Body>Select the Type of Reset</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={this.handleDeleteRs}>
              Reservations/Rentals
            </Button>
            <Button variant="danger" onClick={this.handleResetDatabase}>
              Reset Database
            </Button>
          </Modal.Footer>
        </Modal>
        <Alert className="alert" show={this.state.showAlert} variant="warning" onClose={() => this.setState({showAlert: false})} dismissible>
          {'Database Reset.'}
        </Alert>
      </div>
    );
  }
}

export default Console;