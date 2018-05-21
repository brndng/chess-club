import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { storeUser } from '../actions/';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '' ,
      password: '',
      view: 'login',
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

  logIn() {
    const { storeUser, updateVerified } = this.props;
    const { username, password } = this.state;
    axios.post('http://localhost:3000/users/login', { username, password }).then((data)=>{
      if (data.data !== '') {
        storeUser(data.data.id);
        updateVerified();
      }
    })
  }

  signUp() {
    const { username, password } = this.state;
    axios.post('http://localhost:3000/users/signup', { username, password })
  }

  render() {
    const { username, password, view } = this.state;
    return view === 'login'
      ?  <div>
            <input type="text" placeholder="Username" value={username} onChange={e => this.setUsername(e)} />
            <input type="text" placeholder="Password" value={password} onChange={e => this.setPassword(e)} />
            <button onClick={() => this.logIn()}>Log In</button>
            <br/>
            Don't have an account? <a href="#" onClick={() => {this.setView('signup')}}>Sign Up</a>
         </div> 
      :  <div>
            <input type="text" placeholder="Username" value={username} onChange={e => this.setUsername(e)} />
            <input type="text" placeholder="Password" value={password} onChange={e => this.setPassword(e)} />
            <button onClick={() => this.signUp()}>Sign Up</button>
            <br/>
            Already have an account? <a href="#" onClick={() => {this.setView('login')}}>Log In</a>
         </div> 
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ storeUser }, dispatch);
}

export default connect(null, matchDispatchToProps)(LogIn)
