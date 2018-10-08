import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import adapter from "../adapter";
import { authenticate } from "../actions/";

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  async logout() {
    const { authenticate, history } = this.props;
    const response = await adapter.get(`/users/logout`);
    authenticate(false);
    history.push("/");
  }

  render() {
    return (
      <div className="logout">
        <a onClick={() => this.logout()}>LOG OUT</a>
      </div>
    );
  }
}

const mapStateToProps = ({ isAuthenticated }) => {
  return { isAuthenticated };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ authenticate }, dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    matchDispatchToProps
  )(Logout)
);
