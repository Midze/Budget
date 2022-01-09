import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Sidebar = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleMenu = () => {
    if(open) {
      setOpen(false);
    } else setOpen(true);
  };
  return (
    <div className={`sidebar ${open ? 'open' : ''}`} onClick={handleMenu}>
      <ul className="sidebar__nav">
        <li className="sidebar__link-item">
          <div className={`burger ${open ? 'open' : ''}`} onClick={handleMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </li>
        <li className="sidebar__link-item">
          <Link to="/account">
            <div className="account-link">MK</div>
          </Link>
        </li>
        <li className="sidebar__link-item">
          <Link to="/dashboard">
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