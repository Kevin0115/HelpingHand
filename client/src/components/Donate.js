import React from 'react';

class Donate extends React.Component {
  render() {
    console.log(this.props);
    return(
      <div>{this.props.rid}</div>
    );
  }
}

export default Donate;