import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotesPage from './pages/notes/NotesPage';
import CreateNotePage from './pages/notes/CreateNotePage';
import EditNotePage from './pages/notes/EditNotePage';
import LabelsPage from './pages/labels/LabelsPage';
import CreateLabelPage from './pages/labels/CreateLabelPage';
import EditLabelPage from './pages/labels/EditLabelPage';
import './App.css'

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
            <Route exact path="/labels">
                <LabelsPage />
            </Route>
            <Route exact path="/labels/new">
                <CreateLabelPage />
            </Route>
            <Route exact path="/labels/:id">
                <EditLabelPage />
            </Route>
        </Switch>
      </Router>
    );
}

export default App;
