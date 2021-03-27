import React from 'react';
import { Route, Switch } from 'react-router';

import Login from './pages/Login';

import './App.css';
import logo from './trivia.png';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route path="/" component={ Login } />
        </Switch>
      </header>
    </div>
  );
}
