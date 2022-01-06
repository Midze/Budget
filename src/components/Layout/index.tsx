import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddPage from '../../pages/AddPage';
import Dashboard from '../../pages/Dashboard';
import './styles.css';

const Layout = (): JSX.Element => {
  return (
    <>
      <div className="layout">
        <Switch>
          <Route exact path="/">
            <Dashboard/>
          </Route>
          <Route exact path="/add">
            <AddPage/>
          </Route>
          <Route exact path="/day">
              day
          </Route>
          <Route exact path="/month">
              month
          </Route>
          <Route exact path="/year">
              year
          </Route>
          <Route>
              404
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default Layout;