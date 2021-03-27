import React from 'react';
import { Route, Switch } from 'react-router';

import Login from './pages/Login';
import Game from './pages/Game';

import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path="/game" component={ Game } />
          <Route path="/" component={ Login } />
        </Switch>
      </header>
    </div>
  );
}
