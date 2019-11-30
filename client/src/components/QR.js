import React from 'react';
import QRCode from 'qrcode.react';
import { CLIENT_URL } from '../utils/Const'; 

class QR extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <QRCode value={CLIENT_URL + this.props.rid} />
    );
  }
}

export default QR;