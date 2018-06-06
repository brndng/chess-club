import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Redirect } from "react-router-dom";
import axios from 'axios';
import { storeUser, authenticate, updateUserFetched } from '../actions/';

axios.defaults.withCredentials = true;

class ComponentWithAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  async componentDidMount() {
    const { hasFetchedCurrUser, updateUserFetched, storeUser, authenticate } = this.props;

    if (!hasFetchedCurrUser) { 
      const user = await axios.get('http://localhost:3000/users/current').catch(err => console.log(err));
      if (user) { 
        storeUser(user.data);
        authenticate(true);
        updateUserFetched();
        this.setState({ 
          isLoading: false, 
        });
      } else { 
        authenticate(false);
        this.setState({ 
          isLoading: false, 
        });
      }
    } else { 
      this.setState({ 
        isLoading: false, 
      });
    }
  }

  render() {  
    const { component: Component, isAuthenticated } = this.props;
    const { isLoading } = this.state;

    return isLoading 
      ? <div>Loading...</div>
      : isAuthenticated === true 
        ? <Component {...this.props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: this.props.location }
          }} />
  }
}

const mapStateToProps = ({ userId, isAuthenticated, hasFetchedCurrUser }) => {
  return { userId, isAuthenticated, hasFetchedCurrUser }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ storeUser, authenticate, updateUserFetched }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ComponentWithAuth);