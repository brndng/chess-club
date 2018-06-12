import React from 'react';
import { Link, withRouter } from "react-router-dom";
import Logout from './Logout.jsx';

const NavBar = () => {
  return (
    <div className="nav">
      <ul className="nav-left">
        <li><Link to='/'>▣</Link></li>
      </ul>
      <ul className="nav-right">
        
        <li><Link to='/gamelist'>MY GAMES</Link></li>
        <li><Link to='/players'>PLAYERS</Link></li>
        <li><Link to='/archive'>ARCHIVE</Link></li>
      </ul>
      {/* <ul className="nav-logout">
        <Logout />
      </ul> */}
    </div>
  )
}

export default withRouter(NavBar);
