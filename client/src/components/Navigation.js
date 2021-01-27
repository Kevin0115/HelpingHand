import React, { useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from 'react-router-dom';
import { withRouter } from "react-router";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
} from 'react-bootstrap';
import QR from './QR';
import './Components.css';

import './Navigation.css';

import Main from './Main';
import Merchant from './Merchant';
import Donate from './Donate';
import Register from './Register';
import Help from './Help';

const BASENAME = "/HelpingHand/"

class Navigation extends React.Component {
  render() {
    return(
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            <Link to="/" className="link">
              <img
                src={require('../logo.png')}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt=" "
              />
            {' Helping Hand (v1.1) '}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Link to="/register/" className="link">
              Register
            </Link>
            <Link to="/help/" className="link">
              Help
            </Link>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <Navigator />
          </Route>
          <Route path={"/register"}>
            <Register />
          </Route>
          <Route path={"/help"}>
            <Help />
          </Route>
          <Route path={"/:user/:rid"}>
            <Navigator />
          </Route>
        </Switch>
      </Router>
    );
  }
}

function Navigator() {
  const { rid, user } = useParams();
  switch (user) {
    case 'donate' :
      return <Donate rid={rid} />
    case 'merchant' :
      return <Merchant rid={rid} />
    default:
      return <Main rid={rid} />
  }
}

export default Navigation;