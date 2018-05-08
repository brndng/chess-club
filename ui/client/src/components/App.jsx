import React, { Component } from 'react';
import axios from 'axios';
// import Game from './Game.jsx';
import GameRooms from  './GameRooms.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      verified: true,
      username: '' ,
      password: '',
    }
  }

  setUsername(e) {
    this.setState({ username: e.target.value });
  }

  setPassword(e) {
    this.setState({ password: e.target.value });
  }

  logIn() {
    const { username, password } = this.state;
      axios.post('http://localhost:3000/users/login', { username, password }).then((data)=>{
        if (data.data !== '') {
          this.setState({ verified: true });
        }
      })
  }

  signUp() {
    const { username, password } = this.state;
    axios.post('http://localhost:3000/users/signup', { username, password })
  }

  render() {
    const { verified, username, password } = this.state;
    return verified ? <div><GameRooms /></div> : 
      <div>
        <div>
          LOG IN
          <input type="text" placeholder="Username" value={username} onChange={e => this.setUsername(e)} />
          <input type="text" placeholder="Password" value={password} onChange={e => this.setPassword(e)} />
          <button onClick={() => this.logIn()}>Log In</button>
        </div> 
        <br/>
        <div>
          SIGN UP
          <input type="text" placeholder="Username" value={username} onChange={e => this.setUsername(e)} />
          <input type="text" placeholder="Password" value={password} onChange={e => this.setPassword(e)} />
          <button onClick={() => this.signUp()}>Sign Up</button>
        </div> 
      </div>
  }
}

export default App;