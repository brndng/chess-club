import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <Link to='/gamelist'>Game List</Link>
    </div>
  );
}

export default Dashboard;