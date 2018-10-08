import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import adapter from "../adapter";
import { Route, Redirect } from "react-router-dom";
import { storeUser, authenticate, updateUserFetched } from "../actions/";

function withAuthentication(BaseComponent) {
  class ComponentWithAuth extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      };
    }

    async componentDidMount() {
      const {
        hasFetchedCurrUser,
        updateUserFetched,
        storeUser,
        authenticate
      } = this.props;
      if (!hasFetchedCurrUser) {
        const user = await adapter.get(`/users/current`);
        if (user) {
          storeUser(user.data);
          authenticate(true);
          updateUserFetched();
          this.setState({
            isLoading: false
          });
        } else {
          authenticate(false);
          this.setState({
            isLoading: false
          });
        }
      } else {
        this.setState({
          isLoading: false
        });
      }
    }

    render() {
      const { isAuthenticated } = this.props;
      const { isLoading } = this.state;

      return isLoading ? (
        <div className="loading">Loading...</div>
      ) : isAuthenticated === true ? (
        <div className="wrapper">
          <BaseComponent {...this.props} />
        </div>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: this.props.location }
          }}
        />
      );
    }
  }
  const mapStateToProps = ({ isAuthenticated, hasFetchedCurrUser }) => {
    return { isAuthenticated, hasFetchedCurrUser };
  };

  const matchDispatchToProps = dispatch => {
    return bindActionCreators(
      { storeUser, authenticate, updateUserFetched },
      dispatch
    );
  };

  return connect(
    mapStateToProps,
    matchDispatchToProps
  )(ComponentWithAuth);
}

export default withAuthentication;
