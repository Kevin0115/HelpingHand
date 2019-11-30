import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
} from 'react-bootstrap';

class Main extends React.Component {
  render() {
    console.log(this.props);
    return(
      <div className="main">
        <h2>I am a...</h2>
        <Button
          className="nav-button"
          variant="secondary"
          size="lg"
          as={Link} to={"/donate/" + this.props.rid}
        >
          Giver
        </Button>
        <Button
          className="nav-button"
          variant="secondary"
          size="lg"
          as={Link} to={"/merchant/" + this.props.rid}
        >
          Merchant
        </Button>
      </div>
    );
  }
}

export default Main;