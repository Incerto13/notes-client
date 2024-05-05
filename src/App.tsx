import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css'

import NotesPage from './pages/NotesPage';
import CreateNotePage from './pages/CreateNotePage';
import EditNotePage from './pages/EditNotePage';

function App() {
    return (
      <Router>
        <Switch>
            <Route exact path="/">
                <NotesPage />
            </Route>
            <Route exact path="/notes/new">
                <CreateNotePage />
            </Route>
            <Route exact path="/notes/:id">
                <EditNotePage />
            </Route>
        </Switch>
      </Router>
    );
}

export default App;
