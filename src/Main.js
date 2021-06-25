import React, { useEffect } from 'react';
/*
    THE 'REACT-BOOTSTRAP' WAS USED JUST TO USE THE RESPONSIBLE BREAKPOINTS AND OTHER FEATURES
*/
import { Container,  Nav, Navbar } from 'react-bootstrap';
import Home from './Home';
import Details from './Details';
import Favorites from './Favorites';

/*
    I PICKED UP 'REACT-ROUTER-DOM' JUST TO DO A SIMPLE ROUTER BETWEEN THE PAGES
    IT CAN BE REPLACED BY ANY OTHER
*/
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

/*
    I CREATED THE 'SCSS' FILES JUST TO PUT SOME MINOR MODIFICATIONS AND ENJOY THE 'NODE-SASS' SUPPORT
*/
import './Main.scss';

export default function Main() {
    useEffect(() => {
        checkLocalStorageExists();
    }, []);

    /*
        ENSURE THE LOCALSTORAGE IS INITIATED
    */
    function checkLocalStorageExists(){
        if(!localStorage.favPokes) {
            localStorage.setItem('favPokes', '[]')
        }
    }

  return (
    <Router>
        <Container>
            <header className="main-header">
                <Navbar bg="light">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                src='pokedex-icon.svg'
                                width='40'
                                height='40'
                            /> Pokemon List
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/favorites">Favorites</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </header>

            {/*
                SETTING THE ROUTERS AND THE RIGHT MAIN COMPONENTS
            */}
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route path="/favorites">
                    <Favorites />
                </Route>

                <Route path="/:id">
                    <Details />
                </Route>
            </Switch>

            <footer className="main-footer">
                <span>by @R31N4LD0</span>
                <p>images from <a href="https://github.com/PokeAPI/sprites.git" target="_blank" rel="noreferrer">this repository</a>.</p>
            </footer>
        </Container>
    </Router>
  );
}
