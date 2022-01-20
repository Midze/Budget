import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import useAuth from '../hooks/auth';
// import useAuth from '../hooks/auth';
import { useAppSelector } from '../hooks/redux';

interface ProtectedRouteProps {
  children: React.ReactNode;
  exact?: boolean;
  path: string;
}

const ProtectedRout: React.FC<ProtectedRouteProps> = (props) => {
  // const isAuth = useAuth('protectedroute');
  const userId = useAppSelector(state => state.users.user._id);
  const location = useLocation().pathname;
  
  if (!userId) {
    return <Redirect to='/' />;
  }

  return <Route {...props} />;
};

export default ProtectedRout;