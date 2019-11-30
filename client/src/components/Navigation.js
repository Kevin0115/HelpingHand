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

import './Navigation.css';

import Main from './Main';
import Merchant from './Merchant';
import Donate from './Donate';

class Navigation extends React.Component {
  render() {
    return(
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href={process.env.PUBLIC_URL}>
            <img
              src={require('../logo.png')}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=" "
            />
            {' Helping Hand '}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavDropdown title={'Menu'} id="collasible-nav-dropdown" drop="left">
                <NavDropdown.Item as={Link} to={"/merchant/"}>Merchant Page</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href={"https://github.com/Kevin0115/HelpingHand"}>GitHub Repo</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse> */}
        </Navbar>
        <Switch>
          <Route exact path={"/"}>
            <Navigator />
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
    case "donate" :
      return <Donate rid={rid} />
    case "merchant" :
      return <Merchant rid={rid} />
    default:
      return <Main rid={rid} />
  }
}

export default Navigation;