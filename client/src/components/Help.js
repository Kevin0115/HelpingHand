import React from 'react';
import marked from 'marked';
import {
  Navbar,
  Nav,
  NavDropdown,
  Alert,
  Button,
  Form,
  FormControl,
  Modal,
} from 'react-bootstrap';
import './Components.css';
import QR from './QR';
import { Link } from 'react-router-dom';
import { API_BASE, POST } from '../utils/Const';

const MARKDOWN_TEXT = `
# Welcome to Helping Hand!
***
### How do I use Helping Hand?
If you're a Giver, select "Giver" on the landing page.
You may need to rescan your Receiver's personal QR code to load in their virtual wallet.
From there, select your donation amount and enter your credit card information to proceed.
Once this is complete, you're all good to go. Helping Hand and your Receiver thank you for your generosity!
***
### TODO/Known Issues
When accessing the "Help" page, the internal link to the Receiver's personal account is lost.
This is easily remedied, by re-opening your camera app and re-scanning their QR code.
However, it would be ideal to have an additional built-in QR code reader with permissions to the camera.
This would allow for in-app scanning without the need to exit the browser; conveniently loading in the Receiver's ID.
`

class Help extends React.Component {
    constructor(props) {
        super(props);
    }

    getMarkdownText(text) {
        const rawMarkup = marked(text);
        return {__html: rawMarkup}
    }

    render() {
        return(
            <div className="help">
                <div className="markdown" dangerouslySetInnerHTML={this.getMarkdownText(MARKDOWN_TEXT)}/>
            </div>
        )
    }
}

export default Help;