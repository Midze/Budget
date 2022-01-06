import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles.css';

type objectKeyType = {
  [key: string]: string
}

const pathes: objectKeyType = {
  dashboard: 'Dashboard',
  add: 'Add Expenses',
  day: 'Day Expenses',
  month: 'Month Expenses',
  year: 'Year Expenses',
};

const Header = (): JSX.Element => {
  const currentLocation = useLocation();
  const path = currentLocation.pathname.split('/')[1] || 'dashboard';
  
  return (
    <div className="header">
      {pathes[path]}
    </div>
  );
};

export default Header;