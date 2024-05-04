import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css'

import NotesPage from './pages/NotesPage';
import CreateNotesPage from './pages/CreateNotesPage';

function App() {
    return (
      <Router>
        <Switch>
            <Route exact path="/">
                <NotesPage />
            </Route>
            <Route exact path="/create-note">
                <CreateNotesPage />
            </Route>
        </Switch>
      </Router>
    );
}

export default App;
