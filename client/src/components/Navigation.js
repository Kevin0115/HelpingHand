import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
} from 'react-bootstrap';

import './Navigation.css';

import Customer from './Customer';
import Clerk from './Clerk';

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
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavDropdown title={'Menu'} id="collasible-nav-dropdown" drop="left">
                <NavDropdown.Item as={Link} to={"/merchant"}>Merchant Page</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href={"https://github.com/Kevin0115/HelpingHand"}>GitHub Repo</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path={"/"}>
            <Main />
          </Route>
          <Route path={"/:id"}>
            <Main />
          </Route>
          {/* <Route path={"/merchant"}>
            <Merchant />
          </Route> */}
        </Switch>
      </Router>
    );
  }
}

function Main() {
  const { id } = useParams()
  return (
    <div className="main">
      <h2>Display ID:</h2>
      {id}
      {/* <h2>I am a...</h2>
      <Button
        className="nav-button"
        variant="secondary"
        size="lg"
        as={Link} to={"/customer"}
      >
        Customer
      </Button>
      <Button
        className="nav-button"
        variant="secondary"
        size="lg"
        as={Link} to={"/clerk"}
      >
        Clerk
      </Button> */}
    </div>
  );
}

export default Navigation;