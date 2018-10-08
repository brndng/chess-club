import React, { Component } from "react";
import { connect } from "react-redux";
import ChallengeCreator from "./ChallengeCreator.jsx";
import Players from "./Players.jsx";

class Challenge extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, opponent, storeOpponent } = this.props;
    return (
      <div className="players-container">
        <Players />
        <div className="players-challenge">
          <ChallengeCreator opponent={opponent} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, opponent }) => {
  return { user, opponent };
};

export default connect(mapStateToProps)(Challenge);
