import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login'
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import Contacts from './components/Contacts/Contacts';
import AddContact from './components/Contacts/AddContact';
import ContactState from './context/contacts/ContactState';

function App() {
    return (
        <>
            <NoteState>
                <Router>
                    <Navbar searchbar={true} />
                    <div className="container">
                        <Switch>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                            <Route exact path="/signup">
                                <Signup />
                            </Route>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <ContactState>
                            <Route exact path="/contacts">
                                <Contacts />
                            </Route>
                            <Route exact path="/addcontact">
                                <AddContact />
                            </Route>
                            </ContactState>
                            <Route exact path="/about">
                                <About />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </NoteState>
        </>
    );
}

export default App;
