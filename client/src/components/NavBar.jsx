import React from "react";
import { Link, withRouter } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav">
      <ul className="nav-left">
        <li>
          <Link to="/">▣</Link>
        </li>
      </ul>
      <ul className="nav-right">
        <li>
          <Link to="/gamelist">MY GAMES</Link>
        </li>
        <li>
          <Link to="/challenge">CHALLENGE</Link>
        </li>
        <li>
          <Link to="/archive">ARCHIVE</Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(NavBar);
