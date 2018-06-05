import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Redirect } from "react-router-dom";
import axios from 'axios';
import PrivateRoute from './PrivateRoute.jsx';
import { storeUser, updateUserFetched } from '../actions/';
import auth from '../auth.js';

axios.defaults.withCredentials = true;

class SessionChecker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  async componentDidMount() {
    const { hasFetchedCurrUser, updateUserFetched, storeUser } = this.props;

    if (!hasFetchedCurrUser) { 
      const user = await axios.get('http://localhost:3000/users/current').catch(err => console.log(err));
      if (user) { 
        storeUser(user.data);
        auth.authenticate(() => {
          this.setState({ 
            isLoading: false, 
          });
        });
        updateUserFetched();
      } else { 
        auth.logout(() => {
          this.setState({ 
            isLoading: false,
          });
        });
      }
    } else { 
      this.setState({ 
        isLoading: false, 
      });
    }
  }

  render() {  
    const { component: Component } = this.props;
    const { isLoading } = this.state;

    return isLoading 
      ? <div>Loading...</div>
      : auth.isAuthenticated === true 
        ? <Component {...this.props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: this.props.location }
          }} />
  }
}

const mapStateToProps = ({ userId, hasFetchedCurrUser }) => {
  return { userId, hasFetchedCurrUser }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ storeUser, updateUserFetched }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SessionChecker);