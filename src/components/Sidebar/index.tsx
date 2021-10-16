import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Sidebar = (): JSX.Element => {
  return (
    <div className="sidebar">
      <ul className="sidebar__nav">
        <li className="sidebar__link-item">
          <Link to="/">Home</Link>
        </li>
        <li className="sidebar__link-item">
          <Link to="/month">Month</Link>
        </li>
        <li className="sidebar__link-item">
          <Link to="/week">week</Link>
        </li>
        <li className="sidebar__link-item">
          <Link to="/year">year</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;