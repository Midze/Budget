import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import AddPage from '../../pages/AddPage';
import Dashboard from '../../pages/Dashboard';
import LoginPage from '../../pages/LoginPage';
import ProtectedRout from '../../pages/ProtectedRout';
import './styles.css';

const Layout = (): JSX.Element => {
  return (
    <>
      <div className="layout">
        <Switch>
          <Route exact path="/">
            <LoginPage/>
          </Route>
          <ProtectedRout path="/dashboard">
            <Dashboard/>
          </ProtectedRout>
          <ProtectedRout path="/add">
            <AddPage/>
          </ProtectedRout>
          <ProtectedRout path="/day">
              day
          </ProtectedRout>
          <ProtectedRout path="/month">
              month
          </ProtectedRout>
          <ProtectedRout path="/year">
              year
          </ProtectedRout>
          <Route>
              404
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default Layout;