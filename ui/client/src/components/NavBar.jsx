import React from 'react';
import { Link, withRouter } from "react-router-dom";
import Logout from './Logout.jsx';

const NavBar = () => {
  return (
    <div className="nav">
      <ul className="nav-menu">
        <li><Link to='/profile'> PROFILE </Link></li>
        <li><Link to='/gamelist'> MY GAMES </Link></li>
        <li><Link to='/players'> PLAYERS </Link></li>
      </ul>
      <ul className="nav-logout">
        <Logout />
      </ul>
    </div>
  )
}

export default withRouter(NavBar);
