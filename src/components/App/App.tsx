import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './App.css';
import Header from '../Header';
import Layout from '../Layout';
import Sidebar from '../Sidebar';

function App(): JSX.Element {
  return (
    <Router>
      <Header/>
      <Sidebar/>
      <Layout/>
    </Router>
  );
}

export default App;
