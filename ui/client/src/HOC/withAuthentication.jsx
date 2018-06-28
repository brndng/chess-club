import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Redirect } from "react-router-dom";
import axios from 'axios';
import { storeUser, authenticate, updateUserFetched } from '../actions/';

axios.defaults.withCredentials = true;

function withAuthentication(BaseComponent) {

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
        const user = await axios.get(`https://chess-club.herokuapp.com/users/current`).catch(err => console.log(err));
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
      const { isAuthenticated } = this.props;
      const { isLoading } = this.state;
  
      return isLoading 
        ? <div className="loading">Loading...</div>
        : isAuthenticated === true 
          ? <div className="wrapper">
              <BaseComponent {...this.props} />
            </div>
          : <Redirect to={{
              pathname: '/login',
              state: { from: this.props.location }
            }} />
    }
  }
  const mapStateToProps = ({ isAuthenticated, hasFetchedCurrUser }) => {
    return { isAuthenticated, hasFetchedCurrUser }
  }

  const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({ storeUser, authenticate, updateUserFetched }, dispatch);
  }
  
  return connect(mapStateToProps, matchDispatchToProps)(ComponentWithAuth);
}

export default withAuthentication;
