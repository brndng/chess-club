import React from 'react';
import { Link, withRouter } from "react-router-dom";
import Logout from './Logout.jsx';

const NavBar = () => {
  return (
    <div className="nav">
      <ul className="nav-menu">
        <li><Link to='/'> HOME </Link></li>
        <li><Link to='/gamelist'> MY GAMES </Link></li>
        <li><Link to='/players'> CHALLENGE PLAYERS </Link></li>
        <li><Link to='/archive'> ARCHIVE </Link></li>
      </ul>
      <ul className="nav-logout">
        <Logout />
      </ul>
    </div>
  )
}

export default withRouter(NavBar);
