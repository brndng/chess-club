import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App.jsx';
import LogIn from './LogIn.jsx';

const Wrap = (CompToWrap) => class extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      verified: false,
    }
  }

  updateVerified() {
    this.setState({ verified: true });
  }

  render() {
    return this.state.verified
      ? <CompToWrap />
      : <LogIn updateVerified={() => {this.updateVerified()}}/>
  }
}

export default Wrap;