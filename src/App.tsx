import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { useAppSelector, useAppDispatch } from './hooks/redux';
import Header from './components/Header';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';

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
