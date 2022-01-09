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
          <ProtectedRout exact path="/dashboard">
            <Dashboard/>
          </ProtectedRout>
          <ProtectedRout exact path="/add">
            <AddPage/>
          </ProtectedRout>
          <ProtectedRout exact path="/day">
              day
          </ProtectedRout>
          <ProtectedRout exact path="/month">
              month
          </ProtectedRout>
          <ProtectedRout exact path="/year">
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