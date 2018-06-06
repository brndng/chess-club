import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { storeUser, authenticate } from '../actions/';

axios.defaults.withCredentials = true;

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: '',
      view: 'login',
      redirectToReferrer: false,
    }
  }

  setUsername(e) {
    this.setState({ username: e.target.value });
  }

  setPassword(e) {
    this.setState({ password: e.target.value });
  }

  setView(view) {
    this.setState({ view });
  }

  async logIn() {
    const { storeUser, updateVerified, authenticate } = this.props;
    const { username, password } = this.state;
    const response = await axios.post('http://localhost:3000/users/login', { username, password });
    if (response.status === 200) {
      storeUser(response.data);
      authenticate(true);
      this.setState({ 
        redirectToReferrer: true
      });
    }
  }

  async signUp() {
    const { username, password } = this.state;
    try {
      const response = await axios.post('http://localhost:3000/users/signup', { username, password });
    } catch (err) {
      console.log('err from signup', err);
    }
  }

  render() {
    const { username, password, view, redirectToReferrer } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/'} } 

    if (redirectToReferrer === true) {
      return (
        <Redirect to={from} />
      )
    }
    return view === 'login'
      ? <div className="login-form">
          <input type="text" placeholder="Username" value={username} onChange={e => this.setUsername(e)} />
          <input type="password" placeholder="Password" value={password} onChange={e => this.setPassword(e)} />
          <button onClick={() => this.logIn()}>Log In</button>
          <div>Don't have an account? <a href="#" onClick={() => {this.setView('signup')}}>Sign Up</a></div>
        </div> 
      : <div className="login-form">
          <input type="text" placeholder="Username" value={username} onChange={e => this.setUsername(e)} />
          <input type="password" placeholder="Password" value={password} onChange={e => this.setPassword(e)} />
          <button onClick={() => this.signUp()}>Sign Up</button>
          <div>Already have an account? <a href="#" onClick={() => {this.setView('login')}}>Log In</a></div>
        </div> 
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ storeUser, authenticate }, dispatch);
}

export default connect(null, matchDispatchToProps)(LogIn)
