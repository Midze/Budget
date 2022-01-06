import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Sidebar = (): JSX.Element => {
  return (
    <div className="sidebar">
      <ul className="sidebar__nav">
        <li className="sidebar__link-item">
          <Link to="/account">
            <div className="account-link">MK</div>
          </Link>
        </li>
        <li className="sidebar__link-item">
          <Link to="/">
            <i className="icon icon-dashboard"/>
          </Link>
        </li>
        <li className="sidebar__link-item">
          <Link to="/add">
            <i className="icon icon-plus"/>
          </Link>
        </li>
        <li className="sidebar__link-item">
          <Link to="/day">
            <i className="icon icon-day"/>
          </Link>
        </li>
        <li className="sidebar__link-item">
          <Link to="/month">
            <i className="icon icon-month"/>
          </Link>
        </li>
        <li className="sidebar__link-item">
          <Link to="/year">
            <i className="icon icon-year"/>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;