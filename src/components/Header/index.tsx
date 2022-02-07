import { logoutUser } from 'data/reducers/UserSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React from 'react';
import { useLocation } from 'react-router-dom';
import LogoutIcon from 'components/Icons/LogoutIcon';
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
  const userId = useAppSelector(state => state.users.user._id);
  const dispatch = useAppDispatch();
  const currentLocation = useLocation();
  const path = currentLocation.pathname.split('/')[1] || '';
  
  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="header">
      {pathes[path]}
      { userId && <LogoutIcon className='logout' onClick={logout}/>}
    </div>
  );
};

export default Header;