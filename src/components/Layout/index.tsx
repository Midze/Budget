import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles.css';
const Layout = (): JSX.Element => {
  return (
    <>
      <div className="layout">
        <Switch>
          <Route exact path="/">
              main
          </Route>
          <Route exact path="/month">
              month
          </Route>
          <Route exact path="/week">
              week
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