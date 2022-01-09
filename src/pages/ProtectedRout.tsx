import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import useAuth from '../hooks/auth';
// import useAuth from '../hooks/auth';
import { useAppSelector } from '../hooks/redux';

const ProtectedRout = (props) => {
  // const isAuth = useAuth('protectedroute');
  const userId = useAppSelector(state => state.users.user._id);
  const location = useLocation().pathname;
  
  if (!userId) {
    return <Redirect to='/' />;
  }

  return <Route {...props} />;
};

export default ProtectedRout;